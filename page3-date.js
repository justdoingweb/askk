const hearts = document.getElementById('hearts');
const relationshipDateText = document.getElementById('relationshipDateText');
const relationshipDateInput = document.getElementById('relationshipDateInput');
const relationshipDateStatus = document.getElementById('relationshipDateStatus');

const storageKey = 'relationship-date';

function spawnHeart() {
  const heart = document.createElement('span');
  heart.className = 'heart';
  heart.textContent = Math.random() > 0.4 ? '❤' : '♥';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${18 + Math.random() * 26}px`;
  heart.style.animationDuration = `${4.8 + Math.random() * 3.8}s`;
  hearts.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 9000);
}

function updateRelationshipDate(value) {
  const date = value.trim();

  if (!date) {
    relationshipDateText.textContent = 'ยังไม่ได้ตั้งวันที่';
    relationshipDateStatus.textContent = 'วันที่นี้จะถูกบันทึกไว้ในเครื่องนี้อัตโนมัติ';
    localStorage.removeItem(storageKey);
    return;
  }

  relationshipDateText.textContent = date;
  relationshipDateStatus.textContent = 'บันทึกแล้วนะ วันนี้สำคัญขึ้นมาแล้ว';
  localStorage.setItem(storageKey, date);
}

const savedDate = localStorage.getItem(storageKey);
if (savedDate) {
  relationshipDateInput.value = savedDate;
  updateRelationshipDate(savedDate);
}

relationshipDateInput.addEventListener('input', (event) => {
  updateRelationshipDate(event.target.value);
});

for (let i = 0; i < 18; i += 1) {
  setTimeout(spawnHeart, i * 180);
}

setInterval(spawnHeart, 260);
