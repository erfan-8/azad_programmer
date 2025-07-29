document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    const userProfileDiv = document.querySelector('.user-profile');
    const loginBtn = document.querySelector('.auth-buttons .btn-primary');
    const registerBtn = document.querySelector('.auth-buttons .btn-secondary');

    // --- Toggle mobile navigation ---
    if (hamburger && navLinks && authButtons) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Ensure auth buttons also toggle correctly in mobile
            // If user is logged in, show user-profile, otherwise show login/register
            if (authButtons.classList.contains('logged-in')) {
                 authButtons.classList.toggle('active');
                 // Only toggle user profile visibility if authButtons are active
                 if (authButtons.classList.contains('active')) {
                    userProfileDiv.style.display = 'flex';
                 } else {
                    userProfileDiv.style.display = 'none';
                 }
            } else {
                authButtons.classList.toggle('active');
            }
        });
    }

    // --- User Authentication UI Simulation ---
    // Function to update UI based on login status
    function updateAuthUI(isLoggedIn) {
        if (isLoggedIn) {
            loginBtn.classList.add('hidden');
            registerBtn.classList.add('hidden');
            userProfileDiv.classList.remove('hidden');
            authButtons.classList.add('logged-in'); // Add class for CSS to hide btns
        } else {
            loginBtn.classList.remove('hidden');
            registerBtn.classList.remove('hidden');
            userProfileDiv.classList.add('hidden');
            authButtons.classList.remove('logged-in'); // Remove class
        }
    }

    // Simulate login when login button is clicked
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('شما با موفقیت وارد شدید! (این فقط یک شبیه‌سازی فرانت‌اند است)');
            updateAuthUI(true); // Set user as logged in
            // Optional: Redirect to profile page after "login"
            // window.location.href = "profile.html";
        });
    }

    // Simulate logout (you would integrate this with an actual logout button in your profile dropdown or profile page)
    const logoutLink = document.querySelector('.profile-dropdown a[href="#"]'); // Example: Assuming a logout link with href="#"
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('شما از حساب کاربری خود خارج شدید.');
            updateAuthUI(false); // Set user as logged out
            window.location.href = "index.html"; // Redirect to home
        });
    }

    // Initial check: if localStorage has a 'loggedIn' flag (for persistence across refreshes)
    // For a real application, this would involve checking a token or session from backend
    const isLoggedInInitially = localStorage.getItem('isLoggedIn') === 'true';
    updateAuthUI(isLoggedInInitially);

    // Persist login state (for demo purposes)
    if (loginBtn) { // Re-attach event listener if it was removed
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('شما با موفقیت وارد شدید! (این فقط یک شبیه‌سازی فرانت‌اند است)');
            localStorage.setItem('isLoggedIn', 'true');
            updateAuthUI(true);
        });
    }
    // Handle logout from dropdown
    const profileDropdownLogout = document.querySelector('.profile-dropdown a[href="#"]');
    if (profileDropdownLogout) {
        profileDropdownLogout.addEventListener('click', (e) => {
            e.preventDefault();
            alert('شما از حساب کاربری خود خارج شدید.');
            localStorage.setItem('isLoggedIn', 'false');
            updateAuthUI(false);
            window.location.href = "index.html";
        });
    }

    // --- Profile Sidebar Navigation (for profile.html) ---
    // This logic needs to be in profile.html script tag or included after its elements are loaded
    // but putting it here for completeness. Ensure it runs only on profile page.
    if (document.body.classList.contains('profile-page')) { // Add a class to body of profile.html
        const sidebarLinks = document.querySelectorAll('.profile-sidebar-nav a');
        const profileSections = document.querySelectorAll('.profile-section');

        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default anchor jump

                sidebarLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                profileSections.forEach(section => {
                    section.style.display = 'none'; // Hide all sections
                });

                if (targetSection) {
                    targetSection.style.display = 'block'; // Show target section
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Set initial active state and display for the first section
        // Check if there's a hash in the URL to determine initial active section
        const initialHash = window.location.hash || '#dashboard';
        const initialLink = document.querySelector(`.profile-sidebar-nav a[href="${initialHash}"]`);
        if (initialLink) {
            initialLink.click();
        } else {
            document.querySelector('.profile-sidebar-nav a[href="#dashboard"]').click();
        }
    }


    // --- Contest Tabs Logic (for contests.html) ---
    if (document.body.classList.contains('contests-page')) { // Add a class to body of contests.html
        const tabs = document.querySelectorAll('.contest-tabs button');
        const contestCards = document.querySelectorAll('.contest-card');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const filter = tab.dataset.tab;

                contestCards.forEach(card => {
                    const status = card.dataset.status;
                    if (filter === 'all' || status === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
        document.querySelector('.contest-tabs button[data-tab="active"]').click(); // Default to active
    }

    // --- Project Filters Logic (for projects.html) ---
    if (document.body.classList.contains('projects-page')) { // Add a class to body of projects.html
        const filterCategory = document.getElementById('filter-category');
        const filterStatus = document.getElementById('filter-status');
        const projectCards = document.querySelectorAll('.project-card');

        function filterProjects() {
            const selectedCategory = filterCategory.value;
            const selectedStatus = filterStatus.value;

            projectCards.forEach(card => {
                const cardCategory = card.dataset.category;
                const cardStatus = card.dataset.status;

                const categoryMatch = (selectedCategory === 'all' || selectedCategory === cardCategory);
                const statusMatch = (selectedStatus === 'all' || selectedStatus === cardStatus);

                if (categoryMatch && statusMatch) {
                    card.style.display = 'flex'; // Use flex to maintain card layout
                } else {
                    card.style.display = 'none';
                }
            });
        }

        filterCategory.addEventListener('change', filterProjects);
        filterStatus.addEventListener('change', filterProjects);
        filterProjects(); // Initial filter
    }
        // --- Roadmap Page Logic (for roadmap.html) ---
    if (document.body.classList.contains('roadmap-page')) {
        const fieldCards = document.querySelectorAll('.field-card');
        const roadmapSections = document.querySelectorAll('.roadmap-section');
        const defaultMessage = document.getElementById('default-message');

        fieldCards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove 'active' class from all field cards
                fieldCards.forEach(fc => fc.classList.remove('active'));
                // Add 'active' class to the clicked card
                card.classList.add('active');

                // Hide default message
                defaultMessage.classList.add('hidden');

                // Hide all roadmap sections
                roadmapSections.forEach(rs => rs.classList.add('hidden'));

                // Show the selected roadmap section
                const selectedField = card.dataset.field; // e.g., 'frontend', 'backend'
                const targetRoadmap = document.getElementById(`roadmap-${selectedField}`);
                if (targetRoadmap) {
                    targetRoadmap.classList.remove('hidden');
                    // Optional: Scroll to the roadmap section
                    targetRoadmap.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
                }
            });
        });
    }

    // --- Dark Mode Toggle Logic ---
    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        // Function to set the theme based on user preference or system setting
        function applyTheme(theme) {
            if (theme === 'dark') {
                document.body.classList.add('dark-mode');
                themeToggle.querySelector('i').classList.remove('fa-moon');
                themeToggle.querySelector('i').classList.add('fa-sun');
            } else {
                document.body.classList.remove('dark-mode');
                themeToggle.querySelector('i').classList.remove('fa-sun');
                themeToggle.querySelector('i').classList.add('fa-moon');
            }
        }

        // Check for saved theme in localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            // Check for system preference (prefers-color-scheme)
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                applyTheme('dark');
            } else {
                applyTheme('light');
            }
        }

        // Event listener for the theme toggle button
        themeToggle.addEventListener('click', () => {
            if (document.body.classList.contains('dark-mode')) {
                applyTheme('light');
                localStorage.setItem('theme', 'light');
            } else {
                applyTheme('dark');
                localStorage.setItem('theme', 'dark');
            }
        });

        // Listen for system theme changes (if user changes OS theme while site is open)
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (!localStorage.getItem('theme')) { // Only apply system preference if no manual theme is set
                if (event.matches) {
                    applyTheme('dark');
                } else {
                    applyTheme('light');
                }
            }
        });
    }

}); // این خط انتهایی برای document.addEventListener('DOMContentLoaded', () => { است
    // مطمئن شوید که کد جدید را قبل از این خط اضافه کنید.
// Ensure the general script.js logic for header/auth still runs
// (This would be at the top of your script.js file)
// ... (Your existing header/auth/mobile menu logic here) ...

