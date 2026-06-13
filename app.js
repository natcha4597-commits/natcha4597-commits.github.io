// Main Application Controller for the Python Programming Learning Website
document.addEventListener("DOMContentLoaded", () => {
  // --- APPLICATION STATE ---
  const state = {
    currentView: "dashboard", // "dashboard", "lesson", "quiz", "quiz-summary"
    activeChapterId: null,
    activeSubtopicId: null,
    currentQuestionIndex: 0,
    quizAnswers: [], // track answers for active quiz: { questionIndex, selectedIndex, isCorrect }
    
    // User progress saved to localStorage
    progress: {
      completedSubtopics: [], // Array of subtopic IDs, e.g., ["1.1", "1.2"]
      completedQuizzes: {},   // Chapter ID -> Best Score (out of total) e.g., { "1": 5 }
    },
    
    theme: "light"
  };

  // --- HTML ELEMENTS CACHE ---
  const el = {
    sidebar: document.getElementById("sidebar"),
    sidebarMenu: document.getElementById("sidebar-menu"),
    mainContent: document.getElementById("main-content"),
    progressBarFill: document.getElementById("progress-bar-fill"),
    progressPercent: document.getElementById("progress-percent"),
    themeToggleBtn: document.getElementById("theme-toggle-btn"),
    themeIcon: document.getElementById("theme-icon"),
    mobileMenuToggle: document.getElementById("mobile-menu-toggle")
  };

  // --- INITIALIZATION ---
  function init() {
    loadProgressFromStorage();
    initTheme();
    renderSidebar();
    updateOverallProgressBar();
    
    // Bind global events
    el.themeToggleBtn.addEventListener("click", toggleTheme);
    el.mobileMenuToggle.addEventListener("click", toggleMobileSidebar);
    
    // Handle hash routing
    window.addEventListener("hashchange", handleRouting);
    handleRouting(); // Initial routing
  }

  // --- THEME MANAGEMENT ---
  function initTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }

  function setTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    
    if (theme === "dark") {
      el.themeIcon.innerHTML = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>`;
    } else {
      el.themeIcon.innerHTML = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`;
    }
  }

  function toggleTheme() {
    const nextTheme = state.theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  }

  function toggleMobileSidebar() {
    el.sidebar.classList.toggle("open");
  }

  function closeMobileSidebar() {
    el.sidebar.classList.remove("open");
  }

  // Close sidebar on clicking outside (for mobile)
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      if (!el.sidebar.contains(e.target) && !el.mobileMenuToggle.contains(e.target)) {
        closeMobileSidebar();
      }
    }
  });

  // --- PROGRESS PERSISTENCE ---
  function loadProgressFromStorage() {
    const saved = localStorage.getItem("prog_learning_progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.completedSubtopics) state.progress.completedSubtopics = parsed.completedSubtopics;
        if (parsed.completedQuizzes) state.progress.completedQuizzes = parsed.completedQuizzes;
      } catch (e) {
        console.error("Error loading progress", e);
      }
    }
  }

  function saveProgressToStorage() {
    localStorage.setItem("prog_learning_progress", JSON.stringify(state.progress));
    updateOverallProgressBar();
    renderSidebar();
  }

  function updateOverallProgressBar() {
    // Count total subtopics in curriculum
    let totalSubtopicsCount = 0;
    window.COURSE_DATA.forEach(chap => {
      totalSubtopicsCount += chap.subtopics.length;
    });

    const completedCount = state.progress.completedSubtopics.length;
    const percentage = totalSubtopicsCount > 0 ? Math.round((completedCount / totalSubtopicsCount) * 100) : 0;
    
    el.progressBarFill.style.width = `${percentage}%`;
    el.progressPercent.innerText = `${percentage}%`;
  }

  // --- ROUTING HANDLER ---
  function handleRouting() {
    closeMobileSidebar();
    const hash = window.location.hash || "#dashboard";
    
    if (hash === "#dashboard") {
      state.currentView = "dashboard";
      state.activeChapterId = null;
      state.activeSubtopicId = null;
      renderDashboard();
    } else {
      // Parse patterns:
      // #chapter-[id]-subtopic-[sub_id] (e.g. #chapter-1-subtopic-1.1)
      // #chapter-[id]-quiz (e.g. #chapter-1-quiz)
      const subtopicMatch = hash.match(/^#chapter-(\d+)-subtopic-([\d.]+)/);
      const quizMatch = hash.match(/^#chapter-(\d+)-quiz/);
      
      if (subtopicMatch) {
        state.currentView = "lesson";
        state.activeChapterId = parseInt(subtopicMatch[1], 10);
        state.activeSubtopicId = subtopicMatch[2];
        renderLesson();
      } else if (quizMatch) {
        state.currentView = "quiz";
        state.activeChapterId = parseInt(quizMatch[1], 10);
        state.activeSubtopicId = null;
        state.currentQuestionIndex = 0;
        state.quizAnswers = [];
        renderQuiz();
      } else {
        // Fallback
        window.location.hash = "#dashboard";
      }
    }
    
    updateActiveSidebarMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // --- SIDEBAR RENDERING ---
  function renderSidebar() {
    let menuHtml = "";

    window.COURSE_DATA.forEach(chapter => {
      // Check if all subtopics are completed
      const totalSubtopics = chapter.subtopics.length;
      const completedSubtopicsCount = chapter.subtopics.filter(s => 
        state.progress.completedSubtopics.includes(s.id)
      ).length;
      const isChapterCompleted = (completedSubtopicsCount === totalSubtopics) && 
                                  (state.progress.completedQuizzes[chapter.id] !== undefined);

      menuHtml += `
        <div class="menu-chapter-group">
          <button class="menu-chapter-btn ${isChapterCompleted ? 'completed' : ''}" 
                  id="menu-chap-btn-${chapter.id}" 
                  data-chapter-id="${chapter.id}">
            <span>${chapter.icon}</span>
            <span style="flex:1; margin-left: 10px;">บทที่ ${chapter.id}</span>
            <span class="badge">${completedSubtopicsCount}/${totalSubtopics}</span>
          </button>
          
          <div class="subtopics-list" id="subtopics-list-${chapter.id}">
      `;

      chapter.subtopics.forEach(sub => {
        const isSubCompleted = state.progress.completedSubtopics.includes(sub.id);
        menuHtml += `
          <button class="subtopic-item-btn ${isSubCompleted ? 'completed' : ''}" 
                  id="menu-sub-btn-${sub.id.replace('.', '_')}"
                  data-hash="#chapter-${chapter.id}-subtopic-${sub.id}">
            <span class="status-dot"></span>
            <span style="flex: 1;">${sub.id} ${sub.title}</span>
          </button>
        `;
      });

      // Add Quiz link in the subtopic list
      const quizScore = state.progress.completedQuizzes[chapter.id];
      const isQuizDone = quizScore !== undefined;
      const quizText = isQuizDone ? `แบบทดสอบ (ผ่าน: ${quizScore}/6)` : "แบบทดสอบท้ายบท";
      menuHtml += `
            <button class="subtopic-item-btn ${isQuizDone ? 'completed' : ''}" 
                    id="menu-quiz-btn-${chapter.id}"
                    data-hash="#chapter-${chapter.id}-quiz"
                    style="border-top: 1px dashed var(--border-color); margin-top: 4px; padding-top: 10px;">
              <span class="status-dot"></span>
              <span style="font-weight: 500; color: var(--primary-pink);">${quizText}</span>
            </button>
          </div>
        </div>
      `;
    });

    el.sidebarMenu.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div>
          <button class="menu-chapter-btn" id="menu-home-btn" data-hash="#dashboard">
            <span>🏠</span>
            <span style="margin-left: 10px;">หน้าหลัก / แดชบอร์ด</span>
          </button>
        </div>
        
        <div>
          <h4 class="menu-section-title">เนื้อหาการเรียนรู้</h4>
          ${menuHtml}
        </div>
      </div>
    `;

    // Bind sidebar buttons
    el.sidebarMenu.querySelectorAll("[data-hash]").forEach(btn => {
      btn.addEventListener("click", () => {
        window.location.hash = btn.getAttribute("data-hash");
      });
    });

    // Expand/Collapse chapters clicking
    el.sidebarMenu.querySelectorAll(".menu-chapter-btn[data-chapter-id]").forEach(btn => {
      btn.addEventListener("click", () => {
        const chapId = btn.getAttribute("data-chapter-id");
        toggleChapterSubtopics(chapId);
      });
    });
  }

  function toggleChapterSubtopics(chapId) {
    const list = document.getElementById(`subtopics-list-${chapId}`);
    if (list) {
      const isOpened = list.classList.contains("open");
      // Close all others first
      document.querySelectorAll(".subtopics-list").forEach(el => el.classList.remove("open"));
      
      if (!isOpened) {
        list.classList.add("open");
      }
    }
  }

  function updateActiveSidebarMenu() {
    // Reset all actives
    document.querySelectorAll(".menu-chapter-btn, .subtopic-item-btn").forEach(btn => {
      btn.classList.remove("active");
    });

    if (state.currentView === "dashboard") {
      const homeBtn = document.getElementById("menu-home-btn");
      if (homeBtn) homeBtn.classList.add("active");
      document.querySelectorAll(".subtopics-list").forEach(el => el.classList.remove("open"));
    } else if (state.currentView === "lesson" && state.activeChapterId) {
      // Active chapter header
      const chapBtn = document.getElementById(`menu-chap-btn-${state.activeChapterId}`);
      if (chapBtn) chapBtn.classList.add("active");
      
      // Auto open subtopic list
      const list = document.getElementById(`subtopics-list-${state.activeChapterId}`);
      if (list) list.classList.add("open");
      
      // Active subtopic button
      const subBtn = document.getElementById(`menu-sub-btn-${state.activeSubtopicId.replace('.', '_')}`);
      if (subBtn) subBtn.classList.add("active");
    } else if (state.currentView === "quiz" && state.activeChapterId) {
      const chapBtn = document.getElementById(`menu-chap-btn-${state.activeChapterId}`);
      if (chapBtn) chapBtn.classList.add("active");
      
      const list = document.getElementById(`subtopics-list-${state.activeChapterId}`);
      if (list) list.classList.add("open");
      
      const quizBtn = document.getElementById(`menu-quiz-btn-${state.activeChapterId}`);
      if (quizBtn) quizBtn.classList.add("active");
    }
  }

  // --- DASHBOARD VIEW RENDERING ---
  function renderDashboard() {
    // Calculate total lessons and completed ones
    let totalLessonsCount = 0;
    let completedLessonsCount = 0;
    window.COURSE_DATA.forEach(c => {
      totalLessonsCount += c.subtopics.length;
      c.subtopics.forEach(s => {
        if (state.progress.completedSubtopics.includes(s.id)) completedLessonsCount++;
      });
    });

    const completionPercent = totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0;

    let chaptersHtml = "";
    window.COURSE_DATA.forEach(chap => {
      const totalSubs = chap.subtopics.length;
      const completedSubs = chap.subtopics.filter(s => 
        state.progress.completedSubtopics.includes(s.id)
      ).length;
      
      const quizScore = state.progress.completedQuizzes[chap.id];
      const isQuizDone = quizScore !== undefined;
      const isChapDone = (totalSubs === completedSubs) && isQuizDone;
      const percent = Math.round((completedSubs / totalSubs) * 100);

      chaptersHtml += `
        <div class="chapter-card ${isChapDone ? 'completed' : ''}" data-hash="#chapter-${chap.id}-subtopic-${chap.subtopics[0].id}">
          <div class="chapter-card-header">
            <div class="chapter-card-icon">${chap.icon}</div>
            <div class="chapter-card-title">${chap.title}</div>
          </div>
          <div class="chapter-card-desc">${chap.description}</div>
          
          <div style="display:flex; flex-direction:column; gap:6px; margin-top: auto;">
            <div style="display:flex; justify-content:space-between; font-size:12px;">
              <span>ความคืบหน้าการอ่านเนื้อหา</span>
              <strong>${percent}%</strong>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width: ${percent}%;"></div>
            </div>
          </div>

          <div class="chapter-card-footer">
            <span>หัวข้อเรียนรู้: ${totalSubs} หัวข้อ</span>
            <span class="status">
              ${isQuizDone ? `📝 แบบทดสอบผ่าน (${quizScore}/6)` : (isChapDone ? '✅ สำเร็จแล้ว' : '⏳ กำลังเรียนรู้')}
            </span>
          </div>
        </div>
      `;
    });

    el.mainContent.innerHTML = `
      <div class="welcome-container">
        <!-- Top Toolbar -->
        <div class="top-toolbar">
          <div class="breadcrumb">
            <span>หน้าหลัก</span>
            <span class="breadcrumb-separator">/</span>
            <span style="color: var(--primary-purple); font-weight: 500;">แดชบอร์ด</span>
          </div>
          <div></div>
        </div>

        <!-- Jumbotron -->
        <div class="jumbotron-card">
          <h1 class="jumbotron-title">
            <span style="color: var(--primary-blue)">เรียนรู้วิชา</span> การเขียนโปรแกรมคอมพิวเตอร์เบื้องต้น<br>
            <span style="background: linear-gradient(90deg, var(--primary-purple), var(--primary-pink)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">(Introduction to Computer Programming)</span>
          </h1>
          <p class="jumbotron-subtitle">
            ยินดีต้อนรับนักศึกษาปี 1 ทุกท่าน! บทเรียนนี้ถูกออกแบบมาเพื่อพัฒนาทักษะกระบวนการคิดเชิงอัลกอริทึมอย่างละเอียด มีตัวอย่างประกอบชัดเจน พร้อมทั้งแบบทดสอบวัดระดับกระบวนการคิดตามทฤษฎีบลูม (Bloom's Taxonomy) ในรูปแบบ Interactive
          </p>
          <button class="jumbotron-cta-btn" id="start-learning-btn">
            ${completedLessonsCount > 0 ? "เรียนรู้ต่อจากเดิม" : "เริ่มต้นศึกษาบทเรียน"}
          </button>
        </div>

        <!-- Chapter list -->
        <h2 style="font-size:22px; font-weight:700; border-left:4px solid var(--primary-purple); padding-left:12px;">
          โครงสร้างรายวิชาการเรียนรู้
        </h2>
        <div class="chapters-grid">
          ${chaptersHtml}
        </div>
      </div>
    `;

    // CTA Start button logic
    document.getElementById("start-learning-btn").addEventListener("click", () => {
      // Redirect to the first uncompleted subtopic, or first subtopic
      let targetSubId = "1.1";
      for (let i = 0; i < window.COURSE_DATA.length; i++) {
        const chap = window.COURSE_DATA[i];
        const uncompleted = chap.subtopics.find(s => !state.progress.completedSubtopics.includes(s.id));
        if (uncompleted) {
          targetSubId = uncompleted.id;
          break;
        }
      }
      
      const targetChap = window.COURSE_DATA.find(c => c.subtopics.some(s => s.id === targetSubId));
      window.location.hash = `#chapter-${targetChap.id}-subtopic-${targetSubId}`;
    });

    // Make cards clickable
    el.mainContent.querySelectorAll(".chapter-card").forEach(card => {
      card.addEventListener("click", () => {
        window.location.hash = card.getAttribute("data-hash");
      });
    });
  }

  // --- LESSON RENDERING & SYNTAX HIGHLIGHTING ---
  function renderLesson() {
    const chapter = window.COURSE_DATA.find(c => c.id === state.activeChapterId);
    const subtopic = chapter.subtopics.find(s => s.id === state.activeSubtopicId);
    
    // Find next / previous navigation hashes
    const navigationHashes = getLessonNavigation(state.activeChapterId, state.activeSubtopicId);

    // Build playground html if subtopic has code
    let playgroundHtml = "";
    if (subtopic.interactiveCode) {
      playgroundHtml = `
        <div class="code-playground">
          <div class="playground-header">
            <span class="playground-title">💻 พื้นที่ทดลองเขียนโค้ดภาษา Python (Interactive Editor)</span>
            <span>ทำงานเสร็จเมื่อรันโค้ดและไม่มีข้อผิดพลาด</span>
          </div>
          
          <div class="code-editor-wrapper">
            <textarea class="code-editor" id="code-editor-textarea" spellcheck="false" autocomplete="off">${subtopic.interactiveCode.code.trim()}</textarea>
          </div>

          <div class="playground-actions">
            <button class="run-btn" id="run-code-btn">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg> Run โค้ด
            </button>
            <button class="reset-btn" id="reset-code-btn">รีเซ็ตโค้ด</button>
          </div>

          <div>
            <span class="output-label">ผลลัพธ์การประมวลผล (Console Output)</span>
            <div class="code-output-container" id="code-output-block">กด Run โค้ดด้านบนเพื่อจำลองผลลัพธ์...</div>
          </div>
        </div>
      `;
    }

    el.mainContent.innerHTML = `
      <div class="content-wrapper">
        <!-- Top Toolbar -->
        <div class="top-toolbar">
          <div class="breadcrumb">
            <a href="#dashboard" style="color: inherit; text-decoration: none;">หน้าหลัก</a>
            <span class="breadcrumb-separator">/</span>
            <span>บทที่ ${chapter.id}</span>
            <span class="breadcrumb-separator">/</span>
            <span style="color: var(--primary-purple); font-weight: 500;">หัวข้อ ${subtopic.id}</span>
          </div>
          <div></div>
        </div>

        <div class="lesson-card">
          <h2>
            <span>${chapter.icon}</span>
            <span>หัวข้อที่ ${subtopic.id} : ${subtopic.title}</span>
          </h2>
          
          <div class="lesson-html-content">
            ${subtopic.contentHtml}
          </div>

          ${playgroundHtml}
        </div>

        <!-- Navigation Buttons -->
        <div class="lesson-nav-footer">
          <button class="lesson-nav-btn" id="nav-back-btn">
            ⬅️ ย้อนกลับ
          </button>
          <button class="lesson-nav-btn primary" id="nav-next-btn">
            ดำเนินการต่อ ➡️
          </button>
        </div>
      </div>
    `;

    // Highlight custom code blocks loaded in HTML content
    applySyntaxHighlighting();

    // Bind navigation buttons
    document.getElementById("nav-back-btn").addEventListener("click", () => {
      if (navigationHashes.prev) {
        window.location.hash = navigationHashes.prev;
      } else {
        window.location.hash = "#dashboard";
      }
    });

    document.getElementById("nav-next-btn").addEventListener("click", () => {
      // If this subtopic doesn't have interactive code playground,
      // we mark it completed immediately when they click next!
      if (!subtopic.interactiveCode) {
        markSubtopicCompleted(subtopic.id);
      }
      
      if (navigationHashes.next) {
        window.location.hash = navigationHashes.next;
      } else {
        window.location.hash = "#dashboard";
      }
    });

    // Bind playground events
    if (subtopic.interactiveCode) {
      const runBtn = document.getElementById("run-code-btn");
      const resetBtn = document.getElementById("reset-code-btn");
      const textarea = document.getElementById("code-editor-textarea");
      const outputBlock = document.getElementById("code-output-block");

      runBtn.addEventListener("click", () => {
        const codeText = textarea.value;
        outputBlock.classList.remove("error");
        outputBlock.innerText = "กำลังประมวลผลโค้ด...";
        
        // Reset simulation FS before running code to ensure clean environment
        window.PythonRunner.run("clearFS()");

        setTimeout(() => {
          const runResult = window.PythonRunner.run(codeText);
          
          if (runResult.success) {
            outputBlock.innerText = runResult.output || "(โปรแกรมไม่มีการแสดงผล)";
            
            // Mark subtopic as completed in progress state
            markSubtopicCompleted(subtopic.id);
          } else {
            outputBlock.classList.add("error");
            outputBlock.innerText = `⚠️ Traceback (most recent call last):\n  ${runResult.error}`;
          }
        }, 150);
      });

      resetBtn.addEventListener("click", () => {
        textarea.value = subtopic.interactiveCode.code.trim();
        outputBlock.classList.remove("error");
        outputBlock.innerText = "รีเซ็ตโค้ดเดิมเรียบร้อยแล้ว...";
      });
    }
  }

  function applySyntaxHighlighting() {
    document.querySelectorAll("pre code.python").forEach(block => {
      let codeText = block.innerHTML;
      
      // Simple custom client-side python syntax highlight parser
      // Escaping is important, but we can do a regex map
      const keywords = ["def", "class", "if", "elif", "else", "while", "for", "in", "break", "continue", "return", "try", "except", "finally", "with", "as", "import", "from", "del", "and", "or", "not"];
      const builtins = ["print", "type", "int", "float", "str", "bool", "len", "range", "open", "input", "append", "remove", "pop", "insert", "sort", "get"];
      
      // Highlight comments: match from # to end of line
      codeText = codeText.replace(/(#.*)/g, '<span class="python-comment">$1</span>');

      // Strings (enclosed in double/single quotes)
      // Make sure not to overwrite tags
      codeText = codeText.replace(/("(?:\\"|[^"])*")/g, '<span class="python-string">$1</span>');
      codeText = codeText.replace(/('(?:\\'|[^'])*')/g, '<span class="python-string">$1</span>');

      // Keywords
      keywords.forEach(kw => {
        const regex = new RegExp(`\\b${kw}\\b`, 'g');
        codeText = codeText.replace(regex, `<span class="python-keyword">${kw}</span>`);
      });

      // Built-ins
      builtins.forEach(bi => {
        const regex = new RegExp(`\\b${bi}\\b`, 'g');
        codeText = codeText.replace(regex, `<span class="python-builtin">${bi}</span>`);
      });

      // Numbers
      codeText = codeText.replace(/\b(\d+)\b/g, '<span class="python-number">$1</span>');

      block.innerHTML = codeText;
    });
  }

  function markSubtopicCompleted(subtopicId) {
    if (!state.progress.completedSubtopics.includes(subtopicId)) {
      state.progress.completedSubtopics.push(subtopicId);
      saveProgressToStorage();
    }
  }

  function getLessonNavigation(chapId, subId) {
    const chapter = window.COURSE_DATA.find(c => c.id === chapId);
    const subtopics = chapter.subtopics;
    const subIdx = subtopics.findIndex(s => s.id === subId);
    
    let prev = null;
    let next = null;

    if (subIdx > 0) {
      prev = `#chapter-${chapId}-subtopic-${subtopics[subIdx - 1].id}`;
    } else {
      // First subtopic: previous goes to dashboard or previous chapter's quiz
      if (chapId > 1) {
        prev = `#chapter-${chapId - 1}-quiz`;
      } else {
        prev = "#dashboard";
      }
    }

    if (subIdx < subtopics.length - 1) {
      next = `#chapter-${chapId}-subtopic-${subtopics[subIdx + 1].id}`;
    } else {
      // Last subtopic: next goes to this chapter's quiz
      next = `#chapter-${chapId}-quiz`;
    }

    return { prev, next };
  }

  // --- QUIZ VIEW RENDERING ---
  function renderQuiz() {
    const chapter = window.COURSE_DATA.find(c => c.id === state.activeChapterId);
    const questions = chapter.quizzes;
    const currentQ = questions[state.currentQuestionIndex];
    
    el.mainContent.innerHTML = `
      <div class="content-wrapper">
        <!-- Top Toolbar -->
        <div class="top-toolbar">
          <div class="breadcrumb">
            <a href="#dashboard" style="color: inherit; text-decoration: none;">หน้าหลัก</a>
            <span class="breadcrumb-separator">/</span>
            <span>บทที่ ${chapter.id}</span>
            <span class="breadcrumb-separator">/</span>
            <span style="color: var(--primary-pink); font-weight: 500;">แบบทดสอบประเมินผล</span>
          </div>
          <div></div>
        </div>

        <div class="quiz-section">
          <!-- Quiz progress card -->
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:14px; font-weight:500;">
            <span>คำถามข้อที่ ${state.currentQuestionIndex + 1} จากทั้งหมด ${questions.length} ข้อ</span>
            <span>ความก้าวหน้าแบบทดสอบ: ${Math.round(((state.currentQuestionIndex) / questions.length) * 100)}%</span>
          </div>
          
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: ${Math.round(((state.currentQuestionIndex) / questions.length) * 100)}%;"></div>
          </div>

          <div class="quiz-card" id="quiz-question-card">
            <div class="quiz-badge">${currentQ.levelTh}</div>
            
            <div class="quiz-question">${currentQ.question}</div>
            
            <div class="quiz-options-list" id="quiz-options-container">
              <!-- Render choices dynamically -->
            </div>
            
            <div class="quiz-feedback-box" id="quiz-feedback-block" style="display: none;">
              <!-- Render feedback and explanations -->
            </div>

            <div class="quiz-actions">
              <div></div>
              <button class="quiz-nav-btn" id="quiz-next-btn" disabled>
                ${state.currentQuestionIndex === questions.length - 1 ? "ดูผลลัพธ์แบบทดสอบ ➡️" : "ถัดไป ➡️"}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    renderQuizOptions(currentQ);
    
    // Bind next question action
    document.getElementById("quiz-next-btn").addEventListener("click", () => {
      if (state.currentQuestionIndex < questions.length - 1) {
        state.currentQuestionIndex++;
        renderQuiz();
      } else {
        calculateAndRenderQuizSummary();
      }
    });
  }

  function renderQuizOptions(question) {
    const container = document.getElementById("quiz-options-container");
    const nextBtn = document.getElementById("quiz-next-btn");
    const feedbackBlock = document.getElementById("quiz-feedback-block");
    const optionLabels = ["ก", "ข", "ค", "ง"];
    
    container.innerHTML = "";
    
    question.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option-btn";
      btn.innerHTML = `
        <span class="option-marker">${optionLabels[idx]}</span>
        <span style="flex:1;">${opt.replace(/\n/g, '<br>')}</span>
      `;
      
      btn.addEventListener("click", () => {
        // Prevent clicking multiple times
        if (state.quizAnswers[state.currentQuestionIndex] !== undefined) return;
        
        const isCorrect = idx === question.answerIndex;
        
        // Save user answer in state
        state.quizAnswers[state.currentQuestionIndex] = {
          questionIndex: state.currentQuestionIndex,
          selectedIndex: idx,
          isCorrect: isCorrect
        };
        
        // Disable choices and paint colors
        const optionButtons = container.querySelectorAll(".quiz-option-btn");
        optionButtons.forEach((b, optIdx) => {
          b.classList.add("locked");
          if (optIdx === question.answerIndex) {
            b.classList.add("correct");
          } else if (optIdx === idx) {
            b.classList.add("incorrect");
          }
        });
        
        // Show feedback block
        feedbackBlock.style.display = "flex";
        feedbackBlock.className = "quiz-feedback-box animate";
        if (isCorrect) {
          feedbackBlock.innerHTML = `
            <div class="quiz-feedback-header success">
              <span>🎉 ยอดเยี่ยม! คุณตอบถูก</span>
            </div>
            <div class="quiz-explanation">${question.explanation}</div>
          `;
        } else {
          feedbackBlock.innerHTML = `
            <div class="quiz-feedback-header error">
              <span>❌ ขออภัยด้วย! คำตอบของคุณยังไม่ถูก</span>
            </div>
            <div class="quiz-explanation">${question.explanation}</div>
          `;
        }
        
        // Enable next button
        nextBtn.removeAttribute("disabled");
      });
      
      container.appendChild(btn);
    });
  }

  // --- QUIZ SUMMARY SCREEN RENDERING ---
  function calculateAndRenderQuizSummary() {
    const chapter = window.COURSE_DATA.find(c => c.id === state.activeChapterId);
    const totalQuestions = chapter.quizzes.length;
    const score = state.quizAnswers.filter(ans => ans && ans.isCorrect).length;
    
    // Save quiz score
    const prevBestScore = state.progress.completedQuizzes[chapter.id] || 0;
    if (score > prevBestScore) {
      state.progress.completedQuizzes[chapter.id] = score;
      saveProgressToStorage();
    }

    // Dynamic congratulations
    let feedbackTh = "";
    if (score === 6) {
      feedbackTh = "สมบูรณ์แบบมาก! นักศึกษาสามารถทำคะแนนได้เต็มทุกข้อยอดเยี่ยมที่สุด มีความเข้าใจกระบวนการทำงานระดับสูงครบถ้วน!";
    } else if (score >= 4) {
      feedbackTh = "ดีมาก! นักศึกษามีความเข้าใจเนื้อหาหลักและโครงสร้างของตัวระบบบทเรียนได้ค่อนข้างดี ขอให้ฝึกฝนต่อไป!";
    } else {
      feedbackTh = "อย่ายอมแพ้! คะแนนยังค่อนข้างน้อย แนะนำให้นักศึกษากลับไปทบทวนอ่านเนื้อหาและรายละเอียดของตัวแปร เงื่อนไข และลูปอีกรอบนะ!";
    }

    el.mainContent.innerHTML = `
      <div class="content-wrapper">
        <!-- Top Toolbar -->
        <div class="top-toolbar">
          <div class="breadcrumb">
            <a href="#dashboard" style="color: inherit; text-decoration: none;">หน้าหลัก</a>
            <span class="breadcrumb-separator">/</span>
            <span>บทที่ ${chapter.id}</span>
            <span class="breadcrumb-separator">/</span>
            <span style="color: var(--primary-pink); font-weight: 500;">สรุปคะแนนแบบทดสอบ</span>
          </div>
          <div></div>
        </div>

        <div class="quiz-card quiz-summary-card">
          <h2>บทสรุปแบบทดสอบท้ายบทเรียน</h2>
          <h3 style="border:none; margin: 0; color: var(--text-secondary); font-weight:500;">
            บทที่ ${chapter.id}: ${chapter.title}
          </h3>
          
          <div class="summary-score-circle animate">
            <span>${score}</span>
            <span class="summary-score-total">จาก ${totalQuestions} คะแนน</span>
          </div>

          <p style="font-size:16px; font-weight:600; color: var(--primary-purple); max-width: 600px; line-height: 1.6;">
            ${feedbackTh}
          </p>

          <div style="display:flex; gap:16px; margin-top:20px;">
            <button class="lesson-nav-btn" id="retry-quiz-btn">
              🔄 ทำแบบทดสอบอีกครั้ง
            </button>
            <button class="lesson-nav-btn primary" id="next-chapter-btn">
              ดำเนินการบทถัดไป ➡️
            </button>
          </div>
        </div>
      </div>
    `;

    // Bind Summary actions
    document.getElementById("retry-quiz-btn").addEventListener("click", () => {
      state.currentQuestionIndex = 0;
      state.quizAnswers = [];
      renderQuiz();
    });

    document.getElementById("next-chapter-btn").addEventListener("click", () => {
      if (state.activeChapterId < window.COURSE_DATA.length) {
        const nextChapter = window.COURSE_DATA.find(c => c.id === state.activeChapterId + 1);
        window.location.hash = `#chapter-${nextChapter.id}-subtopic-${nextChapter.subtopics[0].id}`;
      } else {
        // Last chapter quiz done: go back to dashboard
        window.location.hash = "#dashboard";
      }
    });
  }

  // --- RUN APP ---
  init();
});
