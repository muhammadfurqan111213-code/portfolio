// ==========================================
// Admin Dashboard
// ==========================================

const STORAGE_KEY = "portfolioData";


// ==========================================
// Default Data
// ==========================================

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
            id: Date.now(),
            title: "Frontend Developer",
            company: "ABC Software House",
            date: "2024 - Present",
            description: "Developing responsive websites and interactive user interfaces."
        }
    ]
};


// ==========================================
// Get Portfolio Data
// ==========================================

function getData() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(defaultData)
        );

        return defaultData;
    }

    return JSON.parse(data);
}


// ==========================================
// Save Portfolio Data
// ==========================================

function saveData(data) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

    showToast("Data saved successfully!");

}


// ==========================================
// Elements
// ==========================================

const profileForm =
    document.getElementById("profileForm");

const experienceForm =
    document.getElementById("experienceForm");

const experienceList =
    document.getElementById("experienceList");

const modal =
    document.getElementById("experienceModal");

const addExperienceBtn =
    document.getElementById("addExperienceBtn");

const closeModal =
    document.getElementById("closeModal");

const modalTitle =
    document.getElementById("modalTitle");

const toast =
    document.getElementById("toast");


// ==========================================
// Load Profile
// ==========================================

function loadProfile() {

    const data = getData();

    document.getElementById("name").value =
        data.name;

    document.getElementById("role").value =
        data.role;

    document.getElementById("bio").value =
        data.bio;

    document.getElementById("about").value =
        data.about;

    document.getElementById("skills").value =
        data.skills.join(", ");

    document.getElementById("email").value =
        data.contact.email;

    document.getElementById("phone").value =
        data.contact.phone;

    document.getElementById("location").value =
        data.contact.location;
}


// ==========================================
// Save Profile
// ==========================================

profileForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const data = getData();


    data.name =
        document.getElementById("name").value.trim();

    data.role =
        document.getElementById("role").value.trim();

    data.bio =
        document.getElementById("bio").value.trim();

    data.about =
        document.getElementById("about").value.trim();


    data.skills =
        document
            .getElementById("skills")
            .value
            .split(",")
            .map(skill => skill.trim())
            .filter(skill => skill !== "");


    data.contact.email =
        document.getElementById("email").value.trim();

    data.contact.phone =
        document.getElementById("phone").value.trim();

    data.contact.location =
        document.getElementById("location").value.trim();


    saveData(data);

    updateStats();

});


// ==========================================
// Render Experiences
// ==========================================

function renderExperiences() {

    const data = getData();

    experienceList.innerHTML = "";


    if (data.experiences.length === 0) {

        experienceList.innerHTML = `
            <p style="color:#6b7280">
                No experience added yet.
            </p>
        `;

        return;
    }


    data.experiences.forEach(exp => {

        const card =
            document.createElement("div");

        card.className =
            "experience-admin-card";


        card.innerHTML = `

            <div class="experience-admin-info">

                <h3>
                    ${escapeHTML(exp.title)}
                </h3>

                <h4>
                    ${escapeHTML(exp.company)}
                </h4>

                <span>
                    ${escapeHTML(exp.date)}
                </span>

                <p>
                    ${escapeHTML(exp.description)}
                </p>

            </div>


            <div class="actions">

                <button
                    class="edit-btn"
                    onclick="editExperience(${exp.id})"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteExperience(${exp.id})"
                >
                    Delete
                </button>

            </div>
        `;


        experienceList.appendChild(card);

    });

}


// ==========================================
// Open Add Modal
// ==========================================

addExperienceBtn.addEventListener(
    "click",
    function () {

        modalTitle.textContent =
            "Add Experience";

        experienceForm.reset();

        document.getElementById(
            "experienceId"
        ).value = "";

        modal.classList.add("active");

    }
);


// ==========================================
// Close Modal
// ==========================================

closeModal.addEventListener(
    "click",
    function () {

        modal.classList.remove("active");

    }
);


// Close modal when clicking outside

modal.addEventListener("click", function (e) {

    if (e.target === modal) {

        modal.classList.remove("active");

    }

});


// ==========================================
// Save Experience
// ==========================================

experienceForm.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();

        const data = getData();


        const id =
            document.getElementById(
                "experienceId"
            ).value;


        const experience = {

            id: id
                ? Number(id)
                : Date.now(),

            title:
                document.getElementById(
                    "experienceTitle"
                ).value.trim(),

            company:
                document.getElementById(
                    "experienceCompany"
                ).value.trim(),

            date:
                document.getElementById(
                    "experienceDate"
                ).value.trim(),

            description:
                document.getElementById(
                    "experienceDescription"
                ).value.trim()
        };


        // Update existing

        if (id) {

            data.experiences =
                data.experiences.map(item => {

                    if (item.id === Number(id)) {
                        return experience;
                    }

                    return item;

                });

        }

        // Add new

        else {

            data.experiences.push(
                experience
            );

        }


        saveData(data);

        renderExperiences();

        updateStats();

        modal.classList.remove("active");

        experienceForm.reset();

    }
);


// ==========================================
// Edit Experience
// ==========================================

function editExperience(id) {

    const data = getData();

    const experience =
        data.experiences.find(
            item => item.id === id
        );


    if (!experience) return;


    modalTitle.textContent =
        "Edit Experience";


    document.getElementById(
        "experienceId"
    ).value = experience.id;


    document.getElementById(
        "experienceTitle"
    ).value = experience.title;


    document.getElementById(
        "experienceCompany"
    ).value = experience.company;


    document.getElementById(
        "experienceDate"
    ).value = experience.date;


    document.getElementById(
        "experienceDescription"
    ).value = experience.description;


    modal.classList.add("active");
}


// ==========================================
// Delete Experience
// ==========================================

function deleteExperience(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this experience?"
        );


    if (!confirmDelete) {
        return;
    }


    const data = getData();


    data.experiences =
        data.experiences.filter(
            item => item.id !== id
        );


    saveData(data);

    renderExperiences();

    updateStats();

}


// ==========================================
// Statistics
// ==========================================

function updateStats() {

    const data = getData();

    document.getElementById(
        "experienceCount"
    ).textContent =
        data.experiences.length;


    document.getElementById(
        "skillCount"
    ).textContent =
        data.skills.length;

}


// ==========================================
// Toast
// ==========================================

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


// ==========================================
// HTML Escape
// ==========================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}


// ==========================================
// Initial Load
// ==========================================

loadProfile();

renderExperiences();

updateStats();
