// ========================================
// Portfolio LocalStorage
// ========================================

const defaultData = {
    name: "Your Name",
    role: "Frontend Developer",
    bio: "I build clean, responsive and user-friendly websites using modern web technologies.",

    about: "I'm a passionate developer focused on creating modern and responsive web experiences.",

    skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "Responsive Design"
    ],

    contact: {
        email: "example@email.com",
        phone: "+92 300 0000000",
        location: "Pakistan"
    },

    experiences: [
        {
            id: 1,
            title: "Frontend Developer",
            company: "ABC Software House",
            date: "2024 - Present",
            description: "Developing responsive websites and interactive user interfaces using HTML, CSS and JavaScript."
        },
        {
            id: 2,
            title: "Junior Web Developer",
            company: "XYZ Agency",
            date: "2023 - 2024",
            description: "Worked on website development, bug fixing and responsive UI implementation."
        }
    ]
};


// ----------------------------------------
// Get data from localStorage
// ----------------------------------------

function getPortfolioData() {
    const savedData = localStorage.getItem("portfolioData");

    if (savedData) {
        return JSON.parse(savedData);
    }

    localStorage.setItem(
        "portfolioData",
        JSON.stringify(defaultData)
    );

    return defaultData;
}


// ----------------------------------------
// Render Portfolio
// ----------------------------------------

function renderPortfolio() {

    const data = getPortfolioData();

    // Hero
    document.getElementById("heroName").textContent = data.name;
    document.getElementById("heroRole").textContent = data.role;
    document.getElementById("heroBio").textContent = data.bio;

    // About
    document.getElementById("aboutText").textContent = data.about;

    // Skills
    const skillsContainer =
        document.getElementById("skillsContainer");

    skillsContainer.innerHTML = "";

    data.skills.forEach(skill => {

        const span = document.createElement("span");

        span.textContent = skill;

        skillsContainer.appendChild(span);
    });


    // Contact
    document.getElementById("contactEmail").textContent =
        data.contact.email;

    document.getElementById("contactPhone").textContent =
        data.contact.phone;

    document.getElementById("contactLocation").textContent =
        data.contact.location;


    // Experience
    const experienceContainer =
        document.getElementById("experienceContainer");

    experienceContainer.innerHTML = "";

    if (data.experiences.length === 0) {

        experienceContainer.innerHTML = `
            <p>No experience added yet.</p>
        `;

        return;
    }

    data.experiences.forEach(exp => {

        const card = document.createElement("div");

        card.className = "experience-card";

        card.innerHTML = `
            <div class="experience-date">
                ${escapeHTML(exp.date)}
            </div>

            <h3>
                ${escapeHTML(exp.title)}
            </h3>

            <h4>
                ${escapeHTML(exp.company)}
            </h4>

            <p>
                ${escapeHTML(exp.description)}
            </p>
        `;

        experienceContainer.appendChild(card);
    });
}


// ----------------------------------------
// Basic HTML escaping
// ----------------------------------------

function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}


// ----------------------------------------
// Mobile Navbar
// ----------------------------------------

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


// Close mobile menu after clicking link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


// ----------------------------------------
// Contact form demo
// ----------------------------------------

const contactForm =
    document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    alert("Message submitted successfully!");

    contactForm.reset();

});


// ----------------------------------------
// Footer Year
// ----------------------------------------

document.getElementById("year").textContent =
    new Date().getFullYear();


// ----------------------------------------
// Initial render
// ----------------------------------------

renderPortfolio();
