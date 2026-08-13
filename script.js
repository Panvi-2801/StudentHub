// ===================================================
// StudentHub Portal - Central Dynamic JavaScript File
// ===================================================

document.addEventListener("DOMContentLoaded", function () {

    // 1. LIGHT / DARK THEME SWITCHER
    const themeBtn = document.getElementById("themeToggle");
    const currentTheme = localStorage.getItem("theme");

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

    // 2. HAMBURGER MENU
    const hamburgerBtn = document.querySelector(".hamburger");
    const navLinks = document.getElementById("navLinks");

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener("click", function () {
            navLinks.classList.toggle("show");
        });
    }

    // 3. NOTIFICATION BANNER
    const closeBannerBtn = document.querySelector(".notification-banner .close-btn");
    const banner = document.getElementById("banner");

    if (closeBannerBtn && banner) {
        closeBannerBtn.addEventListener("click", function () {
            banner.style.display = "none";
        });
    }

    // 4. IMAGE SLIDER
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

        setInterval(function () {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // 5. COLLAPSIBLE FAQ ACCORDION
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach((question) => {
        question.addEventListener("click", function () {
            const answer = this.nextElementSibling;
            const icon = this.querySelector("span:last-child");

            if (answer.style.display === "block") {
                answer.style.display = "none";
                if (icon) icon.innerText = "+";
            } else {
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

    // 6. MODAL POPUP SYSTEM
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
            if (regForm) resetRegistrationForm();
        });
    });

    if (modal) {
        window.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
                if (regForm) resetRegistrationForm();
            }
        });
    }

    // ===================================================
    // 7. SUBMIT-BASED VALIDATION WITH CIRCLE ICONS
    // ===================================================
    const regForm = document.getElementById("regForm");

    if (regForm) {
        // Regex Patterns
        const nameRegex = /^[A-Za-z\s]{2,50}$/;
        const emailRegex = /^[a-zA-Z0-9]+([._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^[6-9]\d{9}$/;
        const pwdRegex = /^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // Helper function for circle status & messages
        function setFieldStatus(inputEl, circleEl, msgEl, isValid, errorMsg) {
            if (isValid) {
                if (inputEl) {
                    inputEl.classList.remove('is-invalid-input');
                    inputEl.classList.add('is-valid-input');
                }
                if (circleEl) {
                    circleEl.innerHTML = '✔';
                    circleEl.className = 'status-circle valid-circle';
                }
                if (msgEl) {
                    msgEl.style.display = 'none';
                    msgEl.textContent = '';
                }
            } else {
                if (inputEl) {
                    inputEl.classList.remove('is-valid-input');
                    inputEl.classList.add('is-invalid-input');
                }
                if (circleEl) {
                    circleEl.innerHTML = '✖';
                    circleEl.className = 'status-circle invalid-circle';
                }
                if (msgEl) {
                    msgEl.style.display = 'block';
                    msgEl.textContent = errorMsg;
                }
            }
        }

        // Form Submit Handler (Submit કરવા પર જ ચેક થશે)
        regForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let isFormValid = true;

            // 1. First Name Validation
            const fnameEl = document.getElementById('fname');
            const fnameVal = fnameEl ? fnameEl.value.trim() : "";
            const fnameCircle = document.getElementById('fnameCircle');
            const fnameErr = document.getElementById('fnameErr');

            if (fnameVal === "") {
                setFieldStatus(fnameEl, fnameCircle, fnameErr, false, 'First name is required.');
                isFormValid = false;
            } else if (!nameRegex.test(fnameVal)) {
                setFieldStatus(fnameEl, fnameCircle, fnameErr, false, 'Only letters allowed (min 2).');
                isFormValid = false;
            } else {
                setFieldStatus(fnameEl, fnameCircle, fnameErr, true);
            }

            // 2. Last Name Validation
            const lnameEl = document.getElementById('lname');
            const lnameVal = lnameEl ? lnameEl.value.trim() : "";
            const lnameCircle = document.getElementById('lnameCircle');
            const lnameErr = document.getElementById('lnameErr');

            if (lnameVal === "") {
                setFieldStatus(lnameEl, lnameCircle, lnameErr, false, 'Last name is required.');
                isFormValid = false;
            } else if (!nameRegex.test(lnameVal)) {
                setFieldStatus(lnameEl, lnameCircle, lnameErr, false, 'Only letters allowed (min 2).');
                isFormValid = false;
            } else {
                setFieldStatus(lnameEl, lnameCircle, lnameErr, true);
            }

            // 3. Email ID Validation
            const emailEl = document.getElementById('email');
            const emailVal = emailEl ? emailEl.value.trim() : "";
            const emailCircle = document.getElementById('emailCircle');
            const emailErr = document.getElementById('emailErr');

            if (emailVal === "") {
                setFieldStatus(emailEl, emailCircle, emailErr, false, 'Email ID is required.');
                isFormValid = false;
            } else if (!emailRegex.test(emailVal)) {
                setFieldStatus(emailEl, emailCircle, emailErr, false, 'Enter valid email (No dot before/after @).');
                isFormValid = false;
            } else {
                setFieldStatus(emailEl, emailCircle, emailErr, true);
            }

            // 4. Mobile Phone Validation
            const phoneEl = document.getElementById('phone');
            const phoneVal = phoneEl ? phoneEl.value.trim() : "";
            const phoneCircle = document.getElementById('phoneCircle');
            const phoneErr = document.getElementById('phoneErr');

            if (phoneVal === "") {
                setFieldStatus(phoneEl, phoneCircle, phoneErr, false, 'Mobile number is required.');
                isFormValid = false;
            } else if (!phoneRegex.test(phoneVal)) {
                setFieldStatus(phoneEl, phoneCircle, phoneErr, false, 'Enter valid 10-digit Indian number (starts with 6-9).');
                isFormValid = false;
            } else {
                setFieldStatus(phoneEl, phoneCircle, phoneErr, true);
            }

            // 5. Password Validation
            const pwdEl = document.getElementById('pwd');
            const pwdVal = pwdEl ? pwdEl.value : "";
            const pwdCircle = document.getElementById('pwdCircle');
            const pwdErr = document.getElementById('pwdErr');

            if (pwdVal === "") {
                setFieldStatus(pwdEl, pwdCircle, pwdErr, false, 'Password is required.');
                isFormValid = false;
            } else if (pwdVal.includes(" ")) {
                setFieldStatus(pwdEl, pwdCircle, pwdErr, false, 'Spaces are not allowed in password.');
                isFormValid = false;
            } else if (!pwdRegex.test(pwdVal)) {
                setFieldStatus(pwdEl, pwdCircle, pwdErr, false, 'Min 8 chars: 1 Upper, 1 Lower, 1 Digit, 1 Special Symbol.');
                isFormValid = false;
            } else {
                setFieldStatus(pwdEl, pwdCircle, pwdErr, true);
            }

            // 6. Confirm Password Validation
            const cpwdEl = document.getElementById('cpwd');
            const cpwdVal = cpwdEl ? cpwdEl.value : "";
            const cpwdCircle = document.getElementById('cpwdCircle');
            const cpwdErr = document.getElementById('cpwdErr');

            if (cpwdVal === "") {
                setFieldStatus(cpwdEl, cpwdCircle, cpwdErr, false, 'Please confirm your password.');
                isFormValid = false;
            } else if (cpwdVal !== pwdVal) {
                setFieldStatus(cpwdEl, cpwdCircle, cpwdErr, false, 'Passwords do not match.');
                isFormValid = false;
            } else {
                setFieldStatus(cpwdEl, cpwdCircle, cpwdErr, true);
            }

            // 7. Course Validation
            const courseEl = document.getElementById('course');
            const courseCircle = document.getElementById('courseCircle');
            const courseErr = document.getElementById('courseErr');

            if (courseEl && courseEl.value === "") {
                setFieldStatus(courseEl, courseCircle, courseErr, false, 'Please select a course.');
                isFormValid = false;
            } else if (courseEl) {
                setFieldStatus(courseEl, courseCircle, courseErr, true);
            }

            // 8. Academic Year Validation
            const yearEl = document.getElementById('year');
            const yearCircle = document.getElementById('yearCircle');
            const yearErr = document.getElementById('yearErr');

            if (yearEl && yearEl.value === "") {
                setFieldStatus(yearEl, yearCircle, yearErr, false, 'Please select an academic year.');
                isFormValid = false;
            } else if (yearEl) {
                setFieldStatus(yearEl, yearCircle, yearErr, true);
            }

            // 9. Gender Validation
            const genderSelected = document.querySelector('input[name="gender"]:checked');
            const genderErr = document.getElementById('genderErr');

            if (!genderSelected) {
                if (genderErr) {
                    genderErr.style.display = 'block';
                    genderErr.textContent = 'Please select your gender.';
                }
                isFormValid = false;
            } else {
                if (genderErr) genderErr.style.display = 'none';
            }

            // 10. Terms Acceptance Validation
            const termsChecked = document.getElementById('terms') ? document.getElementById('terms').checked : false;
            const termsErr = document.getElementById('termsErr');

            if (!termsChecked) {
                if (termsErr) {
                    termsErr.style.display = 'block';
                    termsErr.textContent = 'You must accept the Terms & Conditions.';
                }
                isFormValid = false;
            } else {
                if (termsErr) termsErr.style.display = 'none';
            }

            // If all validations pass, show Success Modal
            if (isFormValid) {
                if (modal) modal.style.display = 'flex';
            }
        });

        // Function to reset Form and clear circles/errors
        function resetRegistrationForm() {
            regForm.reset();
            document.querySelectorAll('.status-circle').forEach(el => {
                el.className = 'status-circle';
                el.innerHTML = '';
            });
            document.querySelectorAll('.msg-text').forEach(el => {
                el.style.display = 'none';
                el.textContent = '';
            });
            document.querySelectorAll('input, select').forEach(el => {
                el.classList.remove('is-invalid-input', 'is-valid-input');
            });
        }

    } else {
        // Fallback for other forms
        const otherForms = document.querySelectorAll("form");
        otherForms.forEach((form) => {
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
    }

});