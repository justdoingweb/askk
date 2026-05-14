const hearts = document.getElementById("hearts");
const quizCard = document.querySelector(".single-quiz");
const levelAnswer = document.getElementById("levelAnswer");
const levelFeedback = document.getElementById("levelFeedback");
const checkAnswer = document.getElementById("checkAnswer");
const missionStatus = document.getElementById("missionStatus");
const nextLink = document.getElementById("nextLink");

function spawnHeart() {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.4 ? "❤" : "♥";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${18 + Math.random() * 26}px`;
  heart.style.animationDuration = `${4.8 + Math.random() * 3.8}s`;
  hearts.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 9000);
}

function normalizeAnswer(value) {
  return value.trim().toLowerCase().replace(/[ๆฯ.,'"!?()\-_:]/g, "").replace(/\s+/g, "");
}

function isCorrect() {
  const value = normalizeAnswer(levelAnswer.value);
  const answers = quizCard.dataset.answer.split("|");
  return answers.some((answer) => normalizeAnswer(answer) === value);
}

function unlockNext() {
  quizCard.classList.add("done");
  quizCard.classList.remove("wrong");
  levelFeedback.textContent = "[Quest Complete] ตอบถูก";
  missionStatus.textContent = "ผ่านแล้ว กด NEXT ไปหน้าต่อไปได้เลย";
  nextLink.classList.remove("locked");
  nextLink.textContent = "NEXT: ไปหน้าต่อไป";
  nextLink.setAttribute("aria-disabled", "false");
}

function markWrong() {
  quizCard.classList.remove("done");
  quizCard.classList.add("wrong");
  levelFeedback.textContent = "ยังไม่ถูก ลองพิมพ์ใหม่อีกที";
  missionStatus.textContent = "ยังไปต่อไม่ได้ ต้องตอบข้อนี้ให้ถูกก่อน";
}

for (let i = 0; i < 18; i += 1) {
  setTimeout(spawnHeart, i * 180);
}

setInterval(spawnHeart, 300);

checkAnswer.addEventListener("click", () => {
  if (isCorrect()) {
    unlockNext();
    return;
  }

  markWrong();
});

levelAnswer.addEventListener("input", () => {
  quizCard.classList.remove("wrong");
});

nextLink.addEventListener("click", (event) => {
  if (nextLink.classList.contains("locked")) {
    event.preventDefault();
    markWrong();
  }
});
