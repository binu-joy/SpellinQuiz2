// List of spelling words
const words = [
    "breathe",
    "separate",
    "calendar",
    "exercise",
    "believe",
    "important",
    "knowledge",
    "grammar",
    "surprise",
    "different"
];

let currentWordIndex = 0;
let score = 0;

// DOM Elements
const wordPrompt = document.getElementById("word-prompt");
const answerInput = document.getElementById("answer");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const submitBtn = document.getElementById("submit-btn");
const startBtn = document.getElementById("start-btn");

// Start the quiz
function startQuiz() {
    currentWordIndex = 0;
    score = 0;
    updateScore();
    feedback.textContent = "";
    answerInput.value = "";
    answerInput.disabled = false;
    submitBtn.disabled = false;
    loadNextWord();
}

// Load the next word and say it (hide the spelling)
function loadNextWord() {
    if (currentWordIndex < words.length) {
        const currentWord = words[currentWordIndex];
        wordPrompt.textContent = "Spell the word:";
        feedback.textContent = "";
        answerInput.value = "";
        answerInput.focus();
        speakWord(currentWord); // Say the word
    } else {
        endQuiz();
    }
}

// Text-to-Speech: Speak the word
function speakWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US"; // Set the language (English - US)
    speechSynthesis.speak(utterance);
}

// Check the user's answer
function checkAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = words[currentWordIndex].toLowerCase();

    if (userAnswer === correctAnswer) {
        feedback.textContent = "Correct! 🎉";
        feedback.style.color = "green";
        score++;
    } else {
        feedback.textContent = `Incorrect. The correct spelling is "${words[currentWordIndex]}".`;
        feedback.style.color = "red";
    }

    updateScore();
    currentWordIndex++;
    setTimeout(loadNextWord, 1500); // Wait 1.5 seconds before moving to the next word
}

// Update the score display
function updateScore() {
    scoreDisplay.textContent = `Score: ${score} / ${words.length}`;
}

// End the quiz
function endQuiz() {
    wordPrompt.textContent = "Quiz complete! 🎉";
    feedback.textContent = `Your final score is ${score} / ${words.length}.`;
    feedback.style.color = "blue";
    answerInput.disabled = true;
    submitBtn.disabled = true;
}

// Event Listeners
startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", checkAnswer);
