import Storage from './storage.js';
import { formatCOP } from './utils.js';

const Dashboard = {
  init() {
    this.refresh();
  },
  refresh() {
    const txns = Storage.getAll('cf_transactions');
    const { income, expense, net } = this._calcMonth(txns);

    document.getElementById('dash-income').textContent  = formatCOP(income);
    document.getElementById('dash-expense').textContent = formatCOP(expense);
    const netEl = document.getElementById('dash-net');
    netEl.textContent = formatCOP(net);
    netEl.className   = `card__value card__value--big ${net >= 0 ? 'positive' : 'negative'}`;
  },
  _calcMonth(txns) {
    const now = new Date();
    const currentMonthTxns = txns.filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    let income = 0, expense = 0;
    currentMonthTxns.forEach(t => { if (t.type === 'income') income += t.amount; else expense += t.amount; });
    return { income, expense, net: income - expense };
  }
};
export default Dashboard;
