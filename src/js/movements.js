import { Chart, registerables } from 'chart.js';
import Storage from './storage.js';
import Dashboard from './dashboard.js';
import { formatCOP, formatDate, showToast } from './utils.js';
Chart.register(...registerables);
let chartInstance = null;
let currentFilter = 'month';

const Movements = {
  init() {
    document.querySelectorAll('.filter-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('filter-tab--active'));
        btn.classList.add('filter-tab--active');
        this.render(btn.dataset.filter);
      });
    });
    document.getElementById('movements-list')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.movement-item__delete');
      if (btn) this._handleDelete(btn.dataset.id);
    });
    // Set 'today' as active and render
    document.querySelector('[data-filter="today"]')?.classList.add('filter-tab--active');
    this.render('today');
  },
  render(filter = 'month') {
    currentFilter = filter;
    const txns = this._getFiltered(filter);
    const list = document.getElementById('movements-list');
    const empty = document.getElementById('movements-empty');
    if (txns.length === 0) { list.innerHTML = ''; empty.style.display = 'flex'; if (chartInstance) chartInstance.destroy(); return; }
    empty.style.display = 'none';
    const sorted = [...txns].sort((a, b) => new Date(b.date) - new Date(a.date));
    list.innerHTML = sorted.map(t => this._renderItem(t)).join('');
    this._renderChart(txns);
  },
  _getFiltered(filter) {
    const all = Storage.getAll('cf_transactions');
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    if (filter === 'today') {
      return all.filter(t => {
        const [year, month, day] = t.date.split('-').map(Number);
        const tDate = new Date(year, month - 1, day);
        return tDate >= todayStart && tDate < todayEnd;
      });
    }

    if (filter === 'week') {
      const weekStart = new Date(todayStart);
      const dayOfWeek = weekStart.getDay();
      weekStart.setDate(weekStart.getDate() - dayOfWeek);
      
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 7);

      return all.filter(t => {
        const [year, month, day] = t.date.split('-').map(Number);
        const tDate = new Date(year, month - 1, day);
        return tDate >= weekStart && tDate < weekEnd;
      });
    }

    // Month filter
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    return all.filter(t => {
      const [year, month, day] = t.date.split('-').map(Number);
      const tDate = new Date(year, month - 1, day);
      return tDate >= monthStart && tDate < monthEnd;
    });
  },
  _renderItem(t) {
    const isInc = t.type === 'income';
    return `<div class="movement-item ${isInc ? 'movement-item--income' : 'movement-item--expense'}">
      <div class="movement-item__info">
        <span class="movement-item__name">${isInc ? t.client : t.category}</span>
        <span class="movement-item__date">${formatDate(t.date)}</span>
      </div>
      <div class="movement-item__right">
        <span class="movement-item__amount">${isInc ? '+' : '-'}${formatCOP(t.amount)}</span>
        <button class="movement-item__delete" data-id="${t.id}">×</button>
      </div>
    </div>`;
  },
  _renderChart(txns) {
    const ctx = document.getElementById('movements-chart');
    if (!ctx) return;
    if (chartInstance) chartInstance.destroy();

    const map = {};
    txns.forEach(t => {
      if (!map[t.date]) map[t.date] = { i: 0, e: 0 };
      t.type === 'income' ? map[t.date].i += t.amount : map[t.date].e += t.amount;
    });

    const labels = Object.keys(map).sort();
    const displayLabels = labels.map(d => {
      const [year, month, day] = d.split('-');
      return `${day}/${month}`;
    });

    chartInstance = new Chart(ctx.getContext('2d'), {
      type: 'bar',
      data: {
        labels: displayLabels,
        datasets: [
          { label: 'Ingresos', data: labels.map(d => map[d].i), backgroundColor: '#52B788' },
          { label: 'Gastos', data: labels.map(d => map[d].e), backgroundColor: '#D62828' }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { position: 'top' }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  },
  _handleDelete(id) {
    if (!confirm('¿Eliminar?')) return;
    Storage.deleteById('cf_transactions', id);
    Dashboard.render();
    this.render(currentFilter);
    showToast('Eliminado', 'success');
  }
};
export default Movements;
