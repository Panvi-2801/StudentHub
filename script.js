document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. LIGHT / DARK THEME SWITCHER
    // ==========================================

    const themeBtn = document.getElementById("themeToggle");
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "dark") {

        document.body.classList.add("dark-mode");

        if (themeBtn) {
            themeBtn.innerText = "☀️ Light Mode";
        }
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


    // ==========================================
    // 2. HAMBURGER MENU (MOBILE NAVIGATION)
    // ==========================================

    const hamburgerBtn = document.querySelector(".hamburger");
    const navLinks = document.getElementById("navLinks");

    if (hamburgerBtn && navLinks) {

        hamburgerBtn.addEventListener("click", function () {

            navLinks.classList.toggle("show");

        });

    }


    // ==========================================
    // 3. NOTIFICATION BANNER
    // ==========================================

    const closeBannerBtn =
        document.querySelector(".notification-banner .close-btn");

    const banner =
        document.getElementById("banner");

    if (closeBannerBtn && banner) {

        closeBannerBtn.addEventListener("click", function () {

            banner.style.display = "none";

        });

    }


    // ==========================================
    // 4. COLLAPSIBLE FAQ ACCORDION
    // ==========================================

    const faqQuestions =
        document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (questionBtn) {

        questionBtn.addEventListener("click", function () {

            const faqAnswer =
                this.nextElementSibling;

            const iconSpan =
                this.querySelector("span:last-child");

            if (faqAnswer.style.display === "block") {

                faqAnswer.style.display = "none";

                if (iconSpan) {
                    iconSpan.textContent = "+";
                }

            } else {

                faqAnswer.style.display = "block";

                if (iconSpan) {
                    iconSpan.textContent = "−";
                }

            }

        });

    });


    // ==========================================
    // 5. IMAGE / CONTENT SLIDER
    // ==========================================

    const slides =
        document.querySelectorAll(".slider-container .slide");

    const prevBtn =
        document.querySelector(".slider-btn.prev");

    const nextBtn =
        document.querySelector(".slider-btn.next");

    let currentSlideIndex = 0;

    function showSlide(index) {

        if (!slides.length) {
            return;
        }

        slides.forEach(function (slide) {

            slide.classList.remove("active");

        });

        if (index >= slides.length) {

            currentSlideIndex = 0;

        } else if (index < 0) {

            currentSlideIndex = slides.length - 1;

        } else {

            currentSlideIndex = index;

        }

        slides[currentSlideIndex].classList.add("active");

    }

    if (prevBtn && nextBtn && slides.length > 0) {

        nextBtn.addEventListener("click", function () {

            showSlide(currentSlideIndex + 1);

        });

        prevBtn.addEventListener("click", function () {

            showSlide(currentSlideIndex - 1);

        });

        setInterval(function () {

            showSlide(currentSlideIndex + 1);

        }, 5000);

    }


    // ==========================================
    // 6. DYNAMIC MODAL POPUP (OPEN & CLOSE)
    // ==========================================

    const modal =
        document.getElementById("customModal");

    const openModalBtns =
        document.querySelectorAll(".btn-open-modal");

    const closeModalBtns =
        document.querySelectorAll(
            ".modal-close, .btn-close-modal"
        );


    openModalBtns.forEach(function (btn) {

        btn.addEventListener("click", function (e) {

            e.preventDefault();

            if (modal) {

                modal.style.display = "flex";

            }

        });

    });


    closeModalBtns.forEach(function (btn) {

        btn.addEventListener("click", function () {

            if (modal) {

                modal.style.display = "none";

            }

            if (typeof resetRegistrationForm === "function") {

                resetRegistrationForm();

            }

        });

    });


    if (modal) {

        window.addEventListener("click", function (event) {

            if (event.target === modal) {

                modal.style.display = "none";

                if (typeof resetRegistrationForm === "function") {

                    resetRegistrationForm();

                }

            }

        });

    }


    // ==========================================
    // 7. GENERAL FORMS
    // Feedback, Event, Login, Settings
    // ==========================================

    const generalForms =
        document.querySelectorAll("form:not(#regForm)");

    generalForms.forEach(function (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            if (modal) {

                modal.style.display = "flex";

            }

            form.reset();

        });

    });


    // ==========================================
    // 8. REGISTRATION FORM VALIDATION
    // ==========================================

    const regForm =
        document.getElementById("regForm");

    if (regForm) {

        const studentIdRegex =
            /^D?[0-9]{2}[A-Za-z]{2}[0-9]{3}$/;

        const nameRegex =
            /^[A-Za-z\s]{2,50}$/;

        const emailRegex =
            /^[a-zA-Z0-9]+([._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;

        const phoneRegex =
            /^[6-9]\d{9}$/;

        const pwdRegex =
            /^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


        function setFieldStatus(
            inputEl,
            circleEl,
            msgEl,
            isValid,
            errorMsg
        ) {

            if (isValid) {

                if (inputEl) {

                    inputEl.classList.remove(
                        "is-invalid-input"
                    );

                    inputEl.classList.add(
                        "is-valid-input"
                    );

                }

                if (circleEl) {

                    circleEl.innerHTML = "✔";

                    circleEl.className =
                        "status-circle valid-circle";

                }

                if (msgEl) {

                    msgEl.style.display = "none";

                    msgEl.textContent = "";

                }

            } else {

                if (inputEl) {

                    inputEl.classList.remove(
                        "is-valid-input"
                    );

                    inputEl.classList.add(
                        "is-invalid-input"
                    );

                }

                if (circleEl) {

                    circleEl.innerHTML = "✖";

                    circleEl.className =
                        "status-circle invalid-circle";

                }

                if (msgEl) {

                    msgEl.style.display = "block";

                    msgEl.textContent = errorMsg;

                }

            }

        }


        regForm.addEventListener("submit", function (e) {

            e.preventDefault();

            let isFormValid = true;


            // Student ID
            const studentIdEl =
                document.getElementById("studentId");

            const studentIdVal =
                studentIdEl
                    ? studentIdEl.value.trim().toUpperCase()
                    : "";

            const studentIdCircle =
                document.getElementById("studentIdCircle");

            const studentIdErr =
                document.getElementById("studentIdErr");


            if (studentIdEl) {

                studentIdEl.value = studentIdVal;

            }


            if (studentIdVal === "") {

                setFieldStatus(
                    studentIdEl,
                    studentIdCircle,
                    studentIdErr,
                    false,
                    "Student ID is required."
                );

                isFormValid = false;

            } else if (!studentIdRegex.test(studentIdVal)) {

                setFieldStatus(
                    studentIdEl,
                    studentIdCircle,
                    studentIdErr,
                    false,
                    "Use format 25CS075 or D25CS114."
                );

                isFormValid = false;

            } else {

                setFieldStatus(
                    studentIdEl,
                    studentIdCircle,
                    studentIdErr,
                    true
                );

            }


            // First Name
            const fnameEl =
                document.getElementById("fname");

            const fnameVal =
                fnameEl
                    ? fnameEl.value.trim()
                    : "";

            const fnameCircle =
                document.getElementById("fnameCircle");

            const fnameErr =
                document.getElementById("fnameErr");


            if (fnameVal === "") {

                setFieldStatus(
                    fnameEl,
                    fnameCircle,
                    fnameErr,
                    false,
                    "First name is required."
                );

                isFormValid = false;

            } else if (!nameRegex.test(fnameVal)) {

                setFieldStatus(
                    fnameEl,
                    fnameCircle,
                    fnameErr,
                    false,
                    "Only letters allowed (min 2)."
                );

                isFormValid = false;

            } else {

                setFieldStatus(
                    fnameEl,
                    fnameCircle,
                    fnameErr,
                    true
                );

            }


            // Last Name
            const lnameEl =
                document.getElementById("lname");

            const lnameVal =
                lnameEl
                    ? lnameEl.value.trim()
                    : "";

            const lnameCircle =
                document.getElementById("lnameCircle");

            const lnameErr =
                document.getElementById("lnameErr");


            if (lnameVal === "") {

                setFieldStatus(
                    lnameEl,
                    lnameCircle,
                    lnameErr,
                    false,
                    "Last name is required."
                );

                isFormValid = false;

            } else if (!nameRegex.test(lnameVal)) {

                setFieldStatus(
                    lnameEl,
                    lnameCircle,
                    lnameErr,
                    false,
                    "Only letters allowed (min 2)."
                );

                isFormValid = false;

            } else {

                setFieldStatus(
                    lnameEl,
                    lnameCircle,
                    lnameErr,
                    true
                );

            }


            // Email
            const emailEl =
                document.getElementById("email");

            const emailVal =
                emailEl
                    ? emailEl.value.trim()
                    : "";

            const emailCircle =
                document.getElementById("emailCircle");

            const emailErr =
                document.getElementById("emailErr");


            if (emailVal === "") {

                setFieldStatus(
                    emailEl,
                    emailCircle,
                    emailErr,
                    false,
                    "Email ID is required."
                );

                isFormValid = false;

            } else if (!emailRegex.test(emailVal)) {

                setFieldStatus(
                    emailEl,
                    emailCircle,
                    emailErr,
                    false,
                    "Enter valid email."
                );

                isFormValid = false;

            } else {

                setFieldStatus(
                    emailEl,
                    emailCircle,
                    emailErr,
                    true
                );

            }


            // Phone
            const phoneEl =
                document.getElementById("phone");

            const phoneVal =
                phoneEl
                    ? phoneEl.value.trim()
                    : "";

            const phoneCircle =
                document.getElementById("phoneCircle");

            const phoneErr =
                document.getElementById("phoneErr");


            if (phoneVal === "") {

                setFieldStatus(
                    phoneEl,
                    phoneCircle,
                    phoneErr,
                    false,
                    "Mobile number is required."
                );

                isFormValid = false;

            } else if (!phoneRegex.test(phoneVal)) {

                setFieldStatus(
                    phoneEl,
                    phoneCircle,
                    phoneErr,
                    false,
                    "Enter valid 10-digit Indian number."
                );

                isFormValid = false;

            } else {

                setFieldStatus(
                    phoneEl,
                    phoneCircle,
                    phoneErr,
                    true
                );

            }


            // Password
            const pwdEl =
                document.getElementById("pwd");

            const pwdVal =
                pwdEl
                    ? pwdEl.value
                    : "";

            const pwdCircle =
                document.getElementById("pwdCircle");

            const pwdErr =
                document.getElementById("pwdErr");


            if (pwdVal === "") {

                setFieldStatus(
                    pwdEl,
                    pwdCircle,
                    pwdErr,
                    false,
                    "Password is required."
                );

                isFormValid = false;

            } else if (!pwdRegex.test(pwdVal)) {

                setFieldStatus(
                    pwdEl,
                    pwdCircle,
                    pwdErr,
                    false,
                    "Min 8 chars: 1 Upper, 1 Lower, 1 Digit, 1 Special Symbol."
                );

                isFormValid = false;

            } else {

                setFieldStatus(
                    pwdEl,
                    pwdCircle,
                    pwdErr,
                    true
                );

            }


            // Confirm Password
            const cpwdEl =
                document.getElementById("cpwd");

            const cpwdVal =
                cpwdEl
                    ? cpwdEl.value
                    : "";

            const cpwdCircle =
                document.getElementById("cpwdCircle");

            const cpwdErr =
                document.getElementById("cpwdErr");


            if (cpwdVal === "") {

                setFieldStatus(
                    cpwdEl,
                    cpwdCircle,
                    cpwdErr,
                    false,
                    "Please confirm your password."
                );

                isFormValid = false;

            } else if (cpwdVal !== pwdVal) {

                setFieldStatus(
                    cpwdEl,
                    cpwdCircle,
                    cpwdErr,
                    false,
                    "Passwords do not match."
                );

                isFormValid = false;

            } else {

                setFieldStatus(
                    cpwdEl,
                    cpwdCircle,
                    cpwdErr,
                    true
                );

            }


            // Course
            const courseEl =
                document.getElementById("course");

            const courseCircle =
                document.getElementById("courseCircle");

            const courseErr =
                document.getElementById("courseErr");


            if (courseEl && courseEl.value === "") {

                setFieldStatus(
                    courseEl,
                    courseCircle,
                    courseErr,
                    false,
                    "Please select a course."
                );

                isFormValid = false;

            } else if (courseEl) {

                setFieldStatus(
                    courseEl,
                    courseCircle,
                    courseErr,
                    true
                );

            }


            // Academic Year
            const yearEl =
                document.getElementById("year");

            const yearCircle =
                document.getElementById("yearCircle");

            const yearErr =
                document.getElementById("yearErr");


            if (yearEl && yearEl.value === "") {

                setFieldStatus(
                    yearEl,
                    yearCircle,
                    yearErr,
                    false,
                    "Please select an academic year."
                );

                isFormValid = false;

            } else if (yearEl) {

                setFieldStatus(
                    yearEl,
                    yearCircle,
                    yearErr,
                    true
                );

            }


            // Gender
            const genderSelected =
                document.querySelector(
                    'input[name="gender"]:checked'
                );

            const genderErr =
                document.getElementById("genderErr");


            if (!genderSelected) {

                if (genderErr) {

                    genderErr.style.display = "block";

                    genderErr.textContent =
                        "Please select your gender.";

                }

                isFormValid = false;

            } else if (genderErr) {

                genderErr.style.display = "none";

            }


            // Terms
            const terms =
                document.getElementById("terms");

            const termsErr =
                document.getElementById("termsErr");


            if (terms && !terms.checked) {

                if (termsErr) {

                    termsErr.style.display = "block";

                    termsErr.textContent =
                        "You must accept the Terms & Conditions.";

                }

                isFormValid = false;

            } else if (termsErr) {

                termsErr.style.display = "none";

            }


            if (isFormValid && modal) {

                modal.style.display = "flex";

            }

        });

    }

});


