const themeButton = document.getElementById('theme-toggle');

function setTheme(isDark) {
  document.body.classList.toggle('dark', isDark);
  themeButton.textContent = isDark ? 'Light mode' : 'Dark mode';
}

themeButton.addEventListener('click', function () {
  setTheme(!document.body.classList.contains('dark'));
});
