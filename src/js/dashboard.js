import Storage from './storage.js';
import { formatCOP } from './utils.js';

const Dashboard = {
  init() {
    this.render();
  },
  render() {
    const tx = Storage.getAll('cf_transactions');

    // Empty State Logic
    const emptyState = document.getElementById('dashboard-empty-state');
    const indicatorsWrap = document.getElementById('dashboard-indicators-wrapper');

    if (tx.length === 0) {
      if (emptyState) emptyState.style.display = 'flex';
      if (indicatorsWrap) indicatorsWrap.style.display = 'none';
      return;
    } else {
      if (emptyState) emptyState.style.display = 'none';
      if (indicatorsWrap) indicatorsWrap.style.display = 'block';
    }

    const { income, expense, net } = this._calcMonth(tx);

    document.getElementById('dash-income').textContent = formatCOP(income);
    document.getElementById('dash-expense').textContent = formatCOP(expense);
    const netEl = document.getElementById('dash-net');
    netEl.textContent = formatCOP(net);
    netEl.className = `card__value card__value--big ${net >= 0 ? 'positive' : 'negative'}`;
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
