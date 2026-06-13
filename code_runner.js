// Python Code Runner Simulator for Web Browser
// Transpiles a subset of Python syntax to JavaScript and runs it within a sandbox.

(function() {
  // Virtual File System for simulation
  const VIRTUAL_FS = {};

  // Custom Array prototypes for Python compatibility (defined non-enumerably)
  function defineHiddenProperty(obj, prop, value) {
    Object.defineProperty(obj, prop, {
      value: value,
      enumerable: false,
      configurable: true,
      writable: true
    });
  }

  defineHiddenProperty(Array.prototype, 'append', function(x) {
    this.push(x);
  });

  defineHiddenProperty(Array.prototype, 'remove', function(x) {
    const idx = this.indexOf(x);
    if (idx > -1) {
      this.splice(idx, 1);
    } else {
      throw new Error(`ValueError: list.remove(x): x not in list`);
    }
  });

  defineHiddenProperty(Array.prototype, 'insert', function(idx, x) {
    this.splice(idx, 0, x);
  });

  defineHiddenProperty(Array.prototype, 'py_pop', function(idx) {
    if (idx === undefined) {
      return this.pop();
    }
    if (idx < 0 || idx >= this.length) {
      throw new Error(`IndexError: pop index out of range`);
    }
    return this.splice(idx, 1)[0];
  });

  // Object/Dict compatibility
  defineHiddenProperty(Object.prototype, 'get', function(key, defaultValue) {
    return this[key] !== undefined ? this[key] : (defaultValue !== undefined ? defaultValue : null);
  });

  defineHiddenProperty(Object.prototype, 'items', function() {
    return Object.entries(this);
  });

  defineHiddenProperty(Object.prototype, 'keys', function() {
    return Object.keys(this);
  });

  defineHiddenProperty(Object.prototype, 'values', function() {
    return Object.values(this);
  });

  // String and formatting helpers
  defineHiddenProperty(String.prototype, 'py_split', function(sep) {
    return this.split(sep);
  });

  // Python standard functions
  function py_print(outputBuffer) {
    return function(...args) {
      const formatted = args.map(arg => {
        if (arg === null) return 'None';
        if (typeof arg === 'boolean') return arg ? 'True' : 'False';
        if (Array.isArray(arg)) {
          return '[' + arg.map(x => (typeof x === 'string' ? `'${x}'` : String(x))).join(', ') + ']';
        }
        if (typeof arg === 'object') {
          // Check if it's a simulated tuple
          if (arg.__is_tuple__) {
            return '(' + arg.values.map(x => (typeof x === 'string' ? `'${x}'` : String(x))).join(', ') + ')';
          }
          // Simple dictionary string representation
          const entries = Object.entries(arg).map(([k, v]) => {
            const valStr = typeof v === 'string' ? `'${v}'` : String(v);
            return `'${k}': ${valStr}`;
          });
          return '{' + entries.join(', ') + '}';
        }
        return String(arg);
      }).join(' ');
      outputBuffer.push(formatted + '\n');
    };
  }

  function py_type(val) {
    if (val === null) return "<class 'NoneType'>";
    if (typeof val === 'number') {
      return Number.isInteger(val) ? "<class 'int'>" : "<class 'float'>";
    }
    if (typeof val === 'string') return "<class 'str'>";
    if (typeof val === 'boolean') return "<class 'bool'>";
    if (Array.isArray(val)) return "<class 'list'>";
    if (typeof val === 'object') {
      if (val.__is_tuple__) return "<class 'tuple'>";
      return "<class 'dict'>";
    }
    return `<class '${typeof val}'>`;
  }

  function py_range(start, stop, step = 1) {
    if (stop === undefined) {
      stop = start;
      start = 0;
    }
    const result = [];
    if (step > 0) {
      for (let i = start; i < stop; i += step) {
        result.push(i);
      }
    } else if (step < 0) {
      for (let i = start; i > stop; i += step) {
        result.push(i);
      }
    }
    return result;
  }

  function py_len(val) {
    if (val === null || val === undefined) return 0;
    if (typeof val === 'string' || Array.isArray(val)) return val.length;
    if (val.__is_tuple__) return val.values.length;
    if (typeof val === 'object') return Object.keys(val).length;
    return 0;
  }

  // File Simulator
  class SimulatedFile {
    constructor(filename, mode) {
      this.filename = filename;
      this.mode = mode;
      this.closed = false;
      if (mode === 'r' && VIRTUAL_FS[filename] === undefined) {
        throw new Error(`FileNotFoundError: [Errno 2] No such file or directory: '${filename}'`);
      }
      if (mode === 'w' && VIRTUAL_FS[filename] === undefined) {
        VIRTUAL_FS[filename] = '';
      }
    }

    write(content) {
      if (this.closed) throw new Error("ValueError: I/O operation on closed file.");
      if (this.mode === 'r') throw new Error("UnsupportedOperation: not writable");
      
      // Process escaped newlines
      const parsedContent = content.replace(/\\n/g, '\n');
      if (this.mode === 'w') {
        VIRTUAL_FS[this.filename] += parsedContent;
      } else if (this.mode === 'a') {
        if (VIRTUAL_FS[this.filename] === undefined) {
          VIRTUAL_FS[this.filename] = '';
        }
        VIRTUAL_FS[this.filename] += parsedContent;
      }
    }

    read() {
      if (this.closed) throw new Error("ValueError: I/O operation on closed file.");
      if (this.mode === 'w' || this.mode === 'a') throw new Error("UnsupportedOperation: not readable");
      return VIRTUAL_FS[this.filename] || '';
    }

    close() {
      this.closed = true;
    }
  }

  function py_open(filename, mode = 'r') {
    return new SimulatedFile(filename, mode);
  }

  // Tuple simulation helper
  function make_tuple(...args) {
    return {
      __is_tuple__: true,
      values: args,
      toString: function() {
        return '(' + this.values.join(', ') + ')';
      }
    };
  }

  // Main Transpiler function
  function transpilePythonToJS(pythonCode) {
    const lines = pythonCode.split('\n');
    let jsCode = '';
    const indentStack = [0];
    const blockTypeStack = []; // 'normal', 'try', 'with'

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      
      // Handle comments - convert Python '#' comments to JS '//'
      // Guarding against '#' inside strings
      let cleanLine = '';
      let insideSingleQuote = false;
      let insideDoubleQuote = false;
      for (let charIndex = 0; charIndex < line.length; charIndex++) {
        const char = line[charIndex];
        if (char === "'" && !insideDoubleQuote) insideSingleQuote = !insideSingleQuote;
        if (char === '"' && !insideSingleQuote) insideDoubleQuote = !insideDoubleQuote;
        if (char === '#' && !insideSingleQuote && !insideDoubleQuote) {
          cleanLine += '//' + line.slice(charIndex + 1);
          break;
        }
        cleanLine += char;
      }
      
      const trimmed = cleanLine.trim();
      
      // Skip empty lines (but don't reset indentation matching)
      if (trimmed === '' || trimmed.startsWith('//')) {
        jsCode += cleanLine + '\n';
        continue;
      }

      // Calculate indentation (number of leading spaces)
      const indent = cleanLine.match(/^\s*/)[0].length;
      let currentTopIndent = indentStack[indentStack.length - 1];

      // Handle block closure based on indentation
      if (indent < currentTopIndent) {
        while (indent < currentTopIndent) {
          indentStack.pop();
          const closedBlockType = blockTypeStack.pop();
          const currentIndentStr = ' '.repeat(indentStack[indentStack.length - 1]);
          
          if (closedBlockType === 'try') {
            // Wait for catch block
            jsCode += currentIndentStr + '}\n';
          } else if (closedBlockType === 'with') {
            jsCode += currentIndentStr + '} finally {\n' + currentIndentStr + '  // with block close\n' + currentIndentStr + '}\n';
          } else {
            jsCode += currentIndentStr + '}\n';
          }
          
          currentTopIndent = indentStack[indentStack.length - 1];
        }
        
        if (indent !== currentTopIndent) {
          throw new Error(`IndentationError: unindent does not match any outer indentation level at line ${i + 1}`);
        }
      }

      let processedLine = trimmed;

      // Handle replacements
      // 1. Basic syntax conversions
      processedLine = processedLine
        .replace(/\bTrue\b/g, 'true')
        .replace(/\bFalse\b/g, 'false')
        .replace(/\bNone\b/g, 'null')
        .replace(/\band\b/g, '&&')
        .replace(/\bor\b/g, '||')
        .replace(/\bnot\b/g, '!')
        .replace(/\bprint\((.*)\)/g, 'print($1)'); // print call stays print since we register it

      // 2. Python specific operators
      // Floor Division: x // y -> Math.floor(x / y)
      // Matches basic variables, numbers, or function calls
      processedLine = processedLine.replace(/([a-zA-Z0-9_().]+)\s*\/\/\s*([a-zA-Z0-9_().]+)/g, 'Math.floor($1 / $2)');

      // 3. Modifying custom python structures
      processedLine = processedLine.replace(/\.pop\(([^)]*)\)/g, '.py_pop($1)');

      // 4. Tuples definition: e.g., coordinates = (13.7, 100.5) -> make_tuple(13.7, 100.5)
      // Only match coordinate style assignments or colors (x, y, z)
      processedLine = processedLine.replace(/=\s*\(([^)]+)\)/g, '= make_tuple($1)');

      // 5. Unpacking tuples: lat, lon = coordinates -> let [lat, lon] = coordinates.values
      const unpackMatch = processedLine.match(/^([a-zA-Z0-9_,\s]+)\s*=\s*([a-zA-Z0-9_()]+)$/);
      if (unpackMatch && unpackMatch[1].includes(',')) {
        const vars = unpackMatch[1].split(',').map(v => v.trim());
        const source = unpackMatch[2].trim();
        processedLine = `let [${vars.join(', ')}] = ${source}.values || ${source}`;
      }

      // 6. Loop structures
      // for key, value in dict.items():
      const forItemsMatch = processedLine.match(/^for\s+(\w+),\s*(\w+)\s+in\s+(.+):$/);
      if (forItemsMatch) {
        const [, k, v, dictExpr] = forItemsMatch;
        processedLine = `for (let [${k}, ${v}] of ${dictExpr}) {`;
        indentStack.push(indent + 4);
        blockTypeStack.push('normal');
      } else {
        // for i in range(...): or for x in list:
        const forMatch = processedLine.match(/^for\s+(\w+)\s+in\s+(.+):$/);
        if (forMatch) {
          const [, loopVar, iterExpr] = forMatch;
          processedLine = `for (let ${loopVar} of ${iterExpr}) {`;
          indentStack.push(indent + 4);
          blockTypeStack.push('normal');
        }
      }

      // while cond:
      const whileMatch = processedLine.match(/^while\s+(.+):$/);
      if (whileMatch) {
        processedLine = `while (${whileMatch[1]}) {`;
        indentStack.push(indent + 4);
        blockTypeStack.push('normal');
      }

      // 7. Conditionals
      // if cond: / elif cond: / else:
      if (processedLine.startsWith('if ') && processedLine.endsWith(':')) {
        const cond = processedLine.slice(3, -1);
        processedLine = `if (${cond}) {`;
        indentStack.push(indent + 4);
        blockTypeStack.push('normal');
      } else if (processedLine.startsWith('elif ') && processedLine.endsWith(':')) {
        const cond = processedLine.slice(5, -1);
        processedLine = `} else if (${cond}) {`;
        indentStack.push(indent + 4);
        blockTypeStack.push('normal');
      } else if (processedLine === 'else:') {
        processedLine = `} else {`;
        indentStack.push(indent + 4);
        blockTypeStack.push('normal');
      }

      // 8. Functions
      // def func(args):
      const defMatch = processedLine.match(/^def\s+(\w+)\(([^)]*)\):$/);
      if (defMatch) {
        const [, funcName, args] = defMatch;
        processedLine = `function ${funcName}(${args}) {`;
        indentStack.push(indent + 4);
        blockTypeStack.push('normal');
      }

      // 9. Files Context Manager
      // with open(file, mode) as varName:
      const withMatch = processedLine.match(/^with\s+open\(([^)]+)\)\s+as\s+(\w+):$/);
      if (withMatch) {
        const [, openArgs, varName] = withMatch;
        processedLine = `let ${varName} = open(${openArgs}); try {`;
        indentStack.push(indent + 4);
        blockTypeStack.push('with');
      }

      // 10. Exception Handling
      if (processedLine === 'try:') {
        processedLine = `try {`;
        indentStack.push(indent + 4);
        blockTypeStack.push('try');
      } else if (processedLine.startsWith('except ') && processedLine.endsWith(':')) {
        // except ValueError: or except ValueError as err:
        const exceptExpr = processedLine.slice(7, -1).trim();
        const errVar = exceptExpr.includes(' as ') ? exceptExpr.split(' as ')[1].trim() : 'err';
        processedLine = `} catch (${errVar}) {`;
        indentStack.push(indent + 4);
        blockTypeStack.push('normal');
      } else if (processedLine === 'except:') {
        processedLine = `} catch (err) {`;
        indentStack.push(indent + 4);
        blockTypeStack.push('normal');
      } else if (processedLine === 'finally:') {
        processedLine = `} finally {`;
        indentStack.push(indent + 4);
        blockTypeStack.push('normal');
      }

      // Remove remaining trailing colons on simple statements (if any)
      if (processedLine.endsWith(':') && !processedLine.includes('{')) {
        processedLine = processedLine.slice(0, -1);
      }

      // Add to compiled code
      const indentStr = ' '.repeat(indent);
      jsCode += indentStr + processedLine + '\n';
    }

    // Close any remaining blocks
    while (indentStack.length > 1) {
      indentStack.pop();
      const closedBlockType = blockTypeStack.pop();
      const indentStr = ' '.repeat(indentStack[indentStack.length - 1]);
      if (closedBlockType === 'with') {
        jsCode += indentStr + '} finally {\n' + indentStr + '  // final clean close\n' + indentStr + '}\n';
      } else {
        jsCode += indentStr + '}\n';
      }
    }

    return jsCode;
  }

  // Export Runner Globally
  window.PythonRunner = {
    run: function(code) {
      const outputBuffer = [];
      const sandbox = {
        print: py_print(outputBuffer),
        type: py_type,
        str: String,
        int: function(x) {
          const val = parseInt(x, 10);
          if (isNaN(val)) throw new Error("ValueError: invalid literal for int()");
          return val;
        },
        float: function(x) {
          const val = parseFloat(x);
          if (isNaN(val)) throw new Error("ValueError: invalid literal for float()");
          return val;
        },
        range: py_range,
        len: py_len,
        open: py_open,
        make_tuple: make_tuple,
        True: true,
        False: false,
        None: null,
        // Virtual FS reset
        clearFS: function() {
          for (let member in VIRTUAL_FS) delete VIRTUAL_FS[member];
        }
      };

      try {
        const jsCode = transpilePythonToJS(code);
        
        // Execute inside a sandbox context using 'with' statement
        const executionFn = new Function('sandbox', `
          with(sandbox) {
            try {
              ${jsCode}
            } catch(e) {
              throw e;
            }
          }
        `);

        executionFn(sandbox);
        return {
          success: true,
          output: outputBuffer.join(''),
          error: null
        };
      } catch (err) {
        // Convert JS syntax errors to simplified messages
        let errorMessage = err.message;
        if (err instanceof ReferenceError) {
          errorMessage = `NameError: name '${errorMessage.replace('is not defined', '').trim()}' is not defined`;
        }
        return {
          success: false,
          output: outputBuffer.join(''),
          error: errorMessage
        };
      }
    }
  };
})();
