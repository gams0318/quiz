const startBtn = document.querySelector('.container button');
const popupQuiz = document.querySelector('.popup-quiz');
const exitBtn = document.querySelector('.info-btn.exit')
const conBtn = document.querySelector('.info-btn.continue')
const container = document.querySelector('.container')
const quizCon = document.querySelector('.quiz-container')
const optionList = document.querySelector('.option-list')
const finalResult = document.querySelector('.result')
const progress = document.querySelector('.progress')
const scoreText = document.querySelector('.score-text')
const againBtn = document.querySelector('.again')
const homeBtn = document.querySelector('.goBack')
const response = document.querySelector('.response')
const image = document.querySelector('.image img')
// const circular = document.querySelector('.circ')


startBtn.addEventListener('click', () => {
    popupQuiz.classList.add('active')
    container.classList.remove('active')
})

exitBtn.addEventListener('click', () => {
    popupQuiz.classList.remove('active')
    container.classList.add('active')

})
conBtn.addEventListener('click', () => {
    quizCon.classList.add('active')
    popupQuiz.classList.remove('active')
    showQuestion(0);
    scoreHeader()

})

const nextBtn = document.querySelector('.next-btn')
nextBtn.addEventListener('click', () => {
    if (questionCount < question.length - 1) {
        questionCount++;
        showQuestion(questionCount)
        nextBtn.classList.remove('active')
    }
    else {
        console.log('completed')
        quizCon.classList.remove('active')
        finalResult.classList.add('active')
        results();

    }

})
function results() {
    const percent = (score / question.length) * 100
    progress.textContent = `${percent}%`
    console.log(score, percent)

    scoreText.textContent = `Your Final Score is ${score} of ${question.length}`
    if (percent >= 50) {
        response.textContent = 'Congratulations!You won!!'
        response.style.color = 'green'
        image.src = './happy.gif'
    }
    else {
        response.textContent = 'Sorry! You Lost!!'
        response.style.color = 'red'
        image.src = './sad.gif'
    }
    againBtn.addEventListener('click', () => {

        finalResult.classList.remove('active')
        quizCon.classList.add('active')
        refresh();
        showQuestion(0);
        scoreHeader()

    })
    homeBtn.addEventListener('click', () => {
        finalResult.classList.remove('active')

        container.classList.add('active')
        refresh();
    })

    //circular.style.background(`conic-gradient(red 60deg,blue 0deg);`)


    // circular.style.background = `conic-gradient(red 60deg,blue 0deg);`


}
function refresh() {
    score = 0;
    questionCount = 0;
}
function showQuestion(index) {

    const Question = document.querySelector('.question')
    Question.textContent = `Q ${question[index].numb}. ${question[index].ques}`
    let optionTag = `<div class="option"><span>A. ${question[index].options[0]}</span></div>
<div class="option"><span>B. ${question[index].options[1]}</span></div>
<div class="option"><span>C. ${question[index].options[2]}</span></div>
<div class="option"><span>D. ${question[index].options[3]}</span></div>`

    optionList.innerHTML = optionTag;
    questionCounter();

    const option = document.querySelectorAll('.option')
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelect(this)')

    }

}
let score = 0;
let questionCount = 0;
function optionSelect(ans) {
    let userAnswer = ans.textContent;
    let correctAns = question[questionCount].ans;
    if (userAnswer == correctAns) {
        ans.classList.add('correct')
        score++;
    }
    else {
        ans.classList.add('wrong')
        for (let i = 0; i < optionList.children.length; i++) {
            if (optionList.children[i].textContent == correctAns)
                optionList.children[i].classList.add('correct')
        }
    }
    nextBtn.classList.add('active')
    scoreHeader();
    for (let i = 0; i < optionList.children.length; i++) {
        optionList.children[i].classList.add('disabled')
    };
}
function questionCounter() {
    const quescoun = document.querySelector('.totalQues')
    quescoun.textContent = `${questionCount + 1} of ${question.length} Questions`
}
const scoreHeader = () => {
    const headScore = document.querySelector('.score')
    headScore.textContent = `Score: ${score}/${question.length}`

}
// window.addEventListener('loadeddata', () => {
//     container.classList.add('active')
// })