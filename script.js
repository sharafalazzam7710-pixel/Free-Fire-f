const form = document.getElementById('registerForm');
const message = document.getElementById('formMessage');
const teamCount = document.getElementById('teamCount');
const toast = document.getElementById('toast');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');

const savedTeams = JSON.parse(localStorage.getItem('clashSquadTeams') || '[]');
teamCount.textContent = 128 + savedTeams.length;

menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('nav a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const teams = JSON.parse(localStorage.getItem('clashSquadTeams') || '[]');
  teams.push({ ...data, createdAt: new Date().toISOString() });
  localStorage.setItem('clashSquadTeams', JSON.stringify(teams));
  teamCount.textContent = 128 + teams.length;
  message.textContent = `تم استلام طلب فريق «${data.teamName}» بنجاح.`;
  form.reset();
  showToast('تم تسجيل الفريق محليًا في هذا المتصفح');
});

document.getElementById('adminButton').addEventListener('click', () => {
  showToast('لوحة الإدارة متاحة في النسخة الكاملة فقط');
});

function showToast(text) {
  toast.textContent = text;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 3200);
}