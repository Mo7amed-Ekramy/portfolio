document.addEventListener("DOMContentLoaded", () => {
  /* ============================================================
     1. TYPING EFFECT IN HERO
     ============================================================ */
  const typedTextSpan = document.getElementById("typed-text");
  const roles = [
    "Backend Software Engineer",
    "DEPI Data Engineering Trainee",
    "REST API & Database Architect",
    "Software Engineering Student"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingDelay = 90;
  const erasingDelay = 50;
  const newRoleDelay = 1800;

  function type() {
    if (!typedTextSpan) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(type, newRoleDelay);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 400);
    } else {
      setTimeout(type, isDeleting ? erasingDelay : typingDelay);
    }
  }

  type();

  /* ============================================================
     2. NAVBAR SCROLL EFFECT & ACTIVE SECTION HIGHLIGHT
     ============================================================ */
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  });

  /* ============================================================
     3. MOBILE HAMBURGER MENU
     ============================================================ */
  const hamburger = document.getElementById("hamburger");
  const navLinksContainer = document.getElementById("nav-links");

  if (hamburger && navLinksContainer) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      navLinksContainer.classList.toggle("active");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navLinksContainer.classList.remove("active");
      });
    });
  }

  /* ============================================================
     4. SCROLL REVEAL ANIMATIONS
     ============================================================ */
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((element) => observer.observe(element));

  /* ============================================================
     5. PROJECT DETAIL MODAL SYSTEM
     ============================================================ */
  const projectDetails = {
    "pubg-transpiler": {
      title: "PUBG Language Transpiler & Web IDE",
      tech: "Python · React · Vite · REST API · AST Compiler",
      desc: "Architected a custom domain-specific compiler pipeline that transpiles custom syntax into valid, executable Python code. Integrated with a modern React/Vite web interface for step-by-step diagnostic compilation.",
      achievements: [
        "Built a full transpiler pipeline (tokenizer, lexer, AST parser, semantic analyzer, code generator) supporting 8 distinct language constructs.",
        "Implemented a symbol-table-based semantic analyzer conducting 6 categories of static analysis checks, including type verification and undeclared-identifier detection.",
        "Developed an interactive React IDE visualizing compiler stages in real time with dedicated output logs and syntax error highlights."
      ]
    },
    "attendance-system": {
      title: "College Attendance System",
      tech: "C# · ASP.NET Core 8 MVC · EF Core · SQL Server LocalDB · Bootstrap",
      desc: "Designed and delivered an enterprise web solution for academic institutions to track, report, and manage student attendance records with strict access controls.",
      achievements: [
        "Architected a scalable ASP.NET Core 8 MVC foundation utilizing Entity Framework Core and SQL Server LocalDB for transactional data persistence.",
        "Implemented ASP.NET Core Identity across 8 distinct flows, including user registration, login, email confirmation, password reset, and Two-Factor Authentication (2FA).",
        "Configured production-grade app startup policies (HSTS, HTTPS redirection, centralized exception handling) and built responsive UI templates."
      ]
    },
    "healthguard": {
      title: "HealthGuard — AI Medical Fact Checker Chrome Extension",
      tech: "JavaScript · Manifest V3 · Flask · HuggingFace Inference API · React",
      desc: "Created an intelligent web extension empowering users to verify online medical claims directly within their browser using zero-shot NLP classification.",
      achievements: [
        "Built a Manifest V3 Chrome extension capturing selected text claims from any web page for automated analysis.",
        "Implemented a Flask REST backend leveraging HuggingFace inference ('facebook/bart-large-mnli') paired with rule-based fallback logic, returning 5 structured verification fields per claim.",
        "Engineered a lightweight React popup UI with state management and documented clean frontend–backend API contracts."
      ]
    },
    "librarium": {
      title: "Librarium — Library Management System",
      tech: "Python · Flask · Flask-SQLAlchemy · SQLite · Docker",
      desc: "Developed a containerized full-stack library platform providing multi-role administration and seamless borrowing workflows.",
      achievements: [
        "Built full-stack catalog management supporting Admin and Member roles across 7 core operations (add, browse, search, filter, delete, borrow, return).",
        "Designed a relational database schema (SQLAlchemy) spanning 3 entities supporting borrowing lifecycles, due date calculation, and item availability tracking.",
        "Containerized application infrastructure with Docker and docker-compose; documented design with ERD, DFD, and sequence diagrams."
      ]
    },
    "heart-disease": {
      title: "Heart Disease Prediction Pipeline",
      tech: "Python · Pandas · NumPy · scikit-learn · Random Forest",
      desc: "Constructed a machine learning classification pipeline to predict heart disease presence from clinical diagnostic features.",
      achievements: [
        "Processed and cleaned the UCI Heart Disease dataset (1,025 patient records, 13 clinical features) using IQR outlier detection and feature scaling.",
        "Trained, benchmarked, and evaluated 5 distinct ML classifiers using cross-validation and hyperparameter optimization.",
        "Selected Random Forest model as top performer, achieving 92.68% accuracy and 0.93 F1-score."
      ]
    }
  };

  const modalOverlay = document.getElementById("project-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalTitle = document.getElementById("modal-title");
  const modalTech = document.getElementById("modal-tech");
  const modalDesc = document.getElementById("modal-desc");
  const modalAchievements = document.getElementById("modal-achievements");

  document.querySelectorAll(".btn-view-details").forEach((button) => {
    button.addEventListener("click", () => {
      const projectId = button.getAttribute("data-project");
      const data = projectDetails[projectId];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalTech.textContent = data.tech;
      modalDesc.textContent = data.desc;

      modalAchievements.innerHTML = "";
      data.achievements.forEach((ach) => {
        const li = document.createElement("li");
        li.textContent = ach;
        modalAchievements.appendChild(li);
      });

      modalOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  const closeModal = () => {
    if (modalOverlay) {
      modalOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
