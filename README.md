# 🎓 StudentHub — Unified Campus Administration & Student Engagement Portal

> An all-in-one, responsive web platform engineered to modernize academic workflows, streamline student record administration, centralize campus event participations, and deliver real-time data insights.

---

## 📌 About The Project

**StudentHub** is designed to replace fragmented campus tools and traditional paper systems with a single, synchronized web application. The platform provides students and administrative staff with intuitive, role-based workflows to manage identities, academic details, extracurricular registrations, and secure document archives in real time.

---

## ✨ Key System Highlights

### 🔐 1. Authentication & Identity Protection
* **Secure Onboarding**: Form-validated registration with auto-detection of existing users and structured profile initialization.
* **Session Persistence**: Guarded authentication layer that tracks user sessions and prevents unauthorized direct URL access.
* **Password Hashing**: Irreversible, salt-backed Bcrypt encryption for all stored credentials (`password_hash` & `password_verify`).

### 📊 2. Dynamic Student Dashboard
* **Profile Management**: Instant viewing and editing of academic standings, contact numbers, and personal details.
* **Live AJAX Directory Search**: Real-time record filtering without full page refreshes.
* **Secure Media Uploads**: Built-in upload system for profile photos and verification documents with MIME-type validation and server-side file sanitization.

### 🎪 3. Campus Event Management System
* **Event Exploration**: Interactive catalog displaying upcoming workshops, guest lectures, technical hackathons, and cultural fests.
* **Self-Service Registration**: One-click event enrollment with automatic seat allocation and duplicate entry prevention.
* **Attendance Rosters**: Dedicated dashboards for event organizers to view enrolled students and manage participant rosters.

### ⚙️ 4. Data Administration & Utilities (CRUD Suite)
* **Comprehensive Record Operations**: Full Create, Read, Update, and Delete actions connected directly to relational MySQL tables.
* **Data Portability**: Built-in CSV report generator for exporting student lists, departmental records, and event attendees for offline reporting.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | HTML5, CSS3 (Modern Flexbox & Responsive Grid), JavaScript (ES6+) |
| **Backend** | PHP 8.x (Modular Architecture) |
| **Database** | MySQL / MariaDB Relational Database |
| **Local Server** | Apache (XAMPP Environment) |
| **Version Control** | Git & GitHub |

---

## 🚀 Quick Setup & Installation Guide

Follow these simple steps to run StudentHub locally on your computer:

### 1. Prerequisites
* Install [XAMPP](https://www.apachefriends.org/) (ensure Apache and MySQL services are running).
* Git installed on your system.

### 2. Clone Repository
git clone https://github.com/Panvi-2801/StudentHub.git
