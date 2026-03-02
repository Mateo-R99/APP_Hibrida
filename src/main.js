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
    });
  }

  // Init depending on which page we are
  if (document.getElementById('dash-income')) {
    Dashboard.init();
  }
  if (document.getElementById('form-income')) Income.init();
  if (document.getElementById('form-expense')) Expenses.init();
  if (document.getElementById('movements-list')) Movements.init();
  if (document.getElementById('form-goal')) Goals.init();
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
