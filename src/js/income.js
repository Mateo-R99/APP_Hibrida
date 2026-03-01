import Storage from './storage.js';
import { showToast } from './utils.js';
import Dashboard from './dashboard.js';

const Income = {
  init() {
    const form = document.getElementById('form-income');
    if (!form) return;
    document.getElementById('income-date').valueAsDate = new Date();
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit(form);
    });
  },
  handleSubmit(form) {
    const amount = parseInt(document.getElementById('income-amount').value, 10);
    if (!amount || amount <= 0) { showToast('Ingresa un monto válido', 'error'); return; }
    Storage.save('cf_transactions', this._buildTxn());
    showToast('Ingreso registrado 💰', 'success');
    form.reset();
    document.getElementById('income-date').valueAsDate = new Date();
    setTimeout(() => { window.location.href = '/'; }, 1000);
  },
  _buildTxn() {
    const isEx = document.getElementById('income-external').checked;
    return {
      type: 'income', amount: parseInt(document.getElementById('income-amount').value, 10),
      client: isEx ? 'Ingreso Externo' : document.getElementById('income-client').value.trim(),
      paymentMethod: document.getElementById('income-payment').value,
      date: document.getElementById('income-date').value,
      description: ''
    };
  }
};
export default Income;
