// ===================================================
// StudentHub Portal - Central Dynamic JavaScript File
// ===================================================

document.addEventListener("DOMContentLoaded", function () {

    // 1. LIGHT / DARK THEME SWITCHER (With Smooth Toggle & Memory)
    const themeBtn = document.getElementById("themeToggle");
    const currentTheme = localStorage.getItem("theme");

    // Apply dark theme if saved previously in local storage
    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (themeBtn) themeBtn.innerText = "☀️ Light Mode";
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            let theme = "light";
            if (document.body.classList.contains("dark-mode")) {
                theme = "dark";
                themeBtn.innerText = "☀️ Light Mode";
            } else {
                themeBtn.innerText = "🌙 Dark Mode";
            }
            localStorage.setItem("theme", theme);
        });
    }

    // 2. HAMBURGER MENU (Mobile Navigation Toggle)
    const hamburgerBtn = document.querySelector(".hamburger");
    const navLinks = document.getElementById("navLinks");

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener("click", function () {
            navLinks.classList.toggle("show");
        });
    }

    // 3. NOTIFICATION BANNER (Close Button Handling)
    const closeBannerBtn = document.querySelector(".notification-banner .close-btn");
    const banner = document.getElementById("banner");

    if (closeBannerBtn && banner) {
        closeBannerBtn.addEventListener("click", function () {
            banner.style.display = "none";
        });
    }

    // 4. IMAGE SLIDER (For Home.html)
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".slider-btn.prev");
    const nextBtn = document.querySelector(".slider-btn.next");
    let currentSlide = 0;

    if (slides.length > 0) {
        function showSlide(index) {
            slides.forEach((slide) => slide.classList.remove("active"));
            slides[index].classList.add("active");
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", function () {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", function () {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            });
        }

        // Auto-play slide every 5 seconds
        setInterval(function () {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // 5. COLLAPSIBLE FAQ ACCORDION (For FAQ.html)
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach((question) => {
        question.addEventListener("click", function () {
            const answer = this.nextElementSibling;
            const icon = this.querySelector("span:last-child");

            if (answer.style.display === "block") {
                answer.style.display = "none";
                if (icon) icon.innerText = "+";
            } else {
                // Close all other open answers (Accordion behavior)
                document.querySelectorAll(".faq-answer").forEach((item) => {
                    item.style.display = "none";
                });
                document.querySelectorAll(".faq-question span:last-child").forEach((ic) => {
                    ic.innerText = "+";
                });

                answer.style.display = "block";
                if (icon) icon.innerText = "-";
            }
        });
    });

    // 6. MODAL POPUP SYSTEM (Open / Close Modal)
    const modal = document.getElementById("customModal");
    const openModalBtns = document.querySelectorAll(".btn-open-modal");
    const closeModalBtns = document.querySelectorAll(".modal-close, .btn-close-modal");

    openModalBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            if (modal) modal.style.display = "flex";
        });
    });

    closeModalBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            if (modal) modal.style.display = "none";
        });
    });

    // Close modal when clicking outside the modal box
    if (modal) {
        window.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    // 7. FORM VALIDATION (For Register, Login, and Contact Forms)
    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
        form.addEventListener("submit", function (e) {
            const emailInput = form.querySelector("input[type='email']");
            const passwordInput = form.querySelector("input[type='password']");

            if (emailInput && !emailInput.value.includes("@")) {
                e.preventDefault();
                alert("Please enter a valid email address!");
                return;
            }

            if (passwordInput && passwordInput.value.length < 6) {
                e.preventDefault();
                alert("Password must be at least 6 characters long!");
                return;
            }

            alert("Form submitted successfully! 🎉");
        });
    });

});