// ==========================================
// 9. DYNAMIC EVENT LIST USING FETCH API
// ==========================================

let studentHubEvents = [];

let studentHubCurrentPage = 1;

let studentHubItemsPerPage = 3;


document.addEventListener("DOMContentLoaded", function () {

    const eventContainer =
        document.getElementById("eventContainer");

    const searchInput =
        document.getElementById("searchInput");

    const categoryFilter =
        document.getElementById("categoryFilter");

    const sortSelect =
        document.getElementById("sortSelect");

    const pagination =
        document.getElementById("pagination");


    if (
        !eventContainer ||
        !searchInput ||
        !categoryFilter ||
        !sortSelect ||
        !pagination
    ) {

        return;

    }


    // Fetch external JSON file
    fetch("data/events.json")

        .then(response => response.json())

        .then(data => {

            studentHubEvents = data;

            studentHubDisplayEvents();

        })

        .catch(error => {

            eventContainer.innerHTML =
                '<p class="no-events">Unable to load events.</p>';

            console.log(
                "Error loading events:",
                error
            );

        });


    // ==========================================
    // DISPLAY EVENTS
    // ==========================================

    function studentHubDisplayEvents() {

        let searchText =
            searchInput.value.toLowerCase();

        let category =
            categoryFilter.value;


        let filteredEvents =
            studentHubEvents.filter(function (event) {

                let matchSearch =
                    event.name.toLowerCase().includes(searchText) ||
                    event.category.toLowerCase().includes(searchText);

                let matchCategory =
                    category === "all" ||
                    event.category === category;

                return matchSearch && matchCategory;

            });


        let start =
            (studentHubCurrentPage - 1) *
            studentHubItemsPerPage;

        let end =
            start + studentHubItemsPerPage;


        let pageEvents =
            filteredEvents.slice(start, end);


        eventContainer.innerHTML = "";


        if (pageEvents.length === 0) {

            eventContainer.innerHTML =
                '<p class="no-events">No events found.</p>';

        } else {

            pageEvents.forEach(function (event) {

                eventContainer.innerHTML += `

                    <div class="dynamic-event-card">

                        <h3>${event.name}</h3>

                        <p>
                            <b>📚 Category:</b>
                            ${event.category}
                        </p>

                        <p>
                            <b>📅 Date:</b>
                            ${event.date}
                        </p>

                        <p>
                            <b>📍 Venue:</b>
                            ${event.venue}
                        </p>

                    </div>

                `;

            });

        }


        studentHubDisplayPagination(
            filteredEvents.length
        );

    }


    // ==========================================
    // SEARCH
    // ==========================================

    searchInput.addEventListener(
        "input",
        function () {

            studentHubCurrentPage = 1;

            studentHubDisplayEvents();

        }
    );


    // ==========================================
    // FILTER
    // ==========================================

    categoryFilter.addEventListener(
        "change",
        function () {

            studentHubCurrentPage = 1;

            studentHubDisplayEvents();

        }
    );


    // ==========================================
    // SORTING
    // ==========================================

    sortSelect.addEventListener(
        "change",
        function () {

            let value = this.value;


            if (value === "nameAsc") {

                studentHubEvents.sort(
                    function (a, b) {

                        return a.name.localeCompare(
                            b.name
                        );

                    }
                );

            }


            if (value === "nameDesc") {

                studentHubEvents.sort(
                    function (a, b) {

                        return b.name.localeCompare(
                            a.name
                        );

                    }
                );

            }


            if (value === "dateAsc") {

                studentHubEvents.sort(
                    function (a, b) {

                        return new Date(a.date) -
                            new Date(b.date);

                    }
                );

            }


            if (value === "dateDesc") {

                studentHubEvents.sort(
                    function (a, b) {

                        return new Date(b.date) -
                            new Date(a.date);

                    }
                );

            }


            studentHubCurrentPage = 1;

            studentHubDisplayEvents();

        }
    );


    // ==========================================
    // PAGINATION
    // ==========================================

    function studentHubDisplayPagination(
        totalItems
    ) {

        let totalPages =
            Math.ceil(
                totalItems /
                studentHubItemsPerPage
            );


        pagination.innerHTML = "";


        if (totalPages <= 1) {

            return;

        }


        for (
            let i = 1;
            i <= totalPages;
            i++
        ) {

            let button =
                document.createElement("button");


            button.innerText = i;


            if (i === studentHubCurrentPage) {

                button.classList.add("active");

            }


            button.addEventListener(
                "click",
                function () {

                    studentHubCurrentPage = i;

                    studentHubDisplayEvents();

                }
            );


            pagination.appendChild(button);

        }

    }

});


