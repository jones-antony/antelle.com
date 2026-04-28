(function () {
  const navToggle = document.querySelector('[data-menu-toggle]');
  const navContent = document.getElementById('navbarContent');

  if (navToggle && navContent) {
    navToggle.addEventListener('click', function () {
      const isOpen = navContent.classList.toggle('show');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  document.querySelectorAll('[data-dropdown-toggle]').forEach(function (toggle) {
    toggle.addEventListener('click', function (event) {
      event.preventDefault();
      const menu = toggle.nextElementSibling;
      const isOpen = menu && menu.classList.toggle('show');

      document.querySelectorAll('.dropdown-menu.show').forEach(function (openMenu) {
        if (openMenu !== menu) {
          openMenu.classList.remove('show');
        }
      });

      document.querySelectorAll('[data-dropdown-toggle][aria-expanded="true"]').forEach(function (openToggle) {
        if (openToggle !== toggle) {
          openToggle.setAttribute('aria-expanded', 'false');
        }
      });

      toggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
    });
  });

  document.addEventListener('click', function (event) {
    if (event.target.closest('.dropdown')) {
      return;
    }

    document.querySelectorAll('.dropdown-menu.show').forEach(function (menu) {
      menu.classList.remove('show');
    });
    document.querySelectorAll('[data-dropdown-toggle][aria-expanded="true"]').forEach(function (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();
