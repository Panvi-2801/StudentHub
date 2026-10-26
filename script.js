/* =====================================================================
   STUDENTHUB PORTAL - script.js  (Final English version)
   Pages: Home, Dashboard, Event, Event_register, FAQ, Profile,
          Register, Login, Feedback, Contact, setting, About
   ===================================================================== */
document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // 0. HELPERS
    // =========================================================
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
    const page = (location.pathname.split("/").pop() || "index").toLowerCase();

    const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    const hasRealHref = (el) => {
        const h = el.getAttribute && el.getAttribute("href");
        return !!h && h !== "#" && !h.toLowerCase().startsWith("javascript");
    };

    // Never show the browser alert box
    window.alert = function () { return; };
    $$("[onclick]").forEach((el) => {
        const code = el.getAttribute("onclick");
        if (code && code.includes("alert")) el.removeAttribute("onclick");
    });

    // =========================================================
    // 1. INJECTED CSS (popup, toast, FAQ, cards, hamburger, dark mode)
    // =========================================================
    const style = document.createElement("style");
    style.textContent = `
    /* ---------- Popup ---------- */
    .sh-overlay{position:fixed;inset:0;background:rgba(10,37,64,.55);display:none;align-items:center;justify-content:center;z-index:99998;padding:16px}
    .sh-overlay.open{display:flex}
    .sh-popup{position:relative;background:#fff;color:#0a2540;width:100%;max-width:470px;max-height:85vh;overflow:auto;border-radius:14px;padding:26px 28px;box-shadow:0 12px 40px rgba(0,0,0,.3);animation:shPop .2s ease;text-align:left}
    @keyframes shPop{from{transform:scale(.94);opacity:0}to{transform:scale(1);opacity:1}}
    .sh-ptitle{font-size:22px;font-weight:700;margin:0 0 12px;padding:0;border:none}
    .sh-popup p,.sh-popup li{line-height:1.6;margin:6px 0}
    .sh-popup ul{padding-left:20px;margin:8px 0}
    .sh-popup label{font-weight:700;font-size:14px;display:block}
    .sh-popup input{width:100%;box-sizing:border-box;padding:10px;margin:4px 0 10px;border:1px solid #cbd5e1;border-radius:8px;font-size:15px}
    .sh-popup .sh-close{position:absolute;top:8px;right:14px;width:auto;height:auto;background:transparent!important;color:#64748b!important;border:none!important;box-shadow:none!important;font-size:28px;cursor:pointer;line-height:1;padding:0 4px}
    .sh-popup .sh-close:hover{color:#ef4444!important}
    .sh-actions{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap}
    .sh-popup .sh-btn{padding:10px 18px;border-radius:8px;border:none;background:#0284c7;color:#fff;font-weight:700;cursor:pointer;text-decoration:none;display:inline-block;font-size:15px}
    /* Close / Cancel / Later buttons are grey (never blue) */
    .sh-popup .sh-btn.alt{background:#64748b!important;color:#fff!important;border:none!important}
    .sh-popup .sh-btn.alt:hover{background:#475569!important}
    /* ---------- Toast & form messages ---------- */
    .sh-toast{position:fixed;top:25px;right:25px;z-index:99999;padding:15px 22px;border-radius:10px;font-weight:600;box-shadow:0 6px 22px rgba(0,0,0,.22);max-width:340px;cursor:pointer;animation:shPop .2s ease}
    .sh-toast.ok{background:#dcfce7;color:#166534;border:1px solid #86efac}
    .sh-toast.bad{background:#fee2e2;color:#b91c1c;border:1px solid #fca5a5}
    .sh-form-msg{width:100%;box-sizing:border-box;margin-top:15px;padding:14px 18px;border-radius:8px;text-align:center;font-weight:600;font-size:16px}
    .sh-form-msg.ok{background:#dcfce7;color:#15803d;border:1px solid #86efac}
    .sh-form-msg.bad{background:#fee2e2;color:#b91c1c;border:1px solid #fca5a5}
    .sh-err{color:#ef4444;font-size:13px;font-weight:700;margin:4px 0 8px;display:none}
    /* ---------- FAQ ---------- */
    .sh-faq-ans{display:none;padding:12px 18px;margin:-4px 0 12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0 0 10px 10px;line-height:1.6;font-size:15px;color:#334155}
    /* ---------- Cards (events / students) ---------- */
    .sh-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px;margin-top:16px}
    .sh-card{padding:14px 18px;margin:0;border:1px solid #dbe4ee;border-radius:12px;background:#fff;animation:shPop .25s ease;transition:box-shadow .2s,transform .2s}
    .sh-card:hover{box-shadow:0 6px 18px rgba(2,132,199,.15);transform:translateY(-2px)}
    .sh-title{font-size:17px;font-weight:700;color:#0284c7;margin:0 0 4px;padding:0;border:none;line-height:1.3}
    .sh-meta{color:#64748b;font-size:14px;line-height:1.55;margin:2px 0;padding:0}
    .sh-card-top{display:flex;justify-content:space-between;align-items:flex-start;gap:10px}
    .sh-tag{background:#e0f2fe;color:#0369a1;padding:3px 12px;border-radius:20px;font-size:12px;font-weight:700;white-space:nowrap}
    .sh-link{display:inline-block;margin-top:6px;color:#0284c7;font-weight:700;text-decoration:none;font-size:14px}
    .sh-student-card{display:flex;align-items:center;gap:14px}
    .sh-avatar{width:48px;height:48px;border-radius:50%;background:#0284c7;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:19px;flex-shrink:0}
    .sh-empty{grid-column:1/-1;text-align:center;padding:24px;color:#64748b;font-weight:600}
    .sh-fade{animation:shFade .6s ease}
    @keyframes shFade{from{opacity:.2}to{opacity:1}}
    /* ---------- Floating theme button + hamburger ---------- */
    .sh-theme-fab{position:fixed;bottom:20px;right:20px;z-index:9990;padding:11px 16px;border:none;border-radius:30px;background:#0a2540;color:#fff;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.3)}
    .sh-hamburger{display:none;background:none;border:none;font-size:30px;cursor:pointer;color:inherit;padding:4px 10px}
    @media (max-width:768px){
      .sh-hamburger{display:block}
      .sh-nav-hide:not(.sh-nav-open){display:none!important}
      .sh-nav-open{display:flex!important;flex-direction:column;gap:6px}
    }
    /* ---------- Dark mode ---------- */
    body.dark-mode{background:#0f172a!important;color:#e2e8f0!important}
    body.dark-mode .dm-light{background-color:#1e293b!important;border-color:#334155!important}
    body.dark-mode .dm-text{color:#e2e8f0!important}
    body.dark-mode input,body.dark-mode select,body.dark-mode textarea{background:#0f172a!important;color:#e2e8f0!important;border-color:#475569!important}
    body.dark-mode .sh-popup{background:#1e293b;color:#e2e8f0}
    body.dark-mode .sh-faq-ans{background:#1e293b;border-color:#334155;color:#cbd5e1}
    body.dark-mode .sh-card{background:#1e293b;border-color:#334155}
    body.dark-mode .sh-meta{color:#94a3b8}
    `;
    document.head.appendChild(style);

    // =========================================================
    // 2. POPUP SYSTEM (no alert box - click anywhere outside to close)
    // =========================================================
    const overlay = document.createElement("div");
    overlay.className = "sh-overlay";
    overlay.innerHTML = '<div class="sh-popup" role="dialog" aria-modal="true"><button class="sh-close" type="button" aria-label="Close">&times;</button><div class="sh-body"></div></div>';
    document.body.appendChild(overlay);
    const popupBox = $(".sh-popup", overlay);
    const popupBody = $(".sh-body", overlay);

    function openPopup(html) {
        popupBody.innerHTML = html;
        overlay.classList.add("open");
    }
    function closePopup() {
        overlay.classList.remove("open");
    }

    overlay.addEventListener("click", (e) => {
        // Clicking anywhere outside the popup box closes it
        if (!popupBox.contains(e.target)) closePopup();
        if (e.target.closest(".sh-close") || e.target.closest("[data-sh-close]")) closePopup();
    });

    // Toast message (click anywhere to dismiss, or it disappears automatically)
    function showToast(msg, ok = true) {
        const old = $("#shToast");
        if (old) old.remove();
        const t = document.createElement("div");
        t.id = "shToast";
        t.className = "sh-toast " + (ok ? "ok" : "bad");
        t.textContent = msg;
        document.body.appendChild(t);
        const remove = () => {
            t.remove();
            document.removeEventListener("click", remove);
        };
        setTimeout(() => document.addEventListener("click", remove), 0);
        setTimeout(remove, 4500);
    }

    // =========================================================
    // 4. DARK MODE (remembers the choice)
    // =========================================================
    const parseRGB = (c) => {
        const m = String(c).match(/rgba?\(([^)]+)\)/);
        if (!m) return null;
        const p = m[1].trim().split(/[\s,\/]+/).map(parseFloat);
        return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1];
    };

    function tagDark() {
        $$("body *").forEach((el) => {
            if (el.dataset.dmTag || el.closest(".sh-overlay, .sh-toast, .sh-theme-fab")) return;
            el.dataset.dmTag = "1";
            const cs = getComputedStyle(el);
            const bg = parseRGB(cs.backgroundColor);
            if (bg && bg[3] > 0.5 && Math.min(bg[0], bg[1], bg[2]) > 200 && (bg[0] + bg[1] + bg[2]) / 3 > 212) {
                el.classList.add("dm-light");
            }
            const c = parseRGB(cs.color);
            if (c && (c[0] + c[1] + c[2]) / 3 < 110) el.classList.add("dm-text");
        });
    }

    let themeBtn = $("#themeToggle, .theme-toggle, #darkModeBtn, #darkToggle");
    if (!themeBtn) {
        themeBtn = $$("button, a").find((b) => /dark mode|light mode/i.test(b.textContent));
    }
    if (!themeBtn) {
        themeBtn = document.createElement("button");
        themeBtn.className = "sh-theme-fab";
        themeBtn.type = "button";
        document.body.appendChild(themeBtn);
    }

    function setTheme(dark, save = true) {
        if (dark) {
            tagDark();
            document.body.classList.add("dark-mode");
            themeBtn.textContent = "☀️ Light Mode";
        } else {
            document.body.classList.remove("dark-mode");
            themeBtn.textContent = "🌙 Dark Mode";
        }
        if (save) {
            try { localStorage.setItem("sh-theme", dark ? "dark" : "light"); } catch (err) { /* ignore */ }
        }
    }

    themeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        setTheme(!document.body.classList.contains("dark-mode"));
    });

    let savedTheme = null;
    try { savedTheme = localStorage.getItem("sh-theme"); } catch (err) { /* ignore */ }
    setTheme(savedTheme === "dark", false);

    // =========================================================
    // 5. HAMBURGER MENU
    // =========================================================
    const navLinks = $("#navLinks, .nav-links, header nav ul, nav ul");
    let hamburger = $(".hamburger, #hamburger, .menu-toggle, .menu-btn, .nav-toggle, .sh-hamburger");

    if (!hamburger && navLinks) {
        hamburger = document.createElement("button");
        hamburger.type = "button";
        hamburger.className = "sh-hamburger";
        hamburger.setAttribute("aria-label", "Menu");
        hamburger.textContent = "☰";
        navLinks.parentElement.insertBefore(hamburger, navLinks);
        navLinks.classList.add("sh-nav-hide");
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            navLinks.classList.toggle("show");
            navLinks.classList.toggle("sh-nav-open");
        });
        navLinks.addEventListener("click", (e) => {
            if (e.target.closest("a")) navLinks.classList.remove("show", "sh-nav-open");
        });
        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove("show", "sh-nav-open");
            }
        });
    }

    // Highlight the link of the current page
    $$("nav a, .navbar a").forEach((a) => {
        const h = (a.getAttribute("href") || "").split("/").pop().toLowerCase();
        if (h && h === page) a.classList.add("active");
    });

    // =========================================================
    // 6. NOTIFICATION BANNER CLOSE
    // =========================================================
    const banner = $("#banner");
    if (banner) {
        const closeBtn = $(".close-btn", banner);
        if (closeBtn) {
            closeBtn.addEventListener("click", (e) => {
                e.preventDefault();
                banner.style.display = "none";
            });
        }
    }

    // =========================================================
    // 7. SLIDER / SLIDING WINDOW
    // =========================================================
    let slides = $$(".slide, .slider-image, .carousel-slide");
    if (slides.length === 0) {
        const bannerImgs = $$("img").filter((i) => /banner/i.test(i.getAttribute("src") || ""));
        if (bannerImgs.length > 1 && bannerImgs.every((i) => i.parentElement === bannerImgs[0].parentElement)) {
            slides = bannerImgs;
        }
    }

    if (slides.length > 1) {
        let current = 0;
        let timer = null;
        const prevBtn = $(".prev, .prev-btn, .slider-prev");
        const nextBtn = $(".next, .next-btn, .slider-next");

        const showSlide = (i) => {
            current = (i + slides.length) % slides.length;
            slides.forEach((s, idx) => {
                s.style.display = idx === current ? "block" : "none";
                s.classList.remove("sh-fade");
            });
            slides[current].classList.add("sh-fade");
        };
        const restart = () => {
            clearInterval(timer);
            timer = setInterval(() => showSlide(current + 1), 5000);
        };

        showSlide(0);
        restart();
        if (nextBtn) nextBtn.addEventListener("click", (e) => { e.preventDefault(); showSlide(current + 1); restart(); });
        if (prevBtn) prevBtn.addEventListener("click", (e) => { e.preventDefault(); showSlide(current - 1); restart(); });
    }

    // =========================================================
    // 8. PROFILE EDIT HELPERS
    // =========================================================
    const nameSpan = () => $$("span").find((s) => s.parentElement && /^student name/i.test(s.parentElement.textContent.trim()));
    const getName = () => { const sp = nameSpan(); return sp ? sp.textContent.trim() : ""; };
    const setName = (v) => { const sp = nameSpan(); if (sp) sp.textContent = v; };
    const findLabel = (label) => $$("strong, b").find((x) => x.textContent.trim().toLowerCase().startsWith(label.toLowerCase()));

    function getLabeled(label) {
        const s = findLabel(label);
        if (!s || !s.parentElement) return "";
        return s.parentElement.textContent.replace(s.textContent, "").trim();
    }
    function setLabeled(label, value) {
        const s = findLabel(label);
        if (!s || !s.parentElement) return;
        Array.from(s.parentElement.childNodes).forEach((n) => { if (n !== s) n.remove(); });
        s.parentElement.appendChild(document.createTextNode(" " + value));
    }
    function applyProfile(p) {
        if (!p) return;
        if (p.name) setName(p.name);
        if (p.email) setLabeled("Email", p.email);
        if (p.phone) setLabeled("Phone", p.phone);
    }
    try {
        const saved = JSON.parse(localStorage.getItem("sh-profile") || "null");
        if (saved) applyProfile(saved);
    } catch (err) { /* ignore */ }

    // =========================================================
    // 9. POPUP CONTENT + BUTTON RULES
    // =========================================================
    const closeBtnHTML = '<div class="sh-actions"><button type="button" class="sh-btn alt" data-sh-close>Close</button></div>';

    const RULES = [
        {
            k: "join studenthub",
            html: () => `<div class="sh-ptitle">🎉 Join StudentHub</div>
                <p>Create your account to access your dashboard, events, projects and the student community.</p>
                <div class="sh-actions"><a class="sh-btn" href="Register.html">Register Now</a><a class="sh-btn" href="Login.html">Login</a><button type="button" class="sh-btn alt" data-sh-close>Close</button></div>`
        },
        {
            k: "view milestone report",
            html: () => `<div class="sh-ptitle">📊 Milestone Report</div>
                <ul><li>500+ Active Students</li><li>120+ Projects Submitted</li><li>35+ Events Conducted</li><li>95% Assignment Submission Rate</li></ul>${closeBtnHTML}`
        },
        {
            k: "view emergency guidelines",
            html: () => `<div class="sh-ptitle">🚨 Emergency Guidelines</div>
                <ul><li>Stay calm and inform campus Security immediately.</li><li>Campus Emergency: <b>+91 2697 265011 / 265021</b></li><li>Ambulance: <b>108</b> &nbsp;|&nbsp; Police: <b>100</b> &nbsp;|&nbsp; Fire: <b>101</b></li><li>Do not use the lift during an evacuation.</li></ul>${closeBtnHTML}`
        },
        {
            k: "quick announcement",
            html: () => `<div class="sh-ptitle">📢 Quick Announcement</div>
                <ul><li>The Mid-Semester exam schedule has been published.</li><li>2 assignment deadlines are due this week.</li><li>Tech &amp; Innovation Symposium: 12 August 2026.</li></ul>${closeBtnHTML}`
        },
        {
            k: "event highlights",
            html: () => `<div class="sh-ptitle">💡 Event Highlights</div>
                <ul><li>Keynote address by industry experts</li><li>Student Project Exhibition &amp; Poster Presentations</li><li>Networking Lunch &amp; Interactive Stalls</li><li>Hands-on Coding Workshop &amp; Prize Distribution</li></ul>${closeBtnHTML}`
        },
        {
            k: "edit profile",
            html: () => `<div class="sh-ptitle">✏️ Edit Profile</div>
                <form id="shEditForm" novalidate>
                    <label>Name</label><input id="shName" value="${esc(getName() || "Panvi Patel")}">
                    <label>Email</label><input id="shEmail" type="email" value="${esc(getLabeled("Email"))}">
                    <label>Phone</label><input id="shPhone" value="${esc(getLabeled("Phone"))}">
                    <div class="sh-err" id="shEditErr"></div>
                    <div class="sh-actions"><button type="submit" class="sh-btn">Save</button><button type="button" class="sh-btn alt" data-sh-close>Cancel</button></div>
                </form>`
        },
        {
            k: "register now",
            passIfHref: true,
            html: () => `<div class="sh-ptitle">🎟️ Event Registration</div>
                <p>Want to take part in the Tech &amp; Innovation Symposium? Fill in the registration form to reserve your seat.</p>
                <div class="sh-actions"><a class="sh-btn" href="Event_register.html">Open Registration Form</a><button type="button" class="sh-btn alt" data-sh-close>Not now</button></div>`
        },
        {
            k: "contact support",
            passIfHref: true,
            html: () => `<div class="sh-ptitle">🎧 Contact Support</div>
                <p>Email: <b>support@studenthub.edu</b></p><p>Phone: <b>+91 2697 265011</b></p><p>Hours: Monday – Saturday | 09:00 AM – 05:00 PM</p>
                <div class="sh-actions"><a class="sh-btn" href="Contact.html">Open Contact Page</a><button type="button" class="sh-btn alt" data-sh-close>Close</button></div>`
        },
        { k: "explore dashboard", go: "Dashboard.html" },
        { k: "view profile", go: "Profile.html" },
        { k: "learn more", go: "About.html" }
    ];

    // Sidebar / menu items that have no real link (exact text match)
    const NAV = {
        "dashboard": "Dashboard.html", "home": "Home.html", "profile": "Profile.html",
        "attendance": "Attendance.html", "result": "Result.html", "results": "Result.html",
        "setting": "setting.html", "settings": "setting.html", "events": "Event.html",
        "faq": "FAQ.html", "about": "About.html", "contact": "Contact.html",
        "feedback": "Feedback.html", "login": "Login.html", "register": "Register.html"
    };

    document.addEventListener("click", (e) => {
        const el = e.target.closest("a, button, input[type='button'], .sidebar-item, .sidebar li");
        if (!el || el.closest(".sh-overlay")) return;
        if (el.type === "submit" && el.closest("form")) return;

        const text = norm(el.value || el.textContent);

        // Sidebar active highlight
        const sideItem = el.closest(".sidebar a, .sidebar-item, .sidebar li, .dashboard-menu a");
        if (sideItem) {
            $$(".sidebar a, .sidebar-item, .sidebar li, .dashboard-menu a").forEach((i) => i.classList.remove("active"));
            sideItem.classList.add("active");
        }

        const rule = RULES.find((r) => text.includes(r.k));
        if (rule) {
            if (rule.passIfHref && hasRealHref(el)) return;
            if (rule.go) {
                if (hasRealHref(el)) return;
                e.preventDefault();
                location.href = rule.go;
                return;
            }
            e.preventDefault();
            openPopup(rule.html());
            return;
        }

        // Sidebar / menu navigation fallback
        if (!hasRealHref(el)) {
            if (text === "projects") {
                e.preventDefault();
                openPopup(`<div class="sh-ptitle">💻 Projects</div><p>Your projects will appear here. No projects have been added yet.</p>${closeBtnHTML}`);
                return;
            }
            if (NAV[text] && NAV[text].toLowerCase() !== page) {
                e.preventDefault();
                location.href = NAV[text];
            }
        }
    });

    // Save profile from the Edit Profile popup
    overlay.addEventListener("submit", (e) => {
        if (e.target.id !== "shEditForm") return;
        e.preventDefault();
        const name = $("#shName").value.trim();
        const email = $("#shEmail").value.trim();
        const phone = $("#shPhone").value.trim();
        const err = $("#shEditErr");
        let msg = "";
        if (!name) msg = "Please enter your name.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) msg = "Please enter a valid email address.";
        else if (!/^[+\d\s-]{10,15}$/.test(phone)) msg = "Please enter a valid phone number.";
        if (msg) {
            err.textContent = msg;
            err.style.display = "block";
            return;
        }
        const p = { name, email, phone };
        try { localStorage.setItem("sh-profile", JSON.stringify(p)); } catch (x) { /* ignore */ }
        applyProfile(p);
        closePopup();
        showToast("✅ Profile updated successfully!");
    });

    // =========================================================
    // 10. FAQ ACCORDION (+ / −)
    // =========================================================
    const FAQ_ANSWERS = [
        [/eligibility/i, "To register for a course you need a valid Student ID and the fees of the previous semester must be paid."],
        [/track.*admission|admission application/i, "Log in to the Student Portal and open the 'Admission Status' section on your Dashboard to see the status of your application."],
        [/payment methods/i, "Term fees can be paid using UPI, Net Banking, Debit/Credit Card, or in cash at the campus accounts office."],
        [/fee receipt/i, "After the payment is completed, open the 'Fees' section on your Dashboard and download the receipt as a PDF."],
        [/hostel allotment/i, "Fill in the hostel allotment form on the Student Portal and submit your documents at the Hostel Office. The allotment list will be published on the portal."],
        [/curfew/i, "The hostel curfew time is 9:30 PM. For special permission, approval from the warden is required."],
        [/forget.*password|forgot.*password/i, "Click 'Forgot Password' on the Login page and reset your password using your registered email address."],
        [/upload/i, "Make sure the file is smaller than 5 MB and in PDF or DOCX format. Refresh the page and try again. If it still fails, please contact Support."]
    ];
    const isQ = (el) => /^Q\d+\./.test(el.textContent.trim());
    const faqItems = $$("body *").filter((el) => isQ(el) && !(el.parentElement && isQ(el.parentElement)) && !el.closest(".sh-overlay"));

    faqItems.forEach((item) => {
        let ans = $(".faq-answer, .answer, .accordion-body, .faq-content, .faq-a", item);
        if (!ans && item.nextElementSibling && item.nextElementSibling.matches(".faq-answer, .answer, .accordion-body, .faq-content, .faq-a")) {
            ans = item.nextElementSibling;
        }
        if (!ans) {
            ans = document.createElement("div");
            ans.className = "sh-faq-ans";
            const found = FAQ_ANSWERS.find(([re]) => re.test(item.textContent));
            ans.textContent = found ? found[1] : "Please contact Support for more information.";
            item.insertAdjacentElement("afterend", ans);
        }
        ans.style.display = "none";

        const icon = $$("*", item).find((c) => c.children.length === 0 && /^[+−-]$/.test(c.textContent.trim()));
        item.style.cursor = "pointer";
        item._shAns = ans;
        item._shIcon = icon;

        item.addEventListener("click", (e) => {
            if (ans.contains(e.target)) return;
            const open = ans.style.display === "block";
            faqItems.forEach((o) => {
                if (o._shAns) o._shAns.style.display = "none";
                if (o._shIcon) o._shIcon.textContent = "+";
            });
            if (!open) {
                ans.style.display = "block";
                if (icon) icon.textContent = "−";
            }
        });
    });

    // =========================================================
    // 11. FORM HELPERS
    // =========================================================
    function showFormMessage(form, message, success = true) {
        if (!form) return;
        const old = $(".sh-form-msg", form);
        if (old) old.remove();
        const box = document.createElement("div");
        box.className = "sh-form-msg " + (success ? "ok" : "bad");
        box.textContent = message;
        form.appendChild(box);
    }

    function getErr(input) {
        if (input._shErr) return input._shErr;
        let err = input.id ? document.getElementById(input.id + "Err") : null;
        if (!err) {
            err = document.createElement("div");
            err.className = "sh-err";
            input.insertAdjacentElement("afterend", err);
        }
        input._shErr = err;
        return err;
    }

    function setFieldState(input, ok, message) {
        const err = getErr(input);
        const circle = input.id ? document.getElementById(input.id + "Circle") : null;
        if (ok) {
            input.classList.remove("is-invalid-input");
            input.classList.add("is-valid-input");
            err.style.display = "none";
            err.textContent = "";
            if (circle) { circle.className = "status-circle valid-circle"; circle.textContent = "✓"; }
        } else {
            input.classList.remove("is-valid-input");
            input.classList.add("is-invalid-input");
            err.style.display = "block";
            err.textContent = message;
            if (circle) { circle.className = "status-circle invalid-circle"; circle.textContent = "✗"; }
        }
    }

    function clearFieldState(input) {
        input.classList.remove("is-valid-input", "is-invalid-input");
        const err = getErr(input);
        err.style.display = "none";
        err.textContent = "";
        const circle = input.id ? document.getElementById(input.id + "Circle") : null;
        if (circle) { circle.className = "status-circle"; circle.textContent = ""; }
    }

    // =========================================================
    // 12. REGISTER FORM VALIDATION
    // =========================================================
    let regForm = $("#regForm");
    if (!regForm) {
        regForm = $$("form").find((f) => $("#cpwd", f) || (
            $$("input[type='password']", f).length >= 2 && /register|registration/i.test(f.textContent)));
    }

    if (regForm) {
        const checks = [];
        const addCheck = (el, test, msg) => {
            if (!el) return;
            const run = () => { const ok = test(el); setFieldState(el, ok, msg); return ok; };
            checks.push({ el, run });
            const evt = el.tagName === "SELECT" ? "change" : "input";
            el.addEventListener(evt, () => { if (el.dataset.touched) run(); });
        };

        const g = (id) => document.getElementById(id);
        addCheck(g("studentId"), (el) => el.value.trim() !== "", "Student ID is required.");
        addCheck(g("fname"), (el) => el.value.trim() !== "", "Please enter your first name.");
        addCheck(g("lname"), (el) => el.value.trim() !== "", "Please enter your last name.");
        addCheck(g("email"), (el) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()), "Please enter a valid email address.");
        addCheck(g("phone"), (el) => /^[6-9]\d{9}$/.test(el.value.trim()), "Please enter a valid 10-digit mobile number.");
        addCheck(g("pwd"), (el) => el.value.length >= 6, "Password must be at least 6 characters.");
        addCheck(g("cpwd"), (el) => el.value !== "" && el.value === (g("pwd") ? g("pwd").value : ""), "Passwords do not match.");

        $$("select", regForm).forEach((sel) => {
            const first = sel.options[0] ? sel.options[0].textContent : "";
            const msg = /year/i.test(first) ? "Please select your academic year." : "Please select your course.";
            addCheck(sel, (el) => el.value !== "" && !/^select/i.test(el.options[el.selectedIndex].textContent), msg);
        });

        // Gender radios
        const radios = $$("input[type='radio']", regForm);
        const genderChecks = [];
        new Set(radios.map((r) => r.name).filter(Boolean)).forEach((name) => {
            const group = radios.filter((r) => r.name === name);
            const holder = group[0].closest("label") ? group[0].closest("label").parentElement : group[0].parentElement;
            const err = document.createElement("div");
            err.className = "sh-err";
            holder.insertAdjacentElement("afterend", err);
            const run = () => {
                const ok = group.some((r) => r.checked);
                err.style.display = ok ? "none" : "block";
                err.textContent = ok ? "" : "Please select your gender.";
                return ok;
            };
            group.forEach((r) => r.addEventListener("change", run));
            genderChecks.push(run);
        });

        // Terms checkbox
        const terms = g("terms") || $("input[type='checkbox']", regForm);
        let termsRun = null;
        if (terms) {
            const termsErr = g("termsErr") || (() => {
                const d = document.createElement("div");
                d.className = "sh-err";
                (terms.closest("label") || terms).insertAdjacentElement("afterend", d);
                return d;
            })();
            termsRun = () => {
                const ok = terms.checked;
                termsErr.textContent = ok ? "" : "Please accept the Terms & Conditions.";
                termsErr.style.display = ok ? "none" : "block";
                return ok;
            };
            terms.addEventListener("change", termsRun);
        }

        regForm.addEventListener("submit", (e) => {
            e.preventDefault();
            checks.forEach((c) => { c.el.dataset.touched = "1"; });
            const results = checks.map((c) => c.run());
            genderChecks.forEach((run) => results.push(run()));
            if (termsRun) results.push(termsRun());

            const old = $(".sh-form-msg", regForm);
            if (old) old.remove();

            if (results.every(Boolean)) {
                regForm.reset();
                checks.forEach((c) => { delete c.el.dataset.touched; clearFieldState(c.el); });
                showFormMessage(regForm, "✅ Registration successful! Welcome to StudentHub.", true);
            } else {
                const firstBad = $(".is-invalid-input", regForm);
                if (firstBad) firstBad.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        });
        regForm.dataset.shHandled = "1";
    }

    // =========================================================
    // 13. LOGIN FORM (never confused with the Register form)
    // =========================================================
    let loginForm = $("#loginForm");
    if (!loginForm && !regForm) {
        loginForm = $$("form").find((f) => /login|sign in/i.test(f.textContent) && $("input[type='password']", f));
    }
    if (loginForm && loginForm !== regForm) {
        loginForm.dataset.shHandled = "1";
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const inputs = $$("input[type='text'], input[type='email'], input[type='password'], input[type='number']", loginForm);
            const valid = inputs.length > 0 && inputs.every((i) => i.value.trim() !== "");
            inputs.forEach((i) => { i.style.border = i.value.trim() ? "" : "1px solid #ef4444"; });
            if (!valid) {
                showFormMessage(loginForm, "❌ Please enter your email/username and password.", false);
                return;
            }
            showFormMessage(loginForm, "✅ Login successful! Welcome back to StudentHub.", true);
        });
    }

    // =========================================================
    // 14. PASSWORD UPDATE FORM (setting page)
    // =========================================================
    let passwordForm = $("#passwordForm");
    if (!passwordForm) {
        passwordForm = $$("form").find((f) => f !== regForm && f !== loginForm &&
            $$("input[type='password']", f).length >= 2 && /update password|change password|new password/i.test(f.textContent));
    }
    if (passwordForm) {
        passwordForm.dataset.shHandled = "1";
        passwordForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const pw = $$("input[type='password']", passwordForm);
            let msg = "";
            if (pw.some((i) => !i.value.trim())) {
                msg = "❌ Please fill in all password fields.";
            } else {
                const newPw = pw[pw.length - 2].value;
                const confirmPw = pw[pw.length - 1].value;
                if (newPw.length < 6) msg = "❌ New password must be at least 6 characters.";
                else if (newPw !== confirmPw) msg = "❌ New password and confirm password do not match.";
            }
            if (msg) { showFormMessage(passwordForm, msg, false); return; }
            showFormMessage(passwordForm, "✅ Password updated successfully!", true);
            passwordForm.reset();
        });
    }

    // =========================================================
    // 15. OTHER FORMS (Feedback / Contact / Event register ...)
    // =========================================================
    $$("form").forEach((form) => {
        if (form.dataset.shHandled || form.id === "shEditForm" || form.closest(".sh-overlay")) return;

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let valid = true;

            const fields = $$("input:not([type='hidden']):not([type='submit']):not([type='button']):not([type='checkbox']):not([type='radio']):not([type='file']), textarea, select", form);
            fields.forEach((f) => {
                if (f.disabled || f.hasAttribute("data-optional")) return;
                let bad = f.value.trim() === "";
                if (!bad && f.type === "email") bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim());
                if (!bad && f.tagName === "SELECT" && f.selectedIndex === 0 && /^select|^choose/i.test(f.options[0].textContent)) bad = true;
                f.style.border = bad ? "1px solid #ef4444" : "";
                if (bad) valid = false;
            });

            const radios = $$("input[type='radio']", form);
            new Set(radios.map((r) => r.name).filter(Boolean)).forEach((name) => {
                if (!form.querySelector(`input[name="${name}"]:checked`)) valid = false;
            });
            $$("input[type='checkbox'][required]", form).forEach((c) => { if (!c.checked) valid = false; });

            if (!valid) {
                showFormMessage(form, "❌ Please fill in all required fields!", false);
                return;
            }

            const t = (page + " " + form.textContent).toLowerCase();
            let okMsg = "✅ Form submitted successfully!";
            if (t.includes("feedback")) okMsg = "✅ Feedback submitted successfully! Thank you.";
            else if (t.includes("event_register") || t.includes("event")) okMsg = "✅ Event registration successful!";
            else if (t.includes("contact")) okMsg = "✅ Your message has been sent. We will contact you soon.";

            showFormMessage(form, okMsg, true);
            form.reset();
        });
    });

    // =========================================================
    // 16. LISTING ENGINE (Events + Student Profiles)
    //     Replaces "Loading..." with data; search, filter, sort, pagination
    // =========================================================
    function findLeaf(re) {
        return $$("body *").find((el) => el.children.length === 0 && re.test(el.textContent) && !el.closest(".sh-overlay"));
    }

    function setupListing(cfg) {
        const leaf = findLeaf(cfg.loadRe);
        if (!leaf) return;

        let loader = leaf;
        const core = (s) => s.replace(/[^a-z]/gi, "").toLowerCase();
        while (loader.parentElement && core(loader.parentElement.textContent) === core(loader.textContent)) {
            loader = loader.parentElement;
        }

        let sec = loader;
        while (sec && !($("input", sec) && $("select", sec))) sec = sec.parentElement;
        if (!sec) sec = loader.parentElement;

        const search = $$("input", sec).find((i) => !["checkbox", "radio", "button", "submit"].includes(i.type));
        const selects = $$("select", sec);
        const catSel = selects[0] || null;
        const sortSel = selects[1] || null;
        const prevB = $$("button, a", sec).find((b) => /previous/i.test(b.textContent));
        const nextB = $$("button, a", sec).find((b) => /next/i.test(b.textContent));
        const pageLabel = $$("*", sec).find((el) => el.children.length === 0 && /^\s*Page\s*\d+/i.test(el.textContent));

        // Fill select options (keep the first placeholder option)
        const fill = (sel, opts) => {
            if (!sel) return;
            while (sel.options.length > 1) sel.remove(1);
            sel.options[0].value = "";
            opts.forEach((o) => {
                const op = document.createElement("option");
                op.value = o;
                op.textContent = o;
                sel.appendChild(op);
            });
        };
        fill(catSel, cfg.cats);
        fill(sortSel, Object.keys(cfg.sorts));

        const list = document.createElement("div");
        list.className = cfg.listClass + " sh-grid";
        loader.style.display = "none";
        loader.insertAdjacentElement("beforebegin", list);

        const perPage = nextB ? cfg.perPage : 9999;
        let pageNo = 1;

        const render = () => {
            const q = search ? search.value.toLowerCase().trim() : "";
            const cat = catSel ? catSel.value : "";
            const sortKey = sortSel ? sortSel.value : "";

            let arr = cfg.items.filter((it) =>
                cfg.text(it).toLowerCase().includes(q) && (cat === "" || cfg.cat(it) === cat));
            if (sortKey && cfg.sorts[sortKey]) arr = arr.slice().sort(cfg.sorts[sortKey]);

            const totalPages = Math.max(1, Math.ceil(arr.length / perPage));
            if (pageNo > totalPages) pageNo = totalPages;
            const slice = arr.slice((pageNo - 1) * perPage, pageNo * perPage);

            list.innerHTML = slice.length ? slice.map(cfg.card).join("") : '<div class="sh-empty">😕 No results found.</div>';

            if (pageLabel) pageLabel.textContent = "Page " + pageNo;
            const setDis = (b, d) => { if (b) { b.disabled = d; b.style.opacity = d ? ".5" : ""; b.style.pointerEvents = d ? "none" : ""; } };
            setDis(prevB, pageNo <= 1);
            setDis(nextB, pageNo >= totalPages);

            if (document.body.classList.contains("dark-mode")) tagDark();
        };

        if (search) search.addEventListener("input", () => { pageNo = 1; render(); });
        if (catSel) catSel.addEventListener("change", () => { pageNo = 1; render(); });
        if (sortSel) sortSel.addEventListener("change", () => { pageNo = 1; render(); });
        if (prevB) prevB.addEventListener("click", (e) => { e.preventDefault(); if (pageNo > 1) { pageNo--; render(); } });
        if (nextB) nextB.addEventListener("click", (e) => { e.preventDefault(); pageNo++; render(); });

        setTimeout(render, 400); // brief "Loading" then the data appears
    }

    // ---------- EVENTS ----------
    const EVENTS = [
        { title: "Tech & Innovation Symposium", iso: "2026-08-12", date: "August 12, 2026", cat: "Technical", venue: "University Main Auditorium", desc: "Flagship event with keynotes, project demos and coding workshops." },
        { title: "Web Dev Hackathon 2026", iso: "2026-09-05", date: "September 05, 2026", cat: "Competition", venue: "Computer Lab Block A", desc: "Build modern web apps in 24 hours and win exciting prizes." },
        { title: "Alumni Meet & Campus Connect", iso: "2026-10-18", date: "October 18, 2026", cat: "Networking", venue: "Seminar Hall", desc: "Interact with senior engineers and alumni of the campus." },
        { title: "Annual Cultural Fest", iso: "2026-11-14", date: "November 14, 2026", cat: "Cultural", venue: "Open Air Theatre", desc: "Music, dance, drama and food stalls for the whole campus." },
        { title: "Inter-College Sports Meet", iso: "2026-11-28", date: "November 28, 2026", cat: "Sports", venue: "University Ground", desc: "Cricket, volleyball, kabaddi and athletics competitions." },
        { title: "AI & Machine Learning Workshop", iso: "2026-12-03", date: "December 03, 2026", cat: "Workshop", venue: "Lab 204", desc: "Hands-on workshop on Python, ML models and real datasets." },
        { title: "Career Guidance Seminar", iso: "2026-12-10", date: "December 10, 2026", cat: "Seminar", venue: "Main Auditorium", desc: "Industry mentors guide you on placements and higher studies." },
        { title: "Robotics Challenge", iso: "2027-01-15", date: "January 15, 2027", cat: "Competition", venue: "Mechanical Workshop", desc: "Design and run your robot through the obstacle course." },
        { title: "Photography Contest", iso: "2027-01-22", date: "January 22, 2027", cat: "Cultural", venue: "Art Gallery", desc: "Capture campus life and win the best photographer award." },
        { title: "Cyber Security Awareness Day", iso: "2027-02-05", date: "February 05, 2027", cat: "Seminar", venue: "Seminar Hall", desc: "Learn how to stay safe online with live demonstrations." }
    ];

    setupListing({
        loadRe: /loading events/i,
        items: EVENTS,
        listClass: "events-container",
        perPage: 6,
        cats: ["Technical", "Competition", "Networking", "Cultural", "Sports", "Workshop", "Seminar"],
        text: (e) => `${e.title} ${e.cat} ${e.venue} ${e.desc} ${e.date}`,
        cat: (e) => e.cat,
        sorts: {
            "Name (A–Z)": (a, b) => a.title.localeCompare(b.title),
            "Name (Z–A)": (a, b) => b.title.localeCompare(a.title),
            "Date (Oldest first)": (a, b) => a.iso.localeCompare(b.iso),
            "Date (Newest first)": (a, b) => b.iso.localeCompare(a.iso)
        },
        card: (e) => `<div class="sh-card event-card" data-category="${esc(e.cat.toLowerCase())}">
            <div class="sh-card-top"><div class="sh-title">${esc(e.title)}</div><span class="sh-tag">${esc(e.cat)}</span></div>
            <div class="sh-meta">📅 ${esc(e.date)} &nbsp;·&nbsp; 📍 ${esc(e.venue)}</div>
            <div class="sh-meta">${esc(e.desc)}</div>
            <a class="sh-link" href="Event_register.html">Register →</a></div>`
    });

    // ---------- STUDENT PROFILES ----------
    const STUDENTS = [
        { name: "Panvi Patel", id: "25CS075", course: "Computer Science & Engineering", sem: 3 },
        { name: "Prachi Sharma", id: "25CS076", course: "Computer Science & Engineering", sem: 3 },
        { name: "Aarav Mehta", id: "25IT012", course: "Information Technology", sem: 3 },
        { name: "Riya Desai", id: "25IT034", course: "Information Technology", sem: 3 },
        { name: "Kunal Shah", id: "25EC021", course: "Electronics & Communication", sem: 3 },
        { name: "Meera Joshi", id: "25EC048", course: "Electronics & Communication", sem: 3 },
        { name: "Dev Parmar", id: "25ME015", course: "Mechanical Engineering", sem: 3 },
        { name: "Sneha Trivedi", id: "25CE027", course: "Civil Engineering", sem: 3 }
    ];

    setupListing({
        loadRe: /loading student profiles/i,
        items: STUDENTS,
        listClass: "students-container",
        perPage: 9999,
        cats: ["Computer Science & Engineering", "Information Technology", "Electronics & Communication", "Mechanical Engineering", "Civil Engineering"],
        text: (s) => `${s.name} ${s.id} ${s.course}`,
        cat: (s) => s.course,
        sorts: {
            "Name (A–Z)": (a, b) => a.name.localeCompare(b.name),
            "Name (Z–A)": (a, b) => b.name.localeCompare(a.name),
            "Student ID": (a, b) => a.id.localeCompare(b.id)
        },
        card: (s) => `<div class="sh-card sh-student-card student-card">
            <div class="sh-avatar">${esc(s.name.charAt(0))}</div>
            <div>
                <div class="sh-title">${esc(s.name)}</div>
                <div class="sh-meta">ID: ${esc(s.id)} &nbsp;·&nbsp; Semester ${s.sem}</div>
                <div class="sh-meta">${esc(s.course)}</div>
            </div></div>`
    });

    // =========================================================
    // 17. ESC KEY closes popups / menus
    // =========================================================
    document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;
        closePopup();
        $$("#customModal, #milestoneModal, #emergencyModal, #announcementModal, #joinModal").forEach((m) => {
            m.style.display = "none";
        });
        if (navLinks) navLinks.classList.remove("show", "sh-nav-open");
    });

});