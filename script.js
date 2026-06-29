const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');

menuButton.addEventListener('click', () => {
  const isOpen = header.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.textContent = isOpen ? '×' : '☰';
});

document.querySelectorAll('.site-header a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
  });
});

const trialForm = document.querySelector('#trial-form');
const success = trialForm.querySelector('.form-success');
const submissionCount = document.querySelector('#submission-count');
const submissionNote = document.querySelector('#submission-note');
const storageKey = 'freeTrialApplications';
const recipientEmail = 'SONAWANEOM860@GMAIL.COM';

let appliedCount = Number(localStorage.getItem(storageKey) || 0);

function updateSubmissionStatus(message) {
  submissionCount.textContent = appliedCount;
  submissionNote.textContent = message || (appliedCount === 0
    ? 'No requests yet.'
    : `New request received just now. Total bookings: ${appliedCount}`);
}

updateSubmissionStatus();

trialForm.addEventListener('submit', (event) => {
  event.preventDefault();
  appliedCount += 1;
  localStorage.setItem(storageKey, appliedCount);

  const formData = new FormData(trialForm);
  const name = formData.get('name') || 'Unknown';
  const age = formData.get('age') || 'Not provided';
  const experience = formData.get('experience') || 'Not provided';
  const phone = formData.get('phone') || 'Not provided';
  const email = formData.get('email') || 'Not provided';
  const now = new Date();
  const timeLabel = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const subject = `Free assessment request from ${name}`;
  const body = [
    `Player name: ${name}`,
    `Age: ${age}`,
    `Experience: ${experience}`,
    `Contact number: ${phone}`,
    `Parent email: ${email}`,
    '',
    'This request was submitted from the website.'
  ].join('\n');
  const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  success.classList.add('show');
  success.textContent = `Booked your free trial at ${timeLabel}. A message draft is opening for your email.`;
  trialForm.querySelector('button').textContent = 'Booked ✓';
  updateSubmissionStatus(`New request received at ${timeLabel}. Total bookings: ${appliedCount}`);
  window.location.href = mailtoLink;
  trialForm.reset();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.program-card, .method-list > div, .coach-cards article').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  observer.observe(el);
});

const style = document.createElement('style');
style.textContent = '.visible{opacity:1!important;transform:translateY(0)!important}';
document.head.append(style);
