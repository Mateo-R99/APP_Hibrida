import Storage from './storage.js';
import { showToast } from './utils.js';
import Dashboard from './dashboard.js';
import { router } from './router.js';

const Expenses = {
  init() {
    const form = document.getElementById('form-expense');
    if (!form) return;
    document.getElementById('expense-date').valueAsDate = new Date();
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit(form);
    });
  },
  handleSubmit(form) {
    const amount = parseInt(document.getElementById('expense-amount').value, 10);
    const cat = document.getElementById('expense-category').value;
    if (!amount || amount <= 0 || !cat) { showToast('Completa campos', 'error'); return; }
    Storage.save('cf_transactions', this._buildTxn(amount, cat));
    Dashboard.render();
    showToast('Gasto registrado 💸', 'success');
    form.reset();
    setTimeout(() => { router.navigate('dashboard'); }, 1000);
  },
  _buildTxn(amount, category) {
    return {
      type: 'expense', amount, category,
      isBusiness: document.getElementById('expense-is-business').checked,
      date: document.getElementById('expense-date').value
    };
  }
};
export default Expenses;
