import { Chart, registerables } from 'chart.js';
import Storage from './storage.js';
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
    this.render('month');
  },
  render(filter = 'month') {
    currentFilter = filter;
    const txns = this._getFiltered(filter);
    const list = document.getElementById('movements-list');
    const empty = document.getElementById('movements-empty');
    if (txns.length === 0) { list.innerHTML = ''; empty.style.display = 'flex'; if(chartInstance) chartInstance.destroy(); return; }
    empty.style.display = 'none';
    const sorted = [...txns].sort((a,b) => new Date(b.date) - new Date(a.date));
    list.innerHTML = sorted.map(t => this._renderItem(t)).join('');
    this._renderChart(txns);
  },
  _getFiltered(filter) {
    const all = Storage.getAll('cf_transactions');
    const now = new Date(); now.setHours(0,0,0,0);
    if (filter === 'today') {
      const s = new Date(now), e = new Date(now); e.setHours(23,59,59,999);
      return all.filter(t => { const d=new Date(t.date); return d>=s && d<=e; });
    }
    if (filter === 'week') {
      const s = new Date(now); s.setDate(now.getDate()-now.getDay());
      const e = new Date(s); e.setDate(s.getDate()+6); e.setHours(23,59,59,999);
      return all.filter(t => { const d=new Date(t.date); return d>=s && d<=e; });
    }
    const s = new Date(now.getFullYear(), now.getMonth(), 1);
    const e = new Date(now.getFullYear(), now.getMonth()+1, 0); e.setHours(23,59,59,999);
    return all.filter(t => { const d=new Date(t.date); return d>=s && d<=e; });
  },
  _renderItem(t) {
    const isInc = t.type === 'income';
    return `<div class="movement-item ${isInc ? 'movement-item--income' : 'movement-item--expense'}">
      <div class="movement-item__info">
        <span class="movement-item__name">${isInc ? t.client : t.category}</span>
        <span class="movement-item__date">${formatDate(t.date)}</span>
      </div>
      <div class="movement-item__right">
        <span class="movement-item__amount">${isInc?'+':'-'}${formatCOP(t.amount)}</span>
        <button class="movement-item__delete" data-id="${t.id}">×</button>
      </div>
    </div>`;
  },
  _renderChart(txns) {
    const ctx = document.getElementById('movements-chart');
    if (!ctx) return;
    if (chartInstance) chartInstance.destroy();
    const map = {};
    txns.forEach(t => { if(!map[t.date]) map[t.date]={i:0,e:0}; t.type==='income' ? map[t.date].i+=t.amount : map[t.date].e+=t.amount; });
    const labels = Object.keys(map).sort();
    chartInstance = new Chart(ctx.getContext('2d'), {
      type: 'bar',
      data: { labels: labels.map(d=>d.split('-')[2]+'/'+d.split('-')[1]), datasets: [
        { label: 'Ingresos', data: labels.map(d=>map[d].i), backgroundColor: '#52B788' },
        { label: 'Gastos', data: labels.map(d=>map[d].e), backgroundColor: '#D62828' }
      ]}
    });
  },
  _handleDelete(id) {
    if (!confirm('¿Eliminar?')) return;
    Storage.deleteById('cf_transactions', id);
    this.render(currentFilter);
    showToast('Eliminado', 'success');
  }
};
export default Movements;