// ==========================================
// 10. RESET REGISTRATION FORM
// ==========================================

function resetRegistrationForm() {

    const regForm =
        document.getElementById("regForm");


    if (regForm) {

        regForm.reset();


        document
            .querySelectorAll(".status-circle")
            .forEach(function (el) {

                el.className =
                    "status-circle";

                el.innerHTML = "";

            });


        document
            .querySelectorAll(".msg-text")
            .forEach(function (el) {

                el.style.display = "none";

                el.textContent = "";

            });


        document
            .querySelectorAll("input, select")
            .forEach(function (el) {

                el.classList.remove(
                    "is-invalid-input",
                    "is-valid-input"
                );

            });

    }

}


// ==========================================
// 11. DYNAMIC STUDENT PROFILES USING FETCH API
// ==========================================

let studentHubStudents = [];

let studentHubStudentPage = 1;

let studentHubStudentsPerPage = 3;


document.addEventListener("DOMContentLoaded", function () {

    const studentContainer =
        document.getElementById("studentContainer");

    const studentSearch =
        document.getElementById("studentSearch");

    const studentCourseFilter =
        document.getElementById("studentCourseFilter");

    const studentSort =
        document.getElementById("studentSort");

    const studentPagination =
        document.getElementById("studentPagination");


    // Only run on Profile page
    if (
        !studentContainer ||
        !studentSearch ||
        !studentCourseFilter ||
        !studentSort ||
        !studentPagination
    ) {

        return;

    }


    // ==========================================
    // FETCH STUDENTS JSON
    // ==========================================

    fetch("data/students.json")

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Unable to load students.json"
                );

            }

            return response.json();

        })

        .then(data => {

            studentHubStudents = data;

            loadStudentCourses();

            displayStudents();

        })

        .catch(error => {

            studentContainer.innerHTML =
                "<p>Unable to load student profiles.</p>";

            console.log(
                "Error loading students:",
                error
            );

        });


    // ==========================================
    // LOAD COURSE FILTER
    // ==========================================

    function loadStudentCourses() {

        const courses =
            [
                ...new Set(
                    studentHubStudents.map(
                        student => student.course
                    )
                )
            ];


        courses.forEach(function (course) {

            const option =
                document.createElement("option");

            option.value = course;

            option.textContent = course;

            studentCourseFilter.appendChild(
                option
            );

        });

    }


    // ==========================================
    // DISPLAY STUDENTS
    // ==========================================

    function displayStudents() {

        const searchText =
            studentSearch.value
                .toLowerCase()
                .trim();


        const selectedCourse =
            studentCourseFilter.value;


        const sortValue =
            studentSort.value;


        // SEARCH + FILTER
        let filteredStudents =
            studentHubStudents.filter(
                function (student) {

                    const matchesSearch =
                        student.name
                            .toLowerCase()
                            .includes(searchText) ||

                        student.studentId
                            .toLowerCase()
                            .includes(searchText);


                    const matchesCourse =
                        selectedCourse === "all" ||
                        student.course === selectedCourse;


                    return (
                        matchesSearch &&
                        matchesCourse
                    );

                }
            );


        // ==========================================
        // SORTING
        // ==========================================

        if (sortValue === "name") {

            filteredStudents.sort(
                function (a, b) {

                    return a.name.localeCompare(
                        b.name
                    );

                }
            );

        }


        if (sortValue === "studentId") {

            filteredStudents.sort(
                function (a, b) {

                    return a.studentId.localeCompare(
                        b.studentId
                    );

                }
            );

        }


        // ==========================================
        // PAGINATION
        // ==========================================

        const startIndex =
            (studentHubStudentPage - 1) *
            studentHubStudentsPerPage;


        const endIndex =
            startIndex +
            studentHubStudentsPerPage;


        const studentsToDisplay =
            filteredStudents.slice(
                startIndex,
                endIndex
            );


        studentContainer.innerHTML = "";


        // ==========================================
        // NO RESULT
        // ==========================================

        if (studentsToDisplay.length === 0) {

            studentContainer.innerHTML =
                "<p>No student found.</p>";

            studentPagination.innerHTML = "";

            return;

        }


        // ==========================================
        // DYNAMIC RENDERING
        // ==========================================

        studentsToDisplay.forEach(
            function (student) {

                const card =
                    document.createElement("div");


                card.className =
                    "student-card";


                card.innerHTML = `

                    <h4>
                        👤 ${student.name}
                    </h4>

                    <p>
                        <b>Student ID:</b>
                        ${student.studentId}
                    </p>

                    <p>
                        <b>Course:</b>
                        ${student.course}
                    </p>

                    <p>
                        <b>Year:</b>
                        ${student.year}
                    </p>

                    <p>
                        <b>Email:</b>
                        ${student.email}
                    </p>

                `;


                studentContainer.appendChild(
                    card
                );

            }
        );


        createStudentPagination(
            filteredStudents.length
        );

    }


    // ==========================================
    // STUDENT SEARCH
    // ==========================================

    studentSearch.addEventListener(
        "input",
        function () {

            studentHubStudentPage = 1;

            displayStudents();

        }
    );


    // ==========================================
    // STUDENT COURSE FILTER
    // ==========================================

    studentCourseFilter.addEventListener(
        "change",
        function () {

            studentHubStudentPage = 1;

            displayStudents();

        }
    );


    // ==========================================
    // STUDENT SORTING
    // ==========================================

    studentSort.addEventListener(
        "change",
        function () {

            studentHubStudentPage = 1;

            displayStudents();

        }
    );


    // ==========================================
    // STUDENT PAGINATION
    // ==========================================

    function createStudentPagination(
        totalStudents
    ) {

        const totalPages =
            Math.ceil(
                totalStudents /
                studentHubStudentsPerPage
            );


        studentPagination.innerHTML = "";


        if (totalPages <= 1) {

            return;

        }


        for (
            let i = 1;
            i <= totalPages;
            i++
        ) {

            const button =
                document.createElement("button");


            button.textContent = i;


            button.className =
                "student-page-btn";


            button.addEventListener(
                "click",
                function () {

                    studentHubStudentPage = i;

                    displayStudents();

                }
            );


            studentPagination.appendChild(
                button
            );

        }

    }

});