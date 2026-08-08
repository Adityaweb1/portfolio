// =====================================================
// REDUCED MOTION
// =====================================================

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


// =====================================================
// SCROLL REVEAL
// =====================================================

const revealEls = document.querySelectorAll(".reveal");

const io = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("in");

                io.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);

revealEls.forEach((el) => io.observe(el));


// =====================================================
// MOBILE NAVIGATION
// =====================================================

(function () {

    const toggle = document.getElementById("navToggle");
    const links = document.querySelector(".nav-links");

    if (!toggle || !links) return;


    function closeMenu() {

        links.classList.remove("open");

        toggle.classList.remove("open");

        toggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    toggle.addEventListener("click", () => {

        const isOpen =
            links.classList.toggle("open");

        toggle.classList.toggle(
            "open",
            isOpen
        );

        toggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    links
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });

})();


// =====================================================
// EMAILJS CONTACT FORM
// =====================================================

(function () {

    const form =
        document.getElementById("contactForm");

    const btn =
        document.getElementById("formSubmitBtn");

    const note =
        document.getElementById("formNote");


    // Prevent JS error if form isn't on page

    if (!form || !btn || !note) return;


    form.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            // =============================
            // CHECK EMAILJS
            // =============================

            if (typeof emailjs === "undefined") {

                console.error(
                    "EmailJS SDK not loaded."
                );

                note.textContent =
                    "Email service is unavailable. Please try again.";

                note.style.color =
                    "#ef4444";

                return;

            }


            // =============================
            // BUTTON LOADING STATE
            // =============================

            btn.disabled = true;

            btn.textContent =
                "Sending...";


            // =============================
            // FORM VALUES
            // =============================

            const params = {

                from_name:
                    document
                        .getElementById("name")
                        .value
                        .trim(),

                from_email:
                    document
                        .getElementById("email")
                        .value
                        .trim(),

                subject:
                    document
                        .getElementById("subject")
                        .value
                        .trim(),

                message:
                    document
                        .getElementById("message")
                        .value
                        .trim()

            };


            // =============================
            // SEND EMAIL
            // =============================

            emailjs
                .send(

                    "service_gm8gbhe",

                    "template_1z9pstb",

                    params

                )

                .then(() => {


                    // SUCCESS

                    btn.textContent =
                        "✓ Message Sent";


                    note.textContent =
                        "Thank you! I'll reply as soon as possible.";


                    note.style.color =
                        "#22d3ee";


                    // Clear form

                    form.reset();


                    // Reset button after 3 seconds

                    setTimeout(() => {

                        btn.textContent =
                            "Send Message";

                    }, 3000);

                })

                .catch((error) => {


                    console.error(
                        "EmailJS Error:",
                        error
                    );


                    btn.textContent =
                        "Send Message";


                    note.textContent =
                        "Something went wrong. Please try again.";


                    note.style.color =
                        "#ef4444";

                })

                .finally(() => {

                    btn.disabled = false;

                });

        }
    );

})();


// =====================================================
// AI CHAT WINDOW
// =====================================================

