const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll("#navLinks a").forEach(function (link) {

        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
        });

    });
}

const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

    if (themeBtn) {
        themeBtn.textContent = "☀️";
    }

}


if (themeBtn) {

    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");
            themeBtn.textContent = "☀️";

        } else {

            localStorage.setItem("theme", "light");
            themeBtn.textContent = "🌙";

        }

    });

}


const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const subject =
            document.getElementById("subject").value.trim();

        const message =
            document.getElementById("message").value.trim();


        if (!name || !email || !subject || !message) {

            formMessage.textContent =
                "Please fill in all fields.";

            formMessage.style.color = "red";

            return;

        }


        const newMessage = {

            id: Date.now(),

            name: name,

            email: email,

            subject: subject,

            message: message,

            date: new Date().toLocaleString()

        };


        let messages =
            JSON.parse(
                localStorage.getItem("contactMessages")
            ) || [];


        messages.push(newMessage);


        localStorage.setItem(
            "contactMessages",
            JSON.stringify(messages)
        );


        formMessage.textContent =
            "Message saved successfully!";

        formMessage.style.color = "green";


        contactForm.reset();

    });

}


function getMessages() {

    return JSON.parse(
        localStorage.getItem("contactMessages")
    ) || [];

}


function displayMessages() {

    const table =
        document.getElementById("messageTable");

    const totalMessages =
        document.getElementById("totalMessages");

    const emptyMessage =
        document.getElementById("emptyMessage");


    if (!table || !totalMessages || !emptyMessage) {
        return;
    }


    const messages = getMessages();


    table.innerHTML = "";


    totalMessages.textContent =
        messages.length;


    if (messages.length === 0) {

        emptyMessage.style.display = "block";

        return;

    }


    emptyMessage.style.display = "none";


    messages.forEach(function (message) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${escapeHTML(message.name)}
            </td>

            <td>
                ${escapeHTML(message.email)}
            </td>

            <td>
                ${escapeHTML(message.subject)}
            </td>

            <td>
                ${escapeHTML(message.message)}
            </td>

            <td>
                ${escapeHTML(message.date)}
            </td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteMessage(${message.id})">

                    Delete

                </button>

            </td>

        `;


        table.appendChild(row);

    });

}


/* Delete Individual Message */

function deleteMessage(id) {

    let messages = getMessages();


    messages =
        messages.filter(function (message) {

            return message.id !== id;

        });


    localStorage.setItem(
        "contactMessages",
        JSON.stringify(messages)
    );


    displayMessages();

}


const clearMessages =
    document.getElementById("clearMessages");


if (clearMessages) {

    clearMessages.addEventListener(
        "click",
        function () {

            const confirmDelete =
                confirm(
                    "Are you sure you want to delete all messages?"
                );


            if (!confirmDelete) {
                return;
            }


            localStorage.removeItem(
                "contactMessages"
            );


            displayMessages();

        }
    );

}


const loginForm =
    document.getElementById("loginForm");

const loginPage =
    document.getElementById("loginPage");

const adminPage =
    document.getElementById("adminPage");

const loginMessage =
    document.getElementById("loginMessage");


const ADMIN_USERNAME = "admin";

const ADMIN_PASSWORD = "admin123";


if (loginForm) {

    if (
        localStorage.getItem("adminLoggedIn")
        === "true"
    ) {

        loginPage.style.display = "none";

        adminPage.style.display = "block";

        displayMessages();

    }


    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const username =
                document
                    .getElementById("username")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("password")
                    .value;


            if (
                username === ADMIN_USERNAME &&
                password === ADMIN_PASSWORD
            ) {

                localStorage.setItem(
                    "adminLoggedIn",
                    "true"
                );


                loginPage.style.display =
                    "none";


                adminPage.style.display =
                    "block";


                loginMessage.textContent = "";


                loginForm.reset();


                displayMessages();

            } else {

                loginMessage.textContent =
                    "Invalid username or password.";

                loginMessage.style.color =
                    "red";

            }

        }
    );

}

const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "adminLoggedIn"
            );


            window.location.href =
                "admin.html";

        }
    );

}



function escapeHTML(value) {

    const div =
        document.createElement("div");


    div.textContent = value;


    return div.innerHTML;

}


displayMessages();