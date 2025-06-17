const quizdata = [
    {
        question: "1: What does S.H.I.E.L.D. stand for and who established it ?",
        options: [
            "A. Super Hero International Enforcement and Logical Decision , Howard Stark",
            "B. Strategic Heroic Intervention, Elite and Logical Decision , Peggy Carter",
            "C. Strategic Homeland Intervention, Enforcement and Logistics Division , Peggy Carter",
            "D. Strategy Heroic Intervention, Elite and Logical Decision , Steve Rogers"
        ],
        correct: 2,
        image: "1.jpg"
    },

    {
        question: "2: Whose power 'exceeds that of the Sorcerer Supreme'? ",
        options: [
            "A. Wanda",
            "B. Vision",
            "C. Iron Man",
            "D. Thor"
        ],
        correct: 0,
        image: "2.jpg"
    },
    {
        question: "3: Captain America's shield and Bucky's arm are made of what?",
        options: [
            "A. Adamantium",
            "B. Promethium",
            "C. Vibranium",
            "D. Carbonadium"
        ],
        correct: 2,
        image: "3.jpg"
    },
    {
        question: "4: Wanda and her brother Pietro are from where?",
        options: [
            "A. New York",
            "B. Sokovia",
            "C. Supernova",
            "D. Slovakia"
        ],
        correct: 1,
        image: "4.jpg"
    },
    {
        question: "5: Thor's Mjolnir is made from the metal of a dying ___?",
        options: [
            "A. Star",
            "B. Universe",
            "C. Planet",
            "D. Person"
        ],
        correct: 0,
        image: "5.jpg"
    },
    {
        question: "6: Who does the Mad Titan sacrifice to acquire the Soul Stone?",
        options: [
            "A. Nebula",
            "B. Ebony Maw",
            "C. Cull Obsidian",
            "D. Gamora"
        ],
        correct: 3,
        image: "6.jpg"
    },
    {
        question: "7: What video game Thor played in Avengers: Endgame?",
        options: [
            "A. Minecraft",
            "B. Fortnite",
            "C. Rocket League",
            "D. Call of Duty"
        ],
        correct: 1,
        image: "7.jpg"
    },
    {
        question: "8: Who created Captain America's shield?",
        options: [
            "A. James Rhodes",
            "B. Sam Wilson",
            "C. Howard Stark",
            "D. Richard Parker"
        ],
        correct: 2,
        image: "8.jpg"
    },
    {
        question: "9: Which stone was the first one to show up in the MCU?",
        options: [
            "A. Space",
            "B. Mind",
            "C. Time",
            "D. Power"
        ],
        correct: 0,
        image: "9.jpg"
    },
    {
        question: "10: How long Scott Lang was trapped in the Quantum Realm ?",
        options: [
            "A. Ten Years ",
            "B. Five Years",
            "C. Seven Years",
            "D. Three Years"
        ],
        correct: 1,
        image: "10.jpg"        
    }
];


//INITIALISING ZONE :-
home = document.querySelector(".home")
instruction = document.querySelector(".instruction")
quiz_section = document.querySelector(".quiz_section")
result = document.querySelector(".result")
to_instruction = document.querySelectorAll("#start-btn")
to_home = document.querySelector(".Exit")
to_quiz = document.querySelector(".Continue")
to_result = document.querySelector(".Submit")
const quiz = document.querySelector(".quiz")
const imgElm = document.querySelector(".photo")
const answerElm = document.querySelectorAll('input[type="radio"].answer');
const [questionElm, option_1, option_2, option_3, option_4] = document.querySelectorAll(".question, .option_1, .option_2, .option_3, .option_4");
score_show = document.querySelector(".score");
skip = document.querySelector(".skip")
next = document.querySelector(".next")
let currentQuiz = 0;
let score = 0;

let correct_ans = 0;

let wrong_ans = 0;
let attempted = 0;
let total = quizdata.length * 5


//HIDE AND SHOW CASES
instruction.classList.add("hidden")
quiz_section.classList.add("hidden")
result.classList.add("hidden")

instruction_show = () => {
    home.classList.add("hidden")
    instruction.classList.remove("hidden")
    quiz_section.classList.add("hidden")
    result.classList.add("hidden")
}

quizsection_show = () => {
    home.classList.add("hidden")
    instruction.classList.add("hidden")
    quiz_section.classList.remove("hidden")
    result.classList.add("hidden")
}

result_show = () => {
    home.classList.add("hidden")
    instruction.classList.add("hidden")
    quiz_section.classList.add("hidden")
    result.classList.remove("hidden")
    result.innerHTML =
        `<div class="res">
            <h2>Congratulations on completing the quiz!</h2>
            <h3>Your score : ${score} / ${total} Points</h3>
            <p>Correct Answers : ${correct_ans}</p>
            <p>Wrong Answers : ${wrong_ans}</p>
            <p>Attempted Answers : ${attempted}</p>
            <p>Unattempted Answers : ${(quizdata.length - attempted)}</p>
            <div class="button">
                <button class="reload-button" onclick="location.reload()">Back to Home</button>
            </div>
        </div>`
}

to_quiz.addEventListener("click", () => {
    quizsection_show()
})

to_result.addEventListener("click", () => {
    result_show()
})

to_home.addEventListener("click", () => {
    location.reload()
})

to_instruction.forEach(element => {
    element.addEventListener("click", () => {
        instruction_show()
    })
});

//CHANGE QUESTION CASES
const loadQuiz = () => {
    const { question, options , image } = quizdata[currentQuiz];
    imgElm.src = image;
    questionElm.innerHTML = question;
    options.forEach((curopt, index) => {
        (window[`option_${index + 1}`].innerHTML = curopt)
    });
}
loadQuiz();

getSelectedOption = () => {
    let ans_index;
    answerElm.forEach((curopt, index) => {
        if (curopt.checked) {
            ans_index = index
        }
        curopt.checked = false
    })
    return ans_index
}

to_result.classList.add("hidden")

const arr = [skip, next, to_result]

arr.forEach(e => {
    e.addEventListener("click", () => {
        e.checked = false;
        let selectedOptionIndex = getSelectedOption()

        //If any option selected and then skip is pressed.
        if (e == skip) {
            selectedOptionIndex = undefined
        }

        //score calculation
        if (selectedOptionIndex == quizdata[currentQuiz].correct) {
            score = score + 5;
            correct_ans += 1
            attempted += 1
        }
        else if (selectedOptionIndex == undefined) {
            score += 0;
        }
        else {
            score = score - 1
            wrong_ans += 1
            attempted += 1
        }        

        currentQuiz++;
        score_show.innerHTML = `SCORE :  ${score} / ${total} `

        if (currentQuiz >= quizdata.length) {
            result_show();
            return;
        }

        //question load
        if (currentQuiz < quizdata.length) {
            loadQuiz();
            if (currentQuiz == (quizdata.length - 1)) {
                to_result.classList.remove("hidden")
                next.classList.add("hidden")
            }
        }
    })
});