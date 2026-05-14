const hearts = document.getElementById("hearts");

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

for (let i = 0; i < 18; i += 1) {
  setTimeout(spawnHeart, i * 180);
}

setInterval(spawnHeart, 300);
