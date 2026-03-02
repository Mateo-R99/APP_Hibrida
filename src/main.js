import './main.scss';
import Storage from './js/storage.js';
import { router } from './js/router.js';
import Dashboard from './js/dashboard.js';
import Income from './js/income.js';
import Expenses from './js/expenses.js';
import Movements from './js/movements.js';
import Goals from './js/goals.js';
import { showToast } from './js/utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const settings = Storage.getSettings();
  const busName = document.getElementById('header-business-name');
  if (busName) busName.textContent = settings.businessName || 'Mi Negocio';

  const modal = document.getElementById('onboarding-modal');
  if (modal && settings.firstTime) {
    modal.removeAttribute('aria-hidden');
    document.getElementById('onboarding-btn').addEventListener('click', () => {
      const name = document.getElementById('onboarding-name').value.trim();
      Storage.saveSettings({ businessName: name || 'Mi Negocio', firstTime: false });
      if (busName) busName.textContent = name || 'Mi Negocio';
      modal.setAttribute('aria-hidden', 'true');

      // Initialize all modules after onboarding
      Dashboard.init();
      Income.init();
      Expenses.init();
      Movements.init();
      Goals.init();
    });
  } else {
    // Initialize all modules
    Dashboard.init();
    Income.init();
    Expenses.init();
    Movements.init();
    Goals.init();
  }

  // Initialize router
  router.init();
});

// PWA Service Worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