(function () {

    const body =
        document.getElementById("chatBody");

    if (!body) return;


    // =============================
    // CHAT QUESTIONS
    // =============================

    const pairs = [

        [
            "Who are you?",

            "I'm Aditya Kumar — a Data Science and AI enthusiast passionate about solving real-world problems with intelligent systems."
        ],

        [
            "What do you actually do?",

            "I build AI-powered applications using Machine Learning, Deep Learning, NLP, Computer Vision, and Generative AI."
        ],

        [
            "Which programming languages do you use?",

            "Primarily Python and SQL, along with libraries like Pandas, NumPy, and Scikit-learn for data-driven solutions."
        ],

        [
            "What AI technologies do you work with?",

            "Machine Learning, Deep Learning, LangChain, OpenAI APIs, RAG, Computer Vision, and LLM-powered applications."
        ],

        [
            "Can you analyze data?",

            "Yes. I perform data cleaning, EDA, feature engineering, predictive modeling, and insightful visualizations."
        ],

        [
            "What projects have you built?",

            "I've developed AI chatbots, fraud detection systems, fake news detection, district intelligence platforms, and real-time ML applications."
        ],

        [
            "Do you deploy your models?",

            "Absolutely. I use FastAPI, Flask, Streamlit, Docker, Git, and cloud platforms to deploy AI applications."
        ],

        [
            "What tools do you use?",

            "Python, Pandas, NumPy, Scikit-learn, PyTorch, TensorFlow, LangChain, FastAPI, Docker, Git, PostgreSQL, and Power BI."
        ],

        [
            "Are you open to internships?",

            "Yes! I'm actively looking for Data Science, AI Engineer, and Machine Learning internship opportunities."
        ],

        [
            "What makes you different?",

            "I enjoy building AI products that solve real-world problems instead of just creating academic projects."
        ],

        [
            "What's your next goal?",

            "To become a skilled AI Engineer by building production-ready intelligent systems that create meaningful impact."
        ],

        [
            "Available for work?",

            "Yes! Let's build something amazing together 🚀"
        ]

    ];


    let p = 0;


    // =============================
    // SLEEP
    // =============================

    function sleep(ms) {

        return new Promise(
            (resolve) =>
                setTimeout(resolve, ms)
        );

    }


    // =============================
    // TYPE EFFECT
    // =============================

    async function typeInto(
        element,
        text,
        speed
    ) {

        // Reduced motion

        if (reduceMotion) {

            element.textContent = text;

            return;

        }


        for (
            let i = 0;
            i < text.length;
            i++
        ) {

            element.textContent =
                text.slice(0, i + 1);

            await sleep(speed);

        }

    }


    // =============================
    // CHAT LOOP
    // =============================

    async function run() {

        while (true) {

            const [question, answer] =
                pairs[p % pairs.length];


            // Clear previous conversation

            body.innerHTML = "";


            // =====================
            // USER MESSAGE
            // =====================

            const userBubble =
                document.createElement("div");


            userBubble.className =
                "bubble bubble-user";


            body.appendChild(
                userBubble
            );


            await typeInto(
                userBubble,
                question,
                22
            );


            await sleep(
                reduceMotion ? 100 : 400
            );


            // =====================
            // TYPING DOTS
            // =====================

            const dots =
                document.createElement("div");


            dots.className =
                "typing-dots";


            dots.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
            `;


            body.appendChild(
                dots
            );


            await sleep(
                reduceMotion
                    ? 100
                    : 1100
            );


            dots.remove();


            // =====================
            // AI MESSAGE
            // =====================

            const aiBubble =
                document.createElement("div");


            aiBubble.className =
                "bubble bubble-ai";


            body.appendChild(
                aiBubble
            );


            await typeInto(
                aiBubble,
                answer,
                16
            );


            // =====================
            // CURSOR
            // =====================

            const cursor =
                document.createElement("span");


            cursor.className =
                "cursor";


            aiBubble.appendChild(
                cursor
            );


            await sleep(
                reduceMotion
                    ? 800
                    : 2600
            );


            p++;


            if (reduceMotion) {

                break;

            }

        }

    }


    run();

})();


// =====================================================
// PROFILE ROLE TYPING EFFECT
// =====================================================

const roles = [

    "Data Scientist",

    "AI Engineer",

    "Machine Learning Engineer",

    "Python Developer",

    "Generative AI Developer"

];


let roleIndex = 0;

let charIndex = 0;


const typing =
    document.getElementById(
        "typing-text"
    );


// =====================================================
// TYPE ROLE
// =====================================================

function typeRole() {

    if (!typing) return;


    if (reduceMotion) {

        typing.textContent =
            roles[0];

        return;

    }


    if (
        charIndex <
        roles[roleIndex].length
    ) {

        typing.textContent +=
            roles[roleIndex]
                .charAt(charIndex);


        charIndex++;


        setTimeout(
            typeRole,
            100
        );

    } else {

        setTimeout(
            deleteRole,
            1500
        );

    }

}


// =====================================================
// DELETE ROLE
// =====================================================

function deleteRole() {

    if (!typing) return;


    if (charIndex > 0) {

        typing.textContent =
            roles[roleIndex]
                .substring(
                    0,
                    charIndex - 1
                );


        charIndex--;


        setTimeout(
            deleteRole,
            50
        );

    } else {

        roleIndex++;


        if (
            roleIndex >=
            roles.length
        ) {

            roleIndex = 0;

        }


        setTimeout(
            typeRole,
            300
        );

    }

}


typeRole();


// =====================================================
// SKILL CARD SCROLL ANIMATION
// =====================================================

const cards =
    document.querySelectorAll(
        ".skill-card"
    );


const cardObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("show");


                        // Animate once

                        cardObserver
                            .unobserve(
                                entry.target
                            );

                    }

                }
            );

        },

        {
            threshold: 0.2
        }

    );


cards.forEach(
    (card) =>
        cardObserver.observe(card)
);