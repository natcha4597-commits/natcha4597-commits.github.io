// Data containing all curriculum topics, details, examples, and Bloom's Taxonomy quizzes
window.COURSE_DATA = [
  {
    id: 1,
    title: "1. พื้นฐานและโครงสร้างควบคุม (Basic & Control Structures)",
    description: "เรียนรู้แนวคิดพื้นฐานการเขียนโปรแกรม การเก็บข้อมูล ตัวดำเนินการ และการควบคุมลำดับการทำงานของคอมพิวเตอร์ด้วยเงื่อนไขและการวนซ้ำ",
    icon: "🚀",
    subtopics: [
      {
        id: "1.1",
        title: "ตัวแปรและชนิดข้อมูล (Variables & Data Types)",
        contentHtml: `
          <h3>ตัวแปร (Variables) คืออะไร?</h3>
          <p>ลองจินตนาการว่า <strong>ตัวแปร (Variable)</strong> เปรียบเสมือน <em>"กล่องใส่ของ"</em> ที่เราติดป้ายชื่อไว้ภายนอก เมื่อเราต้องการเก็บข้อมูลอะไรบางอย่างเพื่อนำไปใช้งานในภายหลัง เราจะนำข้อมูลนั้นใส่ลงไปในกล่องนี้ และเรียกใช้งานผ่านชื่อป้ายที่เราแปะไว้</p>
          
          <div class="note-box info">
            <strong>กฎการตั้งชื่อตัวแปรในภาษา Python:</strong>
            <ul>
              <li>ต้องเริ่มต้นด้วยตัวอักษร (a-z, A-Z) หรือเครื่องหมายขีดล่าง (_) เท่านั้น ห้ามเริ่มต้นด้วยตัวเลข</li>
              <li>สามารถประกอบด้วยตัวอักษร ตัวเลข (0-9) หรือเครื่องหมายขีดล่าง (_) ได้</li>
              <li>ตัวอักษรพิมพ์เล็กและพิมพ์ใหญ่ถือว่าเป็นคนละตัวแปรกัน (Case-Sensitive) เช่น <code>name</code> และ <code>Name</code> คือกล่องคนละใบ</li>
              <li>ห้ามใช้คำสงวน (Reserved Words) ของภาษา Python เช่น <code>if</code>, <code>else</code>, <code>for</code>, <code>while</code>, <code>def</code>, <code>import</code> เป็นต้น</li>
            </ul>
          </div>

          <h3>ชนิดข้อมูลพื้นฐาน (Basic Data Types)</h3>
          <p>ในภาษา Python เราไม่จำเป็นต้องระบุชนิดข้อมูลล่วงหน้าขณะประกาศตัวแปร (เรียกว่า Dynamic Typing) โดยภาษาจะระบุให้เองโดยอัตโนมัติตามค่าที่เรากำหนดให้:</p>
          
          <table class="styled-table">
            <thead>
              <tr>
                <th>ชนิดข้อมูล (Data Type)</th>
                <th>ตัวย่อใน Python</th>
                <th>คำอธิบาย</th>
                <th>ตัวอย่างการประกาศ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>จำนวนเต็ม (Integer)</strong></td>
                <td><code>int</code></td>
                <td>เลขจำนวนเต็มบวก เต็มลบ หรือศูนย์ ไม่มีทศนิยม</td>
                <td><code>age = 18</code><br><code>score = -5</code></td>
              </tr>
              <tr>
                <td><strong>จำนวนทศนิยม (Floating Point)</strong></td>
                <td><code>float</code></td>
                <td>เลขที่มีจุดทศนิยม</td>
                <td><code>gpa = 3.85</code><br><code>pi = 3.14159</code></td>
              </tr>
              <tr>
                <td><strong>ข้อความ (String)</strong></td>
                <td><code>str</code></td>
                <td>ตัวอักษรหรือข้อความที่อยู่ในเครื่องหมายอัญประกาศเดี่ยว (') หรืออัญประกาศคู่ (")</td>
                <td><code>name = "Natcha"</code><br><code>major = 'Computer Science'</code></td>
              </tr>
              <tr>
                <td><strong>ค่าความจริง (Boolean)</strong></td>
                <td><code>bool</code></td>
                <td>มีสองค่าที่เป็นไปได้คือ จริง (<code>True</code>) หรือ เท็จ (<code>False</code>)</td>
                <td><code>is_active = True</code><br><code>has_passed = False</code></td>
              </tr>
            </tbody>
          </table>

          <h3>การตรวจสอบชนิดข้อมูลและการแปลงชนิดข้อมูล (Type Casting)</h3>
          <p>เราสามารถใช้ฟังก์ชัน <code>type()</code> เพื่อตรวจสอบว่าตัวแปรนั้นเก็บข้อมูลชนิดใดอยู่:</p>
          <pre><code class="python">x = 10
print(type(x))  # แสดงผล: &lt;class 'int'&gt;

y = "10"
print(type(y))  # แสดงผล: &lt;class 'str'&gt;</code></pre>
          
          <p>และเราสามารถแปลงชนิดข้อมูลตัวแปรหนึ่งไปยังอีกชนิดหนึ่งได้ (เรียกว่า Type Casting) ด้วยฟังก์ชัน <code>int()</code>, <code>float()</code>, <code>str()</code>:</p>
          <pre><code class="python">num_str = "25"
num_int = int(num_str)   # แปลงจากข้อความ "25" เป็นเลขจำนวนเต็ม 25
num_float = float(num_int) # แปลงจากจำนวนเต็ม 25 เป็นเลขทศนิยม 25.0</code></pre>
        `,
        interactiveCode: {
          code: `# ทดลองสร้างตัวแปรและแสดงผลชนิดข้อมูล
name = "สมชาย"
age = 19
gpa = 3.75

print("สวัสดีคุณ", name)
print("อายุ:", age, "ชนิดข้อมูลคือ:", type(age))
print("เกรดเฉลี่ย:", gpa, "ชนิดข้อมูลคือ:", type(gpa))

# ทดลองแปลงชนิดข้อมูล
age_str = str(age)
print("แปลงอายุเป็นข้อความ:", age_str, "ชนิดข้อมูลคือ:", type(age_str))
`,
          expectedOutput: "สวัสดีคุณ สมชาย\nอายุ: 19 ชนิดข้อมูลคือ: <class 'int'>\nเกรดเฉลี่ย: 3.75 ชนิดข้อมูลคือ: <class 'float'>\nแปลงอายุเป็นข้อความ: 19 ชนิดข้อมูลคือ: <class 'str'>\n"
        }
      },
      {
        id: "1.2",
        title: "ตัวดำเนินการ (Operators)",
        contentHtml: `
          <h3>1. ตัวดำเนินการทางคณิตศาสตร์ (Arithmetic Operators)</h3>
          <p>ใช้สำหรับการคำนวณพื้นฐานทางคณิตศาสตร์:</p>
          <table class="styled-table">
            <thead>
              <tr>
                <th>สัญลักษณ์</th>
                <th>การทำงาน</th>
                <th>ตัวอย่างโค้ด</th>
                <th>ผลลัพธ์</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>+</code></td>
                <td>บวก (Addition)</td>
                <td><code>5 + 3</code></td>
                <td><code>8</code></td>
              </tr>
              <tr>
                <td><code>-</code></td>
                <td>ลบ (Subtraction)</td>
                <td><code>10 - 4</code></td>
                <td><code>6</code></td>
              </tr>
              <tr>
                <td><code>*</code></td>
                <td>คูณ (Multiplication)</td>
                <td><code>3 * 4</code></td>
                <td><code>12</code></td>
              </tr>
              <tr>
                <td><code>/</code></td>
                <td>หาร (Division) - ได้ผลลัพธ์เป็นทศนิยมเสมอ</td>
                <td><code>7 / 2</code></td>
                <td><code>3.5</code></td>
              </tr>
              <tr>
                <td><code>//</code></td>
                <td>หารปัดเศษทิ้ง (Floor Division)</td>
                <td><code>7 // 2</code></td>
                <td><code>3</code></td>
              </tr>
              <tr>
                <td><code>%</code></td>
                <td>หารเอาเศษ (Modulo) - นิยมใช้หาเลขคู่/คี่</td>
                <td><code>7 % 2</code></td>
                <td><code>1</code> (เพราะเศษเหลือเท่ากับ 1)</td>
              </tr>
              <tr>
                <td><code>**</code></td>
                <td>ยกกำลัง (Exponent)</td>
                <td><code>2 ** 3</code> (สองยกกำลังสาม)</td>
                <td><code>8</code></td>
              </tr>
            </tbody>
          </table>

          <h3>2. ตัวดำเนินการเปรียบเทียบ (Comparison Operators)</h3>
          <p>ใช้สำหรับเปรียบเทียบค่าสองค่า ผลลัพธ์ที่ได้จะเป็น Boolean (<code>True</code> หรือ <code>False</code>) เท่านั้น:</p>
          <ul>
            <li><code>==</code> : เท่ากับ (ตรวจสอบว่าค่าเท่ากันหรือไม่ เช่น <code>5 == 5</code> ได้ <code>True</code>)</li>
            <li><code>!=</code> : ไม่เท่ากับ (เช่น <code>5 != 3</code> ได้ <code>True</code>)</li>
            <li><code>&gt;</code> และ <code>&lt;</code> : มากกว่า และ น้อยกว่า</li>
            <li><code>&gt;=</code> และ <code>&lt;=</code> : มากกว่าหรือเท่ากับ และ น้อยกว่าหรือเท่ากับ</li>
          </ul>

          <h3>3. ตัวดำเนินการทางตรรกศาสตร์ (Logical Operators)</h3>
          <p>ใช้เพื่อเชื่อมเงื่อนไขหลายเงื่อนไขเข้าด้วยกัน:</p>
          <ul>
            <li><code>and</code> (และ): จะเป็น <code>True</code> ก็ต่อเมื่อเงื่อนไข <strong>ทุกตัว</strong> เป็นจริงทั้งหมด</li>
            <li><code>or</code> (หรือ): จะเป็น <code>True</code> หากมีเงื่อนไขอย่างน้อย <strong>หนึ่งตัว</strong> ที่เป็นจริง</li>
            <li><code>not</code> (นิเสธ): กลับค่าความจริงจาก <code>True</code> เป็น <code>False</code> และจาก <code>False</code> เป็น <code>True</code></li>
          </ul>
        `,
        interactiveCode: {
          code: `# คำนวณเลขคณิตศาสตร์
a = 15
b = 4

print("a + b =", a + b)
print("a หารแบบปัดเศษทิ้ง a // b =", a // b)
print("a หารเอาเศษ a % b =", a % b)
print("a ยกกำลัง 2 =", b ** 2)

# การเปรียบเทียบและตรรกศาสตร์
score = 85
attendance = 90

# ผ่านเกณฑ์เมื่อคะแนนมากกว่า 80 และเวลาเรียนมากกว่า 80%
passed = (score > 80) and (attendance > 80)
print("ผลการประเมินการผ่านเกณฑ์:", passed)
`,
          expectedOutput: "a + b = 19\na หารแบบปัดเศษทิ้ง a // b = 3\na หารเอาเศษ a % b = 3\na ยกกำลัง 2 = 16\nผลการประเมินการผ่านเกณฑ์: True\n"
        }
      },
      {
        id: "1.3",
        title: "คำสั่งเงื่อนไข (Conditionals: if, elif, else)",
        contentHtml: `
          <h3>โครงสร้างควบคุมแบบทางเลือก (Selection Structures)</h3>
          <p>ในการเขียนโปรแกรม เรามักต้องการให้คอมพิวเตอร์เลือกทำงานบางอย่างตามเงื่อนไขที่กำหนด ภาษา Python ใช้คำสั่ง <code>if</code>, <code>elif</code> (ย่อมาจาก else if), และ <code>else</code></p>
          
          <div class="note-box warning">
            <strong>กฎการจัดย่อหน้า (Indentation Rule):</strong>
            <p>หลังจากจบบรรทัดเงื่อนไขด้วยเครื่องหมายทวิภาค (:) บรรทัดถัดไปที่เป็นคำสั่งย่อยจะต้อง <strong>ย่อหน้าเข้าไป (ส่วนใหญ่ใช้ 4 spaces)</strong> เพื่อบอกขอบเขตการทำงานของเงื่อนไขนั้นๆ ห้ามลืมเด็ดขาด! มิฉะนั้นจะเกิด <code>IndentationError</code></p>
          </div>

          <pre><code class="python">if เงื่อนไข_A:
    # โค้ดที่จะทำงานหาก เงื่อนไข_A เป็นจริง (True)
elif เงื่อนไข_B:
    # โค้ดที่จะทำงานหาก เงื่อนไข_A เป็นเท็จ แต่ เงื่อนไข_B เป็นจริง
else:
    # โค้ดที่จะทำงานหากเงื่อนไขก่อนหน้าทั้งหมดเป็นเท็จ (False)</code></pre>

          <h3>ตัวอย่าง: ระบบคำนวณผลการเรียน (Grade Calculator)</h3>
          <p>ระบบจะรับคะแนนเข้ามาเปรียบเทียบในแต่ละช่วงคะแนนเพื่อแสดงผลเกรด:</p>
          <pre><code class="python">score = 75

if score >= 80:
    print("ได้เกรด A")
elif score >= 70:
    print("ได้เกรด B")
elif score >= 60:
    print("ได้เกรด C")
else:
    print("ไม่ผ่านเกณฑ์ (Grade F)")</code></pre>
        `,
        interactiveCode: {
          code: `# ทดสอบระบบตรวจสอบเงื่อนไข
score = 75

print("ตรวจสอบคะแนน:", score)
if score >= 80:
    grade = "A"
elif score >= 70:
    grade = "B"
elif score >= 60:
    grade = "C"
else:
    grade = "F"

print("ผลเกรดที่ได้คือ:", grade)
`,
          expectedOutput: "ตรวจสอบคะแนน: 75\nผลเกรดที่ได้คือ: B\n"
        }
      },
      {
        id: "1.4",
        title: "คำสั่งวนซ้ำ (Loops: for, while)",
        contentHtml: `
          <h3>คำสั่งวนซ้ำ (Repetitive / Loop Structures)</h3>
          <p>ใช้เพื่อสั่งให้โปรแกรมประมวลผลโค้ดซ้ำๆ กันตามจำนวนรอบที่แน่นอน หรือในขณะที่เงื่อนไขยังเป็นจริงอยู่</p>
          
          <h3>1. while Loop (วนซ้ำตามเงื่อนไข)</h3>
          <p>จะตรวจสอบเงื่อนไขก่อนการประมวลผล หากเงื่อนไขยังคงเป็น <code>True</code> จะทำงานซ้ำในบล็อกไปเรื่อยๆ จนกว่าเงื่อนไขจะกลายเป็น <code>False</code></p>
          <pre><code class="python">count = 1
while count <= 3:
    print("รอบที่", count)
    count = count + 1 # สำคัญมาก! ต้องเพิ่มค่าตัวแปรเงื่อนไข เพื่อไม่ให้เกิด Infinite Loop</code></pre>

          <h3>2. for Loop (วนซ้ำตามช่วงข้อมูล)</h3>
          <p>จะนิยมใช้เมื่อรู้จำนวนรอบที่ชัดเจน หรือใช้ในการวนซ้ำดึงค่าจากกลุ่มข้อมูล (Sequence) เช่น สายอักขระ (String) หรือ List</p>
          <p>โดยปกติมักใช้ร่วมกับฟังก์ชัน <code>range(start, stop, step)</code>:</p>
          <ul>
            <li><code>range(5)</code>: สร้างลำดับเลขตั้งแต่ 0 ถึง 4 (ทั้งหมด 5 ตัว: 0, 1, 2, 3, 4)</li>
            <li><code>range(1, 6)</code>: สร้างลำดับเลขตั้งแต่ 1 ถึง 5</li>
            <li><code>range(1, 10, 2)</code>: สร้างลำดับเลขตั้งแต่ 1 โดยเพิ่มทีละ 2 ไปจนไม่เกิน 10 (ได้แก่ 1, 3, 5, 7, 9)</li>
          </ul>

          <pre><code class="python">for i in range(1, 4):
    print("ตัวเลขปัจจุบัน:", i)</code></pre>

          <h3>คำสั่งควบคุมเพิ่มเติม: break และ continue</h3>
          <ul>
            <li><code>break</code>: สั่งให้หยุดและออกจากลูปปัจจุบันทันทีโดยไม่ประมวลผลต่อ</li>
            <li><code>continue</code>: สั่งให้ข้ามโค้ดส่วนที่เหลือในรอบนั้นๆ และเริ่มทำงานในลูปรอบถัดไปทันที</li>
          </ul>
        `,
        interactiveCode: {
          code: `# ตัวอย่างการวนลูปหาผลรวมเลข 1 ถึง 5 โดยใช้ for loop
total = 0
for i in range(1, 6):
    total = total + i
    print("รอบที่", i, "ผลรวมสะสม =", total)

print("ผลรวมทั้งหมด =", total)

# ลูป while ที่มี break
print("\n--- ทดสอบลูป while ด้วย break ---")
x = 1
while x <= 10:
    if x == 4:
        print("เจอเลข 4 แล้ว! สั่งหยุดทำงานในลูปทันที")
        break
    print("x =", x)
    x = x + 1
`,
          expectedOutput: "รอบที่ 1 ผลรวมสะสม = 1\nรอบที่ 2 ผลรวมสะสม = 3\nรอบที่ 3 ผลรวมสะสม = 6\nรอบที่ 4 ผลรวมสะสม = 10\nรอบที่ 5 ผลรวมสะสม = 15\nผลรวมทั้งหมด = 15\n\n--- ทดสอบลูป while ด้วย break ---\nx = 1\nx = 2\nx = 3\nเจอเลข 4 แล้ว! สั่งหยุดทำงานในลูปทันที\n"
        }
      }
    ],
    quizzes: [
      {
        level: "remembering",
        levelTh: "ระดับความจำ (Remembering)",
        question: "การตั้งชื่อตัวแปรในภาษา Python ข้อใดต่อไปนี้ทำได้ถูกต้องตามกฎ?",
        options: [
          "1st_name = 'Somchai'",
          "class = 'Freshman'",
          "my-score = 90",
          "_user_age = 20"
        ],
        answerIndex: 3,
        explanation: "ตามกฎของภาษา Python:\n- ไม่สามารถตั้งชื่อเริ่มต้นด้วยตัวเลขได้ (1st_name จึงผิด)\n- ไม่สามารถใช้คำสงวน เช่น 'class' ในการตั้งชื่อตัวแปรได้\n- ไม่สามารถใช้เครื่องหมายยัติภังค์ (-) ในชื่อได้เนื่องจากจะถูกมองเป็นลบ (my-score จึงผิด)\n- การนำหน้าด้วยเครื่องหมายขีดล่าง (_) เช่น _user_age สามารถทำได้ถูกต้อง"
      },
      {
        level: "understanding",
        levelTh: "ระดับความเข้าใจ (Understanding)",
        question: "พิจารณาโค้ดต่อไปนี้:\n\nresult = 17 // 3 + 2 ** 3\n\nหลังจากทำงานเสร็จ ตัวแปร result จะมีค่าเท่าใด?",
        options: [
          "13",
          "13.66",
          "14",
          "15"
        ],
        answerIndex: 0,
        explanation: "ลำดับความสำคัญของตัวดำเนินการ (Operator Precedence):\n1. 2 ** 3 คำนวณเป็นเลขยกกำลังก่อน ได้ค่าเป็น 8\n2. 17 // 3 เป็นการหารแบบปัดเศษทิ้ง (Floor Division) ได้ผลลัพธ์เป็น 5 (17 หารด้วย 3 ได้ 5.66 -> ปัดเศษทิ้งเป็น 5)\n3. นำผลลัพธ์มาบวกกัน: 5 + 8 = 13\nดังนั้นคำตอบที่ถูกต้องคือ 13"
      },
      {
        level: "applying",
        levelTh: "ระดับการประยุกต์ใช้ (Applying)",
        question: "หากต้องการตรวจสอบว่าค่าในตัวแปร number เป็นจำนวนคู่หรือไม่ เงื่อนไขในคำสั่ง if ควรเขียนอย่างไร?",
        options: [
          "if number / 2 == 0:",
          "if number % 2 == 0:",
          "if number % 2 != 0:",
          "if number // 2 == 0:"
        ],
        answerIndex: 1,
        explanation: "จำนวนคู่คือจำนวนที่หารด้วย 2 ลงตัว (ไม่มีเศษเหลือ หรือเศษเหลือเป็น 0)\nตัวดำเนินการหารเอาเศษคือเครื่องหมาย Modulo (%) ดังนั้น `number % 2` จะคำนวณหาเศษที่เหลือจากการหารด้วย 2\nเงื่อนไข `number % 2 == 0` จึงเป็นการตรวจสอบว่าเศษที่เหลือเท่ากับ 0 หรือหารลงตัว ซึ่งเป็นการเช็คจำนวนคู่ที่ถูกต้อง"
      },
      {
        level: "analyzing",
        levelTh: "ระดับการวิเคราะห์ (Analyzing)",
        question: "พิจารณาโค้ดลูปต่อไปนี้:\n\nx = 5\nwhile x > 0:\n    if x == 3:\n        continue\n    print(x)\n    x = x - 1\n\nโค้ดนี้จะเกิดผลลัพธ์อย่างไรเมื่อทำงาน?",
        options: [
          "แสดงเลข 5, 4, 2, 1 แล้วโปรแกรมจบการทำงานตามปกติ",
          "แสดงเลข 5, 4 แล้วหยุดทันที โปรแกรมไม่ค้าง",
          "แสดงเลข 5, 4 แล้วเกิดลูปไม่รู้จบ (Infinite Loop) ที่เลข 3 โปรแกรมค้าง",
          "ไม่แสดงผลใดๆ เลยเนื่องจาก Syntax Error"
        ],
        answerIndex: 2,
        explanation: "วิเคราะห์การทำงาน:\n- รอบที่ 1: x = 5, เงื่อนไข x > 0 เป็นจริง, x != 3, แสดงเลข 5, x ลดลงเหลือ 4\n- รอบที่ 2: x = 4, เงื่อนไข x > 0 เป็นจริง, x != 3, แสดงเลข 4, x ลดลงเหลือ 3\n- รอบที่ 3: x = 3, เงื่อนไข x > 0 เป็นจริง, x == 3 เงื่อนไขใน if เป็นจริง โปรแกรมจะเจอคำสั่ง `continue` ซึ่งสั่งให้กลับไปทำงานลูปรอบถัดไปทันทีโดยไม่ประมวลผลโค้ดที่เหลือ\n- ส่งผลให้ x ไม่ถูกลดค่า (บรรทัด x = x - 1 ถูกข้าม) ค่าของ x จึงเป็น 3 อยู่ตลอดไป และวนตรวจสอบเงื่อนไข x == 3 ซ้ำไปเรื่อยๆ จนกลายเป็น Infinite Loop (ลูปค้าง)"
      },
      {
        level: "evaluating",
        levelTh: "ระดับการประเมินค่า (Evaluating)",
        question: "พิจารณาการตรวจสอบคะแนนสองรูปแบบ:\n\nแบบที่ 1:\nif score >= 80: grade = 'A'\nelif score >= 50: grade = 'P'\nelse: grade = 'F'\n\nแบบที่ 2:\nif score >= 50: grade = 'P'\nelif score >= 80: grade = 'A'\nelse: grade = 'F'\n\nหากคะแนนของนักศึกษาคือ score = 85 การประเมินในข้อใดเป็นจริง?",
        options: [
          "ทั้งสองแบบจะได้เกรด 'A' เหมือนกันเนื่องจากคะแนนเป็น 85 เหมือนกัน",
          "แบบที่ 1 ได้เกรด 'A' แต่แบบที่ 2 จะได้เกรด 'P' เนื่องจากเงื่อนไขแรกเป็นจริงก่อน",
          "แบบที่ 1 ได้เกรด 'P' แต่แบบที่ 2 จะได้เกรด 'A'",
          "แบบที่ 2 จะแจ้งเตือนข้อผิดพลาด (Syntax Error) เนื่องจากวางเงื่อนไขผิดพลาด"
        ],
        answerIndex: 1,
        explanation: "โครงสร้างเงื่อนไข if-elif-else จะเริ่มเช็คเงื่อนไขจากบนลงล่าง เมื่อพบเงื่อนไขใดที่เป็นจริง (True) ตัวแรก มันจะประมวลผลโค้ดในบล็อกนั้นแล้วออกจากโครงสร้างเงื่อนไขทั้งหมดทันที\n- ในแบบที่ 1: score = 85 เช็ค `score >= 80` เป็นจริง ได้เกรด 'A' ถูกต้อง\n- ในแบบที่ 2: score = 85 เช็ค `score >= 50` ซึ่งเป็นจริงก่อน! โปรแกรมจึงเลือกทำบล็อกเกรด 'P' แล้วข้ามเงื่อนไขที่เหลือทันที ทำให้นักเรียนได้เกรด 'P' ทั้งๆ ที่ได้คะแนนสูง\nดังนั้นการเรียงลำดับเงื่อนไขจึงมีความสำคัญอย่างมาก"
      },
      {
        level: "creating",
        levelTh: "ระดับการสร้างสรรค์ (Creating)",
        question: "จงเลือกชุดคำสั่งที่สามารถวนซ้ำเพื่อพิมพ์เลขเฉพาะคี่ ตั้งแต่ 1 ถึง 9 ได้ครบถ้วนและเหมาะสมที่สุด?",
        options: [
          "for i in range(1, 10):\n    print(i)",
          "for i in range(1, 10, 2):\n    print(i)",
          "for i in range(0, 10, 2):\n    print(i + 1)",
          "for i in range(1, 9, 2):\n    print(i)"
        ],
        answerIndex: 1,
        explanation: "ฟังก์ชัน `range(start, stop, step)`:\n- `range(1, 10, 2)` จะสร้างตัวเลขเริ่มต้นที่ 1 เพิ่มขึ้นทีละ 2 (เลขคี่) ไปจนถึงค่าที่ไม่เกิน 10 ซึ่งก็คือตัวเลข 1, 3, 5, 7, 9\n- ตัวเลือกที่ 4: `range(1, 9, 2)` จะสร้างตัวเลข 1, 3, 5, 7 เท่านั้น (หยุดก่อนถึง 9)\nดังนั้นตัวเลือกที่ 2 จึงเป็นคำสั่งที่ตรงประเด็นและสั้นกระชับที่สุด"
      }
    ]
  },
  {
    id: 2,
    title: "2. โครงสร้างข้อมูล (Data Structures)",
    description: "ศึกษาโครงสร้างข้อมูลสำหรับการจัดระเบียบชุดข้อมูลหลายๆ ค่าในตัวแปรเดียว ได้แก่ List, Tuple และ Dictionary",
    icon: "📦",
    subtopics: [
      {
        id: "2.1",
        title: "List (โครงสร้างข้อมูลแบบรายการที่สามารถแก้ไขได้)",
        contentHtml: `
          <h3>List คืออะไร?</h3>
          <p><strong>List (รายการ)</strong> เป็นโครงสร้างข้อมูลพื้นฐานที่ใช้เก็บข้อมูลหลายๆ ตัวไว้ในกล่องเดียว โดยข้อมูลแต่ละตัวจะเรียงลำดับกันและระบุตำแหน่งด้วยเลขดัชนี (Index) ข้อดีของ List คือมี <strong>ความยืดหยุ่นสูง สามารถเก็บชนิดข้อมูลผสมกันได้ และสามารถเปลี่ยนแปลงค่า (Mutable)</strong> เพิ่ม หรือลบข้อมูลหลังจากสร้างขึ้นมาได้</p>

          <pre><code class="python"># การประกาศ List ใช้เครื่องหมายวงเล็บเหลี่ยม [ ]
fruits = ["apple", "banana", "cherry"]
mixed_list = [10, "Python", 3.14, True]</code></pre>

          <h3>การระบุตำแหน่ง (Indexing) และการตัดส่วนข้อมูล (Slicing)</h3>
          <p>ดัชนี (Index) ของ List จะเริ่มต้นจากเลข <code>0</code> เสมอสำหรับตัวแรก และเราสามารถระบุตำแหน่งจากท้ายสุดของรายการโดยใช้เลขลบ เริ่มต้นที่ <code>-1</code>:</p>
          <pre><code class="python">numbers = [10, 20, 30, 40, 50]
print(numbers[0])   # แสดงผล: 10 (ตัวแรก)
print(numbers[-1])  # แสดงผล: 50 (ตัวสุดท้าย)</code></pre>

          <p><strong>Slicing (การหั่นข้อมูล):</strong> รูปแบบคือ <code>list[start:stop]</code> ซึ่งจะสกัดค่าตั้งแต่ดัชนี <code>start</code> ไปจนถึง <code>stop - 1</code> (ไม่รวมดัชนีตำแหน่งหยุด):</p>
          <pre><code class="python">print(numbers[1:4]) # แสดงผล: [20, 30, 40] (ดัชนี 1 ถึง 3)</code></pre>

          <h3>ฟังก์ชันและเมธอดที่สำคัญในการจัดการ List</h3>
          <ul>
            <li><code>len(list)</code>: คืนค่าขนาดความยาวหรือจำนวนสมาชิกใน List</li>
            <li><code>list.append(value)</code>: เพิ่มข้อมูลใหม่ต่อท้าย List</li>
            <li><code>list.insert(index, value)</code>: แทรกข้อมูลลงไปตามตำแหน่งที่กำหนด</li>
            <li><code>list.remove(value)</code>: ค้นหาและลบสมาชิกตัวแรกที่มีค่าตรงกับที่ระบุ</li>
            <li><code>list.pop(index)</code>: ลบและคืนค่าข้อมูลตามตำแหน่งที่กำหนด (หากไม่ใส่ดัชนีจะลบตัวสุดท้าย)</li>
          </ul>
        `,
        interactiveCode: {
          code: `# ทดสอบการใช้งาน List
scores = [85, 72, 90, 68]
print("ข้อมูลเริ่มต้น:", scores)

# เพิ่มข้อมูลต่อท้าย
scores.append(95)
print("หลัง append(95):", scores)

# ลบข้อมูลตำแหน่งแรกสุด
removed_val = scores.pop(0)
print("ดึงค่าตำแหน่ง 0 ออกมาคือ:", removed_val)
print("ข้อมูลปัจจุบัน:", scores)

# ค้นหาความยาวของ List
print("จำนวนสมาชิกทั้งหมด =", len(scores))
`,
          expectedOutput: "ข้อมูลเริ่มต้น: [85, 72, 90, 68]\nหลัง append(95): [85, 72, 90, 68, 95]\nดึงค่าตำแหน่ง 0 ออกมาคือ: 85\nข้อมูลปัจจุบัน: [72, 90, 68, 95]\nจำนวนสมาชิกทั้งหมด = 4\n"
        }
      },
      {
        id: "2.2",
        title: "Tuple (โครงสร้างข้อมูลแบบรายการที่แก้ไขไม่ได้)",
        contentHtml: `
          <h3>Tuple คืออะไร?</h3>
          <p><strong>Tuple</strong> มีความคล้ายคลึงกับ List เกือบทุกประการ เช่น สมาชิกมีการเรียงลำดับและเข้าถึงด้วยดัชนีได้ แต่ความแตกต่างที่สำคัญอย่างยิ่งคือ Tuple เป็นข้อมูลประเภท <strong>Immutable</strong> หรือ <strong>ไม่สามารถแก้ไข เพิ่ม หรือลบข้อมูลสมาชิกหลังจากที่สร้างขึ้นมาได้เลย</strong></p>

          <pre><code class="python"># การประกาศ Tuple ใช้เครื่องหมายวงเล็บโค้ง ( )
coordinates = (13.7563, 100.5018) # พิกัดละติจูด, ลองจิจูด
rgb_color = (255, 128, 0)         # ค่าสี RGB</code></pre>

          <h3>ทำไมต้องใช้ Tuple? ในเมื่อแก้ไขอะไรไม่ได้เลย?</h3>
          <div class="note-box info">
            <strong>ประโยชน์ของ Tuple:</strong>
            <ul>
              <li><strong>ความปลอดภัยของข้อมูล (Data Integrity):</strong> ป้องกันไม่ให้โปรแกรมหรือผู้เขียนร่วมแก้ไขค่าสำคัญระหว่างการทำงาน เช่น ค่าคงที่ระบบ พิกัดทางภูมิศาสตร์ หรือค่าคอนฟิกูเรชันต่างๆ</li>
              <li><strong>ความเร็วในการประมวลผล (Performance):</strong> เนื่องจากข้อมูลมีขนาดคงที่ Python จึงสามารถจัดสรรหน่วยความจำและเข้าถึง Tuple ได้รวดเร็วกว่า List</li>
              <li><strong>การกระจายค่า (Tuple Unpacking):</strong> สามารถสกัดค่าออกมาใส่ตัวแปรย่อยๆ ได้ทันที:
                <pre><code class="python">lat, lon = coordinates
print("Latitude:", lat)
print("Longitude:", lon)</code></pre>
              </li>
            </ul>
          </div>
        `,
        interactiveCode: {
          code: `# ทดลองสร้างและใช้งาน Tuple
student_info = ("Natcha", "CS", 1001)

# การเข้าถึงข้อมูลด้วยดัชนี
print("ชื่อนักศึกษา:", student_info[0])

# การกระจายค่า (Unpacking)
name, major, id_num = student_info
print("รหัสนักศึกษา:", id_num)

# ทดลองปลดคอมเมนต์บรรทัดล่างเพื่อดู Error (เมื่อกด Run จะมี Error เกิดขึ้น)
# student_info[0] = "Somchai" 
`,
          expectedOutput: "ชื่อนักศึกษา: Natcha\nรหัสนักศึกษา: 1001\n"
        }
      },
      {
        id: "2.3",
        title: "Dictionary (โครงสร้างข้อมูลคู่ Key-Value)",
        contentHtml: `
          <h3>Dictionary คืออะไร?</h3>
          <p>ในหลายภาษาจะเรียกโครงสร้างนี้ว่า Associative Array หรือ Map สำหรับ <strong>Dictionary</strong> ในภาษา Python จะเก็บข้อมูลในลักษณะของ <strong>"คู่ Key-Value" (กุญแจหลักและข้อมูลค่าจริง)</strong> โดยใช้เครื่องหมายปีกกา <code>{ }</code></p>
          <p>เปรียบเสมือนพจนานุกรมจริงๆ ที่เวลาเราอยากรู้ความหมาย (Value) เราจะต้องเปิดหาคำศัพท์เฉพาะตัว (Key) ทำให้เราค้นหาข้อมูลได้รวดเร็วมาก โดยไม่ต้องวนหาทีละตำแหน่งเหมือน List</p>

          <pre><code class="python"># การประกาศ Dictionary
student = {
    "id": "66010012",
    "name": "นัชชา",
    "gpa": 3.92,
    "is_passed": True
}</code></pre>

          <div class="note-box warning">
            <strong>ข้อกำหนดของ Key และ Value:</strong>
            <ul>
              <li><strong>Key:</strong> ต้องไม่ซ้ำกัน (Unique) และต้องเป็นวัตถุที่ไม่สามารถเปลี่ยนค่าได้ (เช่น String, Number, Tuple)</li>
              <li><strong>Value:</strong> จะเป็นชนิดข้อมูลใดๆ ก็ได้ รวมถึง List หรือ Dictionary ซ้อนอยู่ภายในได้ด้วย</li>
            </ul>
          </div>

          <h3>การใช้งานพื้นฐานของ Dictionary</h3>
          <ul>
            <li><strong>การเข้าถึงค่าข้อมูล:</strong> ใช้ Key ระบุภายในวงเล็บเหลี่ยม หรือใช้เมธอด <code>.get()</code> เพื่อป้องกันข้อผิดพลาดหากไม่พบ Key:
              <pre><code class="python">print(student["name"])          # แสดงผล: นัชชา
print(student.get("age", 18))   # หากไม่มี key "age" จะคืนค่าเริ่มต้น 18</code></pre>
            </li>
            <li><strong>การเพิ่มหรืออัปเดตข้อมูล:</strong> <code>student["age"] = 19</code> (หากไม่มี Key จะเป็นการเพิ่มใหม่ หากมีอยู่แล้วจะแก้ทับค่าเดิม)</li>
            <li><strong>การลบข้อมูล:</strong> <code>del student["gpa"]</code> หรือ <code>student.pop("gpa")</code></li>
            <li><strong>การวนซ้ำดึงข้อมูล:</strong>
              <pre><code class="python">for key, value in student.items():
    print(key, "->", value)</code></pre>
            </li>
          </ul>
        `,
        interactiveCode: {
          code: `# สร้างและอัปเดตข้อมูล Dictionary
car = {
    "brand": "Toyota",
    "model": "Yaris",
    "year": 2022
}

# แสดงค่าเดิม
print("ข้อมูลรถยนต์เริ่มต้น:", car)

# อัปเดตปีของรถ และเพิ่มสีรถ
car["year"] = 2023
car["color"] = "Pastel Pink"

print("ข้อมูลหลังอัปเดต:", car)

# ลบข้อมูลโมเดลรถออก
car.pop("model")
print("หลังลบ key 'model':", car)
`,
          expectedOutput: "ข้อมูลรถยนต์เริ่มต้น: {'brand': 'Toyota', 'model': 'Yaris', 'year': 2022}\nข้อมูลหลังอัปเดต: {'brand': 'Toyota', 'model': 'Yaris', 'year': 2023, 'color': 'Pastel Pink'}\nหลังลบ key 'model': {'brand': 'Toyota', 'year': 2023, 'color': 'Pastel Pink'}\n"
        }
      }
    ],
    quizzes: [
      {
        level: "remembering",
        levelTh: "ระดับความจำ (Remembering)",
        question: "ข้อใดกล่าวถึงคุณสมบัติของ Tuple ได้อย่างถูกต้องและสอดคล้องที่สุด?",
        options: [
          "เป็นรายการข้อมูลเรียงลำดับที่สามารถเพิ่มและขยายขนาดได้เรื่อยๆ ในขณะรัน",
          "เป็นโครงสร้างที่เก็บข้อมูลด้วยคู่ของ Key-Value ที่ห้ามซ้ำกัน",
          "เป็นรายการเก็บข้อมูลแบบเรียงลำดับที่เป็น Immutable ไม่สามารถแก้ไขค่าหลังจากสร้างได้",
          "เป็นข้อมูลประเภทเซตที่สมาชิกทุกตัวในโครงสร้างต้องไม่ซ้ำกัน"
        ],
        answerIndex: 2,
        explanation: "Tuple คือโครงสร้างข้อมูลประเภทเรียงลำดับ (Sequence) ที่ใช้สัญลักษณ์วงเล็บโค้ง ( ) มีลักษณะเด่นคือเป็นข้อมูลที่ไม่สามารถเปลี่ยนแปลงค่าได้ (Immutable) หลังจากถูกนิยามขึ้นแล้ว ดังนั้นจึงตรงกับข้อ 3"
      },
      {
        level: "understanding",
        levelTh: "ระดับความเข้าใจ (Understanding)",
        question: "กำหนดให้ตัวแปร list_data = [10, 20, 30, 40, 50, 60] คำสั่งใดที่ให้ผลสกัดสับเซต (Slicing) ออกมาเป็นค่า [20, 30, 40]?",
        options: [
          "list_data[1:3]",
          "list_data[1:4]",
          "list_data[2:4]",
          "list_data[2:5]"
        ],
        answerIndex: 1,
        explanation: "ตำแหน่งดัชนี (Index) ของตัวแปร list_data มีดังนี้:\n- ดัชนี 0 คือ 10\n- ดัชนี 1 คือ 20\n- ดัชนี 2 คือ 30\n- ดัชนี 3 คือ 40\n- ดัชนี 4 คือ 50\nการทำ Slicing ด้วยรูปแบบ `list[start:stop]` จะได้ค่าเริ่มตั้งแต่ตำแหน่ง `start` ถึงตำแหน่ง `stop - 1`\nดังนั้นถ้าต้องการ [20, 30, 40] (ดัชนี 1 ถึง 3) จะต้องใช้ `list_data[1:4]` ซึ่งก็คือดัชนี 1 ถึงก่อนหน้า 4 (ซึ่งคือดัชนี 3)"
      },
      {
        level: "applying",
        levelTh: "ระดับการประยุกต์ใช้ (Applying)",
        question: "ข้อใดคือชุดคำสั่งที่สามารถอัปเดตคะแนนวิชา 'Computer Programming' จากเดิม 75 คะแนนให้เปลี่ยนเป็น 90 คะแนนในตัวแปรเก็บบันทึกข้อมูลต่อไปนี้:\n\nsubjects = {'Python': 80, 'Computer Programming': 75, 'Calculus': 65}",
        options: [
          "subjects['Computer Programming'] = 90",
          "subjects.append('Computer Programming', 90)",
          "subjects[1] = 90",
          "subjects.add('Computer Programming': 90)"
        ],
        answerIndex: 0,
        explanation: "ใน Dictionary การแก้ไขค่าข้อมูลของ Key ที่มีอยู่แล้ว สามารถทำได้โดยอ้างอิงถึง Key นั้นโดยตรงผ่านวงเล็บเหลี่ยมแล้วเขียนทับค่าใหม่ด้วยเครื่องหมายเท่ากับ (=) เช่น `subjects['KeyName'] = NewValue` \nส่วน `.append()` หรือการอ้างอิงด้วยดัชนีตัวเลขลำดับ (Index) จะไม่สามารถใช้ได้กับ Dictionary ที่เป็นคู่ Key-Value"
      },
      {
        level: "analyzing",
        levelTh: "ระดับการวิเคราะห์ (Analyzing)",
        question: "พิจารณาโค้ดการทำงานต่อไปนี้:\n\nlist_a = [1, 2, 3]\nlist_b = list_a\nlist_b.append(4)\nprint(list_a)\n\nโปรแกรมจะพิมพ์ผลลัพธ์อะไรออกมาในตอนท้าย?",
        options: [
          "[1, 2, 3]",
          "[1, 2, 3, 4]",
          "เกิดข้อผิดพลาดรันไม่ได้ (Runtime Error)",
          "[1, 2, 3, [4]]"
        ],
        answerIndex: 1,
        explanation: "วิเคราะห์เหตุผลเชิงลึก:\n- ในภาษา Python ตัวแปรที่เป็นวัตถุเปลี่ยนค่าได้ (Mutable Object) อย่าง List เมื่อเรากำหนดให้ `list_b = list_a` จะไม่ใช่การก๊อปปี้ข้อมูลสร้างลิสต์ใหม่แยกกัน แต่จะเป็นการส่งผ่านการอ้างอิงหน่วยความจำ (Reference) ทำให้ตัวแปรทั้งสองตัวชี้ไปยังลิสต์กล่องเดียวกันในหน่วยความจำ\n- ดังนั้นเมื่อเราแก้ไขข้อมูลผ่านตัวแปร `list_b` ด้วยคำสั่ง `list_b.append(4)` จึงส่งผลกระทบต่อลิสต์ที่ตัวแปร `list_a` กำลังชี้อยู่ด้วย\n- ผลลัพธ์ที่พิมพ์ออกมาผ่าน `print(list_a)` จึงกลายเป็น `[1, 2, 3, 4]`"
      },
      {
        level: "evaluating",
        levelTh: "ระดับการประเมินค่า (Evaluating)",
        question: "หากต้องการออกแบบตารางเก็บข้อมูลเพื่อค้นหาระเบียนนักศึกษาอย่างรวดเร็ว โดยกำหนดรหัสนักศึกษาเป็นรหัสสืบค้นหลัก (Search Key) ข้อใดคือการจับคู่โครงสร้างข้อมูลใน Python ที่เหมาะสมและมีประสิทธิภาพการทำงานสูงที่สุด?",
        options: [
          "ใช้ List เก็บวัตถุนักศึกษา แล้วสั่งวนลูปค้นหาจากดัชนีแรกไปจนถึงตัวสุดท้าย",
          "ใช้ Tuple เก็บรหัสนักศึกษาไว้ข้างหน้า และใช้วงเล็บเป็นข้อมูลส่วนตัวข้างหลัง",
          "ใช้ Dictionary โดยใช้รหัสนักศึกษาเป็น Key และใช้ข้อมูลประวัตินักศึกษาเป็น Value",
          "ใช้ Dictionary โดยใช้ประวัตินักศึกษาเป็น Key และรหัสนักศึกษาเป็น Value"
        ],
        answerIndex: 2,
        explanation: "การวิเคราะห์ประสิทธิภาพการค้นหา:\n- โครงสร้างแบบ List จะต้องใช้เวลานานในการค้นหา (Time Complexity เป็น O(n)) เพราะอาจต้องไล่เปรียบเทียบตั้งแต่คนแรกไปจนถึงคนสุดท้าย\n- Dictionary ได้รับการออกแบบมาเพื่อการค้นหาข้อมูลแบบชี้เฉพาะอย่างรวดเร็วด้วย Key (ใช้แฮชเทเบิลในการทำงาน มีค่าเฉลี่ยเป็น O(1))\n- และรหัสนักศึกษามีคุณลักษณะเฉพาะตัวที่ไม่ซ้ำกัน (Unique) จึงเหมาะสำหรับการเป็น Key ในการสืบค้นเพื่อหาประวัติย่อย (Value)\nดังนั้นคำตอบในข้อ 3 จึงเป็นทางเลือกที่ดีที่สุดในการแก้ไขปัญหานี้"
      },
      {
        level: "creating",
        levelTh: "ระดับการสร้างสรรค์ (Creating)",
        question: "หากมีข้อมูลรายชื่อผลไม้อยู่ในตัวแปร fruits = ['apple', 'orange', 'apple', 'banana', 'orange'] จงเลือกชุดโค้ดในการสร้าง Dictionary เพื่อใช้สรุปผลจำนวนการนับของผลไม้แต่ละชนิดในรายการได้ถูกต้องและยืดหยุ่นที่สุด?",
        options: [
          "fruit_count = {'apple': 2, 'orange': 2, 'banana': 1}",
          "fruit_count = {}\nfor f in fruits:\n    fruit_count[f] = fruit_count.get(f, 0) + 1",
          "fruit_count = {}\nfor f in fruits:\n    fruit_count[f] = 1",
          "fruit_count = {}\nfor i in range(len(fruits)):\n    fruit_count[fruits[i]] = i"
        ],
        answerIndex: 1,
        explanation: "การสร้างตัวนับความถี่ (Frequency Counter) ของรายการข้อมูลที่มีความยืดหยุ่น:\n- ตัวเลือกแรกเป็นการเขียนคำตอบแบบ Hardcoded ซึ่งไม่ยืดหยุ่นหากรายชื่อผลไม้ในตัวแปรมีการเปลี่ยนแปลง\n- ตัวเลือกที่ 2 ใช้วิธีที่ถูกต้องและยืดหยุ่น โดยเริ่มกำหนด Dictionary เปล่าขึ้นมา และวนซ้ำเข้าไปตรวจสอบทีละผลไม้ ดึงผลการนับเดิมขึ้นมาตรวจสอบด้วยคำสั่ง `.get(f, 0)` หากผลไม้นั้นยังไม่มีใน Dictionary จะคืนค่าเริ่มต้น 0 แล้วนำไปบวกเพิ่ม 1 สะสมเก็บไว้\n- วิธีการนี้จะสามารถใช้นับกลุ่มข้อมูลผลไม้รายการใดๆ ขนาดเท่าใดก็ได้โดยไม่ต้องแก้ไขโค้ด"
      }
    ]
  },
  {
    id: 3,
    title: "3. การใช้งานฟังก์ชัน (Functions)",
    description: "เรียนรู้วิธีแบ่งโค้ดเป็นบล็อกย่อยๆ ที่ทำงานเฉพาะทาง เพื่ออำนวยความสะดวกในการใช้โค้ดซ้ำและเพิ่มความเป็นระเบียบเรียบร้อย",
    icon: "⚙️",
    subtopics: [
      {
        id: "3.1",
        title: "การนิยามและการเรียกใช้ฟังก์ชัน (Defining & Calling Functions)",
        contentHtml: `
          <h3>ฟังก์ชัน (Function) คืออะไร?</h3>
          <p>เมื่อโปรแกรมคอมพิวเตอร์เริ่มมีขนาดใหญ่ขึ้น การเขียนโค้ดเรียงลงมาตามลำดับจะทำให้โค้ดอ่านยากและซ้ำซ้อน <strong>ฟังก์ชัน (Function)</strong> เข้ามาแก้ปัญหานี้โดยเปรียบเสมือน <em>"เครื่องจักรย่อยในโรงงาน"</em> ที่มีขั้นตอนการทำงานในตัวที่ชัดเจน เมื่อเราส่งวัตถุดิบ (Input) เข้าไปในเครื่องจักร มันจะนำไปประมวลผลแล้วส่งออกผลงานสำเร็จรูป (Output) ออกมาให้เรานำไปใช้งานต่อ</p>
          
          <div class="note-box info">
            <strong>ประโยชน์ของการใช้ฟังก์ชัน:</strong>
            <ul>
              <li><strong>ลดความซ้ำซ้อน (Don't Repeat Yourself - DRY):</strong> เขียนโค้ดเพียงครั้งเดียว และสามารถเรียกใช้ใหม่กี่ครั้งก็ได้</li>
              <li><strong>การเขียนโปรแกรมแบบแยกส่วน (Modularity):</strong> จัดการแก้ไขโค้ดได้ง่ายทีละส่วนโดยไม่กระทบภาพรวมทั้งหมด</li>
              <li><strong>ความเข้าใจง่าย (Readability):</strong> ช่วยให้ลำดับการไหลของโปรแกรมหลักดูสะอาดและทำความเข้าใจได้รวดเร็ว</li>
            </ul>
          </div>

          <h3>โครงสร้างและคำสั่งในฟังก์ชัน</h3>
          <p>ในภาษา Python เราประกาศฟังก์ชันด้วยคำสั่ง <code>def</code> (ย่อมาจาก Define) ตามด้วยชื่อฟังก์ชันและวงเล็บ <code>( )</code> ซึ่งอาจมีพารามิเตอร์อยู่ภายใน:</p>
          <pre><code class="python">def ชื่อฟังก์ชัน():
    # บล็อกคำสั่งการทำงานภายในฟังก์ชัน (ต้องมีย่อหน้าเข้าไป)
    print("สวัสดีจากฟังก์ชันย่อย")

# การเรียกใช้งานฟังก์ชัน (Function Call)
ชื่อฟังก์ชัน()</code></pre>
        `,
        interactiveCode: {
          code: `# สร้างฟังก์ชันแสดงคำทักทายง่ายๆ
def greet_student():
    print("==========================")
    print("ยินดีต้อนรับสู่บทเรียนฟังก์ชัน!")
    print("==========================")

# การเรียกใช้งาน
greet_student()
greet_student()  # เรียกใช้งานซ้ำครั้งที่สอง
`,
          expectedOutput: "==========================\nยินดีต้อนรับสู่บทเรียนฟังก์ชัน!\n==========================\n==========================\nยินดีต้อนรับสู่บทเรียนฟังก์ชัน!\n==========================\n"
        }
      },
      {
        id: "3.2",
        title: "พารามิเตอร์ อาร์กิวเมนต์ และการคืนค่า (Parameters, Arguments & Return Values)",
        contentHtml: `
          <h3>พารามิเตอร์ VS อาร์กิวเมนต์</h3>
          <p>แม้ว่าทั้งสองคำนี้จะมีความคล้ายคลึงกัน แต่ก็มีความแตกต่างกันเล็กน้อยในการนำมาใช้งาน:</p>
          <ul>
            <li><strong>พารามิเตอร์ (Parameter):</strong> คือตัวแปรที่เราประกาศไว้ในวงเล็บของฟังก์ชันเปรียบเสมือน 'ตัวรับช่องเก็บข้อมูล' (ตอนนิยามฟังก์ชัน)</li>
            <li><strong>อาร์กิวเมนต์ (Argument):</strong> คือข้อมูลค่าจริงที่เราใส่ส่งเข้าไปในฟังก์ชันตอนที่เรียกใช้</li>
          </ul>
          
          <pre><code class="python">def greet_user(name): # name คือ Parameter
    print("สวัสดีคุณ", name)

greet_user("นัชชา") # "นัชชา" คือ Argument ที่ส่งเข้าไป</code></pre>

          <h3>ค่าพารามิเตอร์เริ่มต้น (Default Parameters)</h3>
          <p>เราสามารถตั้งค่าเริ่มต้นให้พารามิเตอร์บางตัวได้ เพื่อที่ว่าเวลาอาร์กิวเมนต์ไม่ถูกส่งเข้ามา ฟังก์ชันจะยังคงดึงค่าเริ่มต้นนั้นไปประมวลผลต่อได้</p>
          <pre><code class="python">def welcome(name, country="ประเทศไทย"):
    print("ยินดีต้อนรับคุณ", name, "จาก", country)

welcome("วิชัย")                       # ได้ผลลัพธ์จากค่าเริ่มต้น: ยินดีต้อนรับคุณ วิชัย จาก ประเทศไทย
welcome("David", "สหรัฐอเมริกา")      # ได้ผลลัพธ์จากค่าใหม่: ยินดีต้อนรับคุณ David จาก สหรัฐอเมริกา</code></pre>

          <h3>การคืนค่าข้อมูลด้วยคำสั่ง Return</h3>
          <p>หากเราต้องการให้ฟังก์ชันส่งผลลัพธ์คำนวณย้อนกลับมาที่โปรแกรมหลักเพื่อเก็บค่าลงตัวแปรหรือนำไปคิดคำนวณต่อ เราต้องใช้คำสั่ง <code>return</code></p>
          <div class="note-box warning">
            <strong>ความแตกต่างระหว่าง print() และ return:</strong>
            <ul>
              <li><code>print()</code> เป็นเพียงคำสั่งแสดงผลตัวอักษรขึ้นหน้าจอภาพเท่านั้น แต่ตัวโปรแกรมหลักไม่สามารถนำค่าตัวหน้านั้นไปใช้คำนวณอะไรต่อได้</li>
              <li><code>return</code> ส่งค่าข้อมูลลอยกลับมาในระบบเพื่อป้อนให้กับคำสั่งถัดไป และการเรียกใช้ <code>return</code> จะเป็นการจบบทบาทและออกจากฟังก์ชันนั้นในทันที</li>
            </ul>
          </div>
        `,
        interactiveCode: {
          code: `# ตัวอย่างฟังก์ชันหาค่าพื้นที่สามเหลี่ยม
def calculate_triangle_area(base, height):
    area = 0.5 * base * height
    return area # ส่งค่าคำนวณกลับไป

# เรียกใช้และรับค่าเก็บลงตัวแปร
result_area = calculate_triangle_area(10, 5)
print("พื้นที่สามเหลี่ยมฐาน 10 สูง 5 คือ:", result_area)

# ตัวอย่างฟังก์ชันที่มีค่าเริ่มต้น
def power_of_num(base, exponent=2):
    return base ** exponent

print("4 ยกกำลังค่าเริ่มต้น (2) =", power_of_num(4))
print("2 ยกกำลัง 5 =", power_of_num(2, 5))
`,
          expectedOutput: "พื้นที่สามเหลี่ยมฐาน 10 สูง 5 คือ: 25.0\n4 ยกกำลังค่าเริ่มต้น (2) = 16\n2 ยกกำลัง 5 = 32\n"
        }
      }
    ],
    quizzes: [
      {
        level: "remembering",
        levelTh: "ระดับความจำ (Remembering)",
        question: "ภาษา Python ใช้คำสำคัญ (Keyword) ใดในการเริ่มต้นประกาศเพื่อนิยามฟังก์ชันย่อยขึ้นมาใช้งาน?",
        options: [
          "function",
          "define",
          "def",
          "func"
        ],
        answerIndex: 2,
        explanation: "ใน Python การเริ่มต้นสร้างฟังก์ชันทำได้ด้วยการใช้คำสำคัญ `def` ตามด้วยชื่อฟังก์ชันและวงเล็บ ส่วนภาษา JavaScript จะใช้ `function` ในการประกาศนิยาม"
      },
      {
        level: "understanding",
        levelTh: "ระดับความเข้าใจ (Understanding)",
        question: "ข้อใดอธิบายพฤติกรรมการทำงานของคำสั่ง return ภายในตัวบล็อกคำสั่งของฟังก์ชันได้ชัดเจนและถูกต้องที่สุด?",
        options: [
          "แสดงข้อความและผลลัพธ์ที่ต้องการออกสู่จอแสดงผลของคอมพิวเตอร์",
          "ส่งผลลัพธ์กลับไปยังตำแหน่งที่เรียกใช้งานฟังก์ชันนั้น และสิ้นสุดการทำงานภายในฟังก์ชันทันที",
          "เก็บค่าตัวแปรไว้ใช้ชั่วคราวในฟังก์ชันถัดไป โดยไม่สิ้นสุดการทำงานปัจจุบัน",
          "รีสตาร์ทลูปทั้งหมดภายในฟังก์ชันให้เริ่มต้นทำงานรอบใหม่อีกครั้ง"
        ],
        answerIndex: 1,
        explanation: "คำสั่ง `return` มีหน้าที่ในการคืนข้อมูลคำนวณกลับไปยังตัวจุดเรียกใช้งานของโปรแกรมหลัก และเมื่อโปรแกรมประมวลผลมาเจอคำสั่ง `return` แล้วจะกระโดดออกจากฟังก์ชันทันทีโดยไม่ไปทำงานต่อในบรรทัดย่อยด้านล่าง"
      },
      {
        level: "applying",
        levelTh: "ระดับการประยุกต์ใช้ (Applying)",
        question: "หากต้องการสร้างฟังก์ชันคำนวณหาปริมาตรกล่อง โดยมีการรับข้อมูล กว้าง (width), ยาว (length), สูง (height) โดยที่ตัวแปร 'สูง' มีค่าเริ่มต้นเท่ากับ 1.0 เสมอ การเขียนข้อใดทำได้ถูกต้อง?",
        options: [
          "def get_volume(height=1.0, width, length):",
          "def get_volume(width, length, height=1.0):",
          "def get_volume(width, length, default height = 1.0):",
          "def get_volume(width=1.0, length=1.0, height):"
        ],
        answerIndex: 1,
        explanation: "ในกฎการประกาศพารามิเตอร์เริ่มต้นของภาษา Python:\n- พารามิเตอร์ที่มีค่าเริ่มต้น (Default Parameters) จะต้องอยู่ในตำแหน่ง *ท้ายสุด* ถัดจากพารามิเตอร์ทั่วไปเสมอ ห้ามประกาศนำหน้าพารามิเตอร์ปกติ\n- ดังนั้น `def get_volume(width, length, height=1.0):` จึงเป็นรูปแบบไวยากรณ์ที่ถูกต้องที่สุด"
      },
      {
        level: "analyzing",
        levelTh: "ระดับการวิเคราะห์ (Analyzing)",
        question: "พิจารณาชุดคำสั่งต่อไปนี้:\n\nx = 10\ndef modify_number():\n    x = 20\n    return x\n\nmodify_number()\nprint(x)\n\nโปรแกรมจะพิมพ์แสดงตัวเลขใดออกทางหน้าจอภาพ?",
        options: [
          "10",
          "20",
          "Error เนื่องจากซ้ำซ้อนกับตัวแปรภายนอก",
          "None"
        ],
        answerIndex: 0,
        explanation: "เรื่องขอบเขตตัวแปร (Variable Scope):\n- ตัวแปร `x = 10` ตัวแรกเป็นตัวแปรแบบ Global Scope (ขอบเขตนอกสุด)\n- ส่วนตัวแปร `x = 20` ภายในฟังก์ชัน `modify_number()` ถือเป็นตัวแปรแบบ Local Scope (ขอบเขตเฉพาะในตัวฟังก์ชัน) ซึ่งมีขอบเขตการทำงานจำกัดเฉพาะในตัวมันเองเท่านั้น\n- การเขียนสั่งรันฟังก์ชัน `modify_number()` ไม่ได้มีการรับค่าหรือเก็บค่าอัปเดตคืนใดๆ ไปเขียนทับตัวแปร Global\n- ดังนั้นค่า `x` ตัวนอกสุดจึงยังคงมีค่าเป็น 10 เช่นเดิมเมื่อถูกพิมพ์ผ่าน `print(x)`"
      },
      {
        level: "evaluating",
        levelTh: "ระดับการประเมินค่า (Evaluating)",
        question: "พิจารณาโค้ดสองรูปแบบที่มีการส่งข้อความผลลัพธ์กลับ:\n\nแบบที่ A:\ndef show_double(num):\n    print(num * 2)\n\nแบบที่ B:\ndef get_double(num):\n    return num * 2\n\nหากต้องการนำผลคูณที่ได้สองเท่าไปคำนวณบวกสะสมรวมกับการคำนวณอื่นต่อในโปรแกรมหลัก การใช้งานแบบใดมีประสิทธิภาพและถูกต้องที่สุด?",
        options: [
          "ใช้งานแบบใดก็ได้ให้ผลเหมือนกันไม่มีข้อแตกต่าง",
          "แบบที่ A เหมาะสมกว่า เนื่องจากสั่งพิมพ์ภาพผลลัพธ์ขึ้นหน้าระบบทันทีด้วยความเร็วสูง",
          "แบบที่ B เหมาะสมกว่า เนื่องจากมีการคืนค่ากลับมาในระบบ จึงสามารถนำไปคำนวณต่อได้ เช่น dynamic_val = get_double(5) + 10",
          "ไม่ถูกต้องทั้งสองแบบเนื่องจากการคูณด้วย 2 ควรเขียนแยกภายนอกฟังก์ชันโดยตรง"
        ],
        answerIndex: 2,
        explanation: "เหตุผลและเปรียบเทียบ:\n- แบบที่ A ทำเพียงแสดงข้อความผลลัพธ์ลงหน้าจอ แต่ไม่คืนข้อมูลใดๆ ออกมาเลย (ตัวแปรที่ไปรับผลรันจะได้ค่าเป็น `None` ซึ่งหากนำไปบวกเพิ่มจะนำไปสู่ TypeError แครชทันที)\n- แบบที่ B ทำการคืนค่าจำนวนจริงออกมาทางระบบ ทำให้เราดึงค่านั้นไปจัดเก็บลงตัวแปรหรือคำนวณคณิตศาสตร์บวกลบคูณหารร่วมกับนิพจน์อื่นต่อได้ทันที\nดังนั้นข้อ B จึงตอบโจทย์ความต้องการใช้งานมากที่สุด"
      },
      {
        level: "creating",
        levelTh: "ระดับการสร้างสรรค์ (Creating)",
        question: "จงเลือกรูปแบบการเรียกใช้ฟังก์ชันคำนวณผลการเรียนเฉลี่ยในระบบที่สั้น กระชับ และถูกต้องตามโครงสร้างการคืนผลลัพธ์:\n\ndef make_gpa(total_score, max_score=100):\n    return (total_score / max_score) * 4",
        options: [
          "gpa = make_gpa(80, 100)",
          "gpa = make_gpa(80)",
          "gpa = make_gpa()",
          "ทางเลือกที่ 1 และ 2 ถูกต้องทั้งคู่"
        ],
        answerIndex: 3,
        explanation: "เนื่องจากฟังก์ชัน `make_gpa` มีพารามิเตอร์สองตัวคือ `total_score` (ไม่มีค่าเริ่มต้น จำเป็นต้องป้อนอาร์กิวเมนต์) และ `max_score` (มีค่าเริ่มต้น 100)\n- หากเขียน `make_gpa(80, 100)` จะได้คำนวณ 80/100 * 4 (ป้อนครบ)\n- หากเขียน `make_gpa(80)` โปรแกรมจะดึงค่าเริ่มต้นของ `max_score` มาใช้ ซึ่งก็คือ 100 จึงให้ผลคำนวณที่เท่ากัน\nดังนั้นทั้งวิธีที่ 1 และ 2 จึงทำงานได้ถูกต้องทั้งสองรูปแบบ"
      }
    ]
  },
  {
    id: 4,
    title: "4. การจัดการไฟล์และการทำงานระดับสูง (Files & Exceptions)",
    description: "เรียนรู้วิธีการเชื่อมต่อข้อมูลกับไฟล์ภายนอกระบบ และการรับมือจัดการข้อผิดพลาดขณะโปรแกรมรันไม่ให้หยุดทำงานกลางคัน",
    icon: "📂",
    subtopics: [
      {
        id: "4.1",
        title: "การจัดการไฟล์ (File Handling: open, read, write)",
        contentHtml: `
          <h3>ทำไมต้องใช้งานการจัดการไฟล์ภายนอก?</h3>
          <p>โดยปกติ ข้อมูลที่จัดเก็บในตัวแปรต่างๆ จะเก็บไว้ในหน่วยความจำสำรองชั่วคราว (RAM) ซึ่งเมื่อเรากดปิดเครื่องหรือโปรแกรมหยุดรัน ข้อมูลนั้นก็จะเลือนหายไปทั้งหมด หากต้องการให้ข้อมูลอยู่คงทนถาวร เราจำเป็นต้องเก็บบันทึกลงในฮาร์ดดิสก์ในรูปของ <strong>ไฟล์ (Files)</strong></p>
          
          <h3>การเปิดไฟล์ด้วยฟังก์ชัน <code>open()</code></h3>
          <p>รูปแบบทั่วไปของการใช้งานคือ <code>file_obj = open("ชื่อไฟล์.txt", "โหมดการทำงาน")</code></p>
          
          <table class="styled-table">
            <thead>
              <tr>
                <th>โหมด (Mode)</th>
                <th>ความหมาย</th>
                <th>พฤติกรรมการทำงาน</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>"r"</code> (Read)</td>
                <td>อ่านไฟล์อย่างเดียว</td>
                <td>หากไม่พบไฟล์ในเครื่อง จะแจ้ง Error ทันที</td>
              </tr>
              <tr>
                <td><code>"w"</code> (Write)</td>
                <td>เขียนไฟล์ใหม่ทับไฟล์เดิม</td>
                <td>สร้างไฟล์ใหม่ทันทีหากยังไม่มี หรือล้างข้อมูลเก่าทิ้งทั้งหมดแล้วเขียนใหม่ทับ</td>
              </tr>
              <tr>
                <td><code>"a"</code> (Append)</td>
                <td>เขียนต่อท้ายไฟล์เดิม</td>
                <td>สร้างไฟล์ใหม่หากไม่พบ หรือบันทึกเขียนต่อจากบรรทัดข้อมูลสุดท้ายที่มีอยู่เดิม</td>
              </tr>
            </tbody>
          </table>

          <h3>ความปลอดภัยและการใช้ Context Manager (with)</h3>
          <p>โดยทั่วไปหลังใช้งานเสร็จเราต้องเรียกใช้ <code>file_obj.close()</code> เสมอเพื่อคืนทรัพยากรให้ระบบปฏิบัติการ แต่เพื่อป้องกันความผิดพลาดกรณีลืมสั่งปิดหรือโปรแกรมเจอบั๊กค้างจนไฟล์พัง Python ได้จัดเตรียมคำสั่งแบบ <strong>Context Manager (with statement)</strong> ซึ่งจะรับผิดชอบ <strong>ปิดไฟล์ให้โดยอัตโนมัติ</strong> ทันทีที่ทำงานเสร็จสิ้นในบล็อกคำสั่งย่อย:</p>
          <pre><code class="python"># วิธีการที่แนะนำและปลอดภัยที่สุด
with open("test.txt", "w", encoding="utf-8") as f:
    f.write("สวัสดีปีใหม่ 2026\\n")
    f.write("การเขียนโปรแกรมเป็นเรื่องสนุก!")</code></pre>
        `,
        interactiveCode: {
          code: `# จำลองระบบการจัดการไฟล์ (มีระบบจำลอง File System ในตัวแปรเบื้องหลัง)
# เขียนข้อมูลลงไฟล์
with open("student.txt", "w") as my_file:
    my_file.write("Name: Natcha\\nGrade: A")
    print("เขียนไฟล์ student.txt สำเร็จแล้ว!")

# อ่านข้อมูลกลับมา
with open("student.txt", "r") as reader:
    content = reader.read()
    print("\\n--- อ่านข้อความจากไฟล์ student.txt ---")
    print(content)
`,
          expectedOutput: "เขียนไฟล์ student.txt สำเร็จแล้ว!\n\n--- อ่านข้อความจากไฟล์ student.txt ---\nName: Natcha\nGrade: A\n"
        }
      },
      {
        id: "4.2",
        title: "การจัดการข้อผิดพลาด (Exception Handling: try, except)",
        contentHtml: `
          <h3>ทำไมต้องจัดการกับข้อผิดพลาด (Runtime Exceptions)?</h3>
          <p>ในบางครั้ง ตัวโค้ดของเราเขียนถูกต้องตามหลักไวยากรณ์ (Syntax) ทุกประการ แต่เมื่อเริ่มประมวลผลจริงกลับพบสถานการณ์ที่นำไปสู่ความล้มเหลว (Runtime Error) เช่น:</p>
          <ul>
            <li>สั่งคำนวณนำตัวเลขไปหารด้วยศูนย์ (<code>ZeroDivisionError</code>)</li>
            <li>สั่งเปิดไฟล์ที่ไม่มีอยู่จริงในฮาร์ดดิสก์ (<code>FileNotFoundError</code>)</li>
            <li>ผู้ใช้งานพิมพ์ตัวอักษรใส่ช่องป้อนข้อมูลที่ระบบต้องการนำไปคำนวณคณิตศาสตร์ (<code>ValueError</code>)</li>
          </ul>
          <p>หากเราไม่ดักจับและจัดการข้อผิดพลาดเหล่านี้ โปรแกรมจะ <strong>หยุดทำงานกลางคันในทันที (Crash)</strong> และแสดงหน้าต่างข้อความสีแดงเตือนข่มขู่ผู้ใช้ (Traceback Message)</p>

          <h3>โครงสร้างประโยคของ Try, Except, Finally</h3>
          <pre><code class="python">try:
    # โค้ดส่วนที่สุ่มเสี่ยงจะเกิดการแครช
    number = int(input("ป้อนตัวเลขจำนวนเต็ม: "))
    result = 100 / number
except ValueError:
    # โค้ดส่วนที่เตรียมรับมือกรณีผู้ใช้ไม่ป้อนตัวเลข
    print("กรุณาป้อนเฉพาะตัวเลขเท่านั้น!")
except ZeroDivisionError:
    # โค้ดเตรียมรับมือกรณีหารด้วยศูนย์
    print("ไม่สามารถคำนวณหารด้วยศูนย์ได้!")
else:
    # (มีหรือไม่ก็ได้) โค้ดที่จะทำงานหากไม่มี Error ใดๆ เกิดขึ้นเลย
    print("คำนวณสำเร็จ! ผลหารคือ:", result)
finally:
    # (มีหรือไม่ก็ได้) ทำงานเสมอไม่ว่าจะเกิด Error หรือไม่
    print("สิ้นสุดการทำธุรกรรมนี้")</code></pre>
        `,
        interactiveCode: {
          code: `# ทดสอบคำนวณหารด้วยศูนย์
numerator = 10
denominator = 0

try:
    print("กำลังเริ่มคำนวณ...")
    result = numerator / denominator
    print("ผลลัพธ์คำนวณคือ:", result)
except ZeroDivisionError:
    print("เกิดข้อผิดพลาด: ป้อนตัวหารเป็น 0 ไม่ได้นะ!")
finally:
    print("บล็อก finally ทำงานเสร็จสิ้นอย่างสมบูรณ์")
`,
          expectedOutput: "กำลังเริ่มคำนวณ...\nเกิดข้อผิดพลาด: ป้อนตัวหารเป็น 0 ไม่ได้นะ!\nบล็อก finally ทำงานเสร็จสิ้นอย่างสมบูรณ์\n"
        }
      }
    ],
    quizzes: [
      {
        level: "remembering",
        levelTh: "ระดับความจำ (Remembering)",
        question: "โหมดในการเปิดไฟล์ข้อใดต่อไปนี้ที่จะเปิดเพื่อเขียนไฟล์โดยจะล้างข้อมูลเดิมที่มีอยู่ทิ้งทั้งหมดก่อนเริ่มเขียน?",
        options: [
          "\"r\"",
          "\"w\"",
          "\"a\"",
          "\"rw\""
        ],
        answerIndex: 1,
        explanation: "โหมดในการเขียนทับข้อมูลใหม่ทั้งหมดคือ 'w' (Write) หากพบไฟล์เดิมจะลบเนื้อหาเก่าทิ้งแล้วเขียนใหม่ ส่วนโหมด 'a' (Append) จะบันทึกข้อมูลต่อท้ายโดยไม่ลบเนื้อหาเดิม"
      },
      {
        level: "understanding",
        levelTh: "ระดับความเข้าใจ (Understanding)",
        question: "การระบุคำสั่งเรียกใช้ด้วยโครงสร้าง context manager ด้วยคำว่า with open(...) as f: มีประโยชน์หลักที่เหนือกว่าการเปิดไฟล์ปกติอย่างไร?",
        options: [
          "ทำให้โปรแกรมรันโค้ดเขียนและอ่านไฟล์เร็วขึ้นกว่าเดิมสองเท่า",
          "ป้องกันการแฮกข้อมูลเนื่องจากจะเข้ารหัสเนื้อหาในไฟล์ให้ทันที",
          "รับประกันการปิดไฟล์เพื่อคืนทรัพยากรให้อย่างปลอดภัยโดยอัตโนมัติแม้จะเจอบั๊กแครชภายในบล็อกย่อย",
          "ทำหน้าที่ในการตรวจสอบความถูกต้องของไวยากรณ์โค้ดในไฟล์ให้โดยอัตโนมัติ"
        ],
        answerIndex: 2,
        explanation: "คำสั่ง `with` (Context Manager) ในภาษา Python เข้ามาช่วยอำนวยความสะดวกในเรื่องการบริหารจัดการทรัพยากร โดยมีจุดเด่นคือจะช่วยเรียกคำสั่ง `.close()` ปิดไฟล์ให้อย่างปลอดภัยแน่นอนเมื่อจบการรันในย่อหน้าบล็อกของมัน แม้โค้ดบรรทัดก่อนหน้าจะเกิดข้อผิดพลาดก็ตาม"
      },
      {
        level: "applying",
        levelTh: "ระดับการประยุกต์ใช้ (Applying)",
        question: "จงเลือกรูปแบบการเขียนดักจับข้อผิดพลาด (Exception Handling) เพื่อกรองข้อมูลกรณีผู้ป้อนข้อมูลตัวเลขพิมพ์ค่าที่ไม่ใช่จำนวนเต็มมาในโปรแกรม:",
        options: [
          "try:\n    age = int(input())\nexcept ValueError:\n    print('กรุณาป้อนตัวเลข')",
          "try:\n    age = int(input())\nexcept TypeError:\n    print('กรุณาป้อนตัวเลข')",
          "if age != int:\n    print('กรุณาป้อนตัวเลข')",
          "try:\n    age = int(input())\nexcept ZeroDivisionError:\n    print('กรุณาป้อนตัวเลข')"
        ],
        answerIndex: 0,
        explanation: "เมื่อฟังก์ชัน `int()` ได้รับข้อมูลจากสตริงที่ไม่ใช่รูปแบบของตัวเลข เช่น สตริงตัวอักษร 'hello' มันจะไม่สามารถแปลงข้อมูลประเภทนี้ได้ ส่งผลให้ภาษา Python สั่งโยนข้อผิดพลาดประเภท `ValueError` ขึ้นมา \nดังนั้นการเขียนดักจับดึงเอา `ValueError` มาทำงานจึงตอบโจทย์ในการกรองกรณีป้อนตัวเลขผิดพลาดได้ถูกต้องที่สุด"
      },
      {
        level: "analyzing",
        levelTh: "ระดับการวิเคราะห์ (Analyzing)",
        question: "พิจารณาโค้ดการคำนวณด้านล่างนี้:\n\ntry:\n    values = [10, 20, 0]\n    res = values[1] / values[2]\n    print('ผลการหารสำเร็จ')\nexcept ZeroDivisionError:\n    print('ห้ามหารด้วยศูนย์')\nexcept IndexError:\n    print('ชี้ตำแหน่งดัชนีเกินขอบเขต')\n\nโปรแกรมประมวลผลแล้วจะได้ข้อความแสดงผลอย่างไร?",
        options: [
          "ผลการหารสำเร็จ",
          "ห้ามหารด้วยศูนย์",
          "ชี้ตำแหน่งดัชนีเกินขอบเขต",
          "โปรแกรมหยุดทำงานกะทันหันเนื่องจากมี Syntax Error ใน Except"
        ],
        answerIndex: 1,
        explanation: "วิเคราะห์ขั้นตอนการประมวลผลโค้ด:\n- รายการข้อมูลในลิสต์ `values` เก็บค่าดังนี้: index 0 = 10, index 1 = 20, index 2 = 0\n- คำสั่ง `values[1] / values[2]` จะเทียบเท่ากับการคำนวณหารเลข `20 / 0` ซึ่งเป็นการหารด้วยศูนย์\n- การหารด้วยศูนย์จะทำให้เกิดเหตุการณ์ `ZeroDivisionError` ขึ้น\n- โปรแกรมจะกระโดดมาทำงานในบล็อก `except ZeroDivisionError:` ทันที ทำให้พิมพ์ข้อความ 'ห้ามหารด้วยศูนย์' ออกมา (บล็อก IndexError และบรรทัดพิมพ์แสดงความสำเร็จจะถูกข้ามทั้งหมด)"
      },
      {
        level: "evaluating",
        levelTh: "ระดับการประเมินค่า (Evaluating)",
        question: "หากต้องการบันทึกข้อมูลประวัติผู้ใช้ลงไฟล์ 'data.txt' โดยที่โปรแกรมระบบจะต้องรักษาความครบถ้วนสมบูรณ์ของประวัติเก่าและเขียนอัปเดตบรรทัดใหม่ไปเพิ่มเสมอ ควรเลือกโหมดคำสั่งการเปิดไฟล์อย่างไร?",
        options: [
          "open('data.txt', 'r')",
          "open('data.txt', 'w')",
          "open('data.txt', 'a')",
          "open('data.txt', 'x')"
        ],
        answerIndex: 2,
        explanation: "วิเคราะห์ความต่างของโหมด:\n- โหมด `'r'` มีไว้เปิดอ่านข้อมูลอย่างเดียว เขียนไฟล์เพิ่มไม่ได้\n- โหมด `'w'` จะลบเนื้อหาเก่าทิ้งหมด จึงขัดแย้งกับกติกาเรื่องการเก็บรักษาระเบียนเก่า\n- โหมด `'a'` (Append) คือการเขียนต่อท้ายไฟล์ ซึ่งจะช่วยนำประวัติใหม่ไปเขียนเพิ่มใต้บรรทัดสุดท้าย โดยมีคุณสมบัติเก็บรักษาของเดิมไว้อย่างครบถ้วน\nดังนั้นข้อ 3 จึงเป็นตัวเลือกที่ถูกต้อง"
      },
      {
        level: "creating",
        levelTh: "ระดับการสร้างสรรค์ (Creating)",
        question: "พิจารณาโครงสร้างโค้ดดักจับข้อผิดพลาด:\n\ntry:\n    ans = 100 / input_num\nexcept:\n    ans = 0\nfinally:\n    print('การคำนวณเสร็จสิ้น')\n\nคำอธิบายการทำงานในข้อใดประเมินพฤติกรรมการพิมพ์ของ finally ได้สมบูรณ์และถูกต้องที่สุด?",
        options: [
          "ข้อความ 'การคำนวณเสร็จสิ้น' จะพิมพ์ออกมาก็ต่อเมื่อเกิด Error เท่านั้น",
          "ข้อความ 'การคำนวณเสร็จสิ้น' จะพิมพ์ออกมาก็ต่อเมื่อรันโปรแกรมสำเร็จโดยไม่เกิด Error เท่านั้น",
          "ข้อความ 'การคำนวณเสร็จสิ้น' จะพิมพ์ออกมาแสดงผลในทุกกรณีเสมอ ไม่ว่าจะคำนวณสำเร็จหรือเกิดข้อผิดพลาดใดๆ ก็ตาม",
          "คำสั่งนี้จะไม่พิมพ์ข้อความใดเลยเนื่องจาก Syntax ในส่วน Finally ผิดพลาด"
        ],
        answerIndex: 2,
        explanation: "บล็อก `finally` เป็นส่วนหนึ่งของโครงสร้าง Try-Except ที่จะทำงานเสมอในตอนท้ายหลังจากดำเนินการในส่วน Try หรือ Except เสร็จเรียบร้อยแล้ว ไม่ว่าโปรแกรมจะผ่านไปได้ด้วยดี หรือเกิดการแครชดักจับล้มเหลว บล็อก `finally` ก็ยังคงทำงานปิดท้ายเสมอเพื่อเคลียร์สถานะระบบหรือแจ้งเตือนความคืบหน้า ดังนั้นตัวเลือกที่ 3 จึงอธิบายบทบาทได้ตรงที่สุด"
      }
    ]
  }
];
