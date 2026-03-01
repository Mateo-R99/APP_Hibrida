import Storage from './storage.js';
import { formatCOP, showToast } from './utils.js';

const ACHIEVEMENTS_DEF = [
  { id:'ACH_01', name:'Primera venta 🎉', desc:'Registra tu primera venta', check: (inc) => inc.length >= 1 },
  { id:'ACH_02', name:'10 ventas 🔥', desc:'Llega a 10 ingresos', check: (inc) => inc.length >= 10 },
  { id:'ACH_04', name:'Millón 💰', desc:'Supera $1.000.000', check: (inc) => inc.reduce((s,t)=>s+t.amount,0) >= 1000000 }
];

const Goals = {
  init() {
    document.getElementById('form-goal')?.addEventListener('submit', (e) => {
      e.preventDefault(); this._handleNewGoal();
    });
    this.renderAll();
  },
  renderAll() { this._renderGoalProgress(); this._renderAchievements(); },
  _renderGoalProgress() {
    const goals = Storage.getAll('cf_goals');
    if (!goals.length) return;
    const goal = goals[goals.length - 1];
    const txns = Storage.getAll('cf_transactions');
    const current = txns.filter(t => t.type === 'income' && t.date <= goal.deadline).reduce((s,t) => s + t.amount, 0);
    const pct = Math.min((current / goal.target) * 100, 100);

    const df = document.getElementById('goal-target-display'); if(df) df.textContent = `${goal.title} – ${formatCOP(goal.target)}`;
    const curf = document.getElementById('goal-current-display'); if(curf) curf.textContent = formatCOP(current);
    const pcf = document.getElementById('goal-pct-display'); if(pcf) pcf.textContent = Math.round(pct) + '%';
    const fill = document.getElementById('goal-progress-fill');
    if (fill) { fill.style.width = pct + '%'; fill.className = 'progress-bar__fill progress--high'; }

    if (pct >= 100 && !goal.achieved) {
      goal.achieved = true; Storage.save('cf_goals', goal);
      showToast('¡Meta alcanzada! 🏆', 'success');
      this.evaluateAchievements();
    }
  },
  _renderAchievements() {
    const unlocked = Storage.getAll('cf_achievements').map(a => a.id);
    const list = document.getElementById('achievements-list');
    if (!list) return;
    list.innerHTML = ACHIEVEMENTS_DEF.map(ach => {
      const done = unlocked.includes(ach.id);
      return `<div class="achievement ${done ? 'achievement--unlocked' : 'achievement--locked'}">
        <span class="achievement__icon">${done ? '🏆' : '🔒'}</span>
        <div class="achievement__info"><span class="achievement__name">${ach.name}</span><span class="achievement__desc">${ach.desc}</span></div>
      </div>`;
    }).join('');
  },
  evaluateAchievements() {
    const incomes = Storage.getAll('cf_transactions').filter(t => t.type === 'income');
    const unlocked = Storage.getAll('cf_achievements').map(a => a.id);
    ACHIEVEMENTS_DEF.forEach(ach => {
      if (!unlocked.includes(ach.id) && ach.check(incomes)) {
        Storage.save('cf_achievements', { id: ach.id });
        showToast('Logro desbloqueado: ' + ach.name, 'success');
        this._renderAchievements();
      }
    });
  },
  _handleNewGoal() {
    const target = parseInt(document.getElementById('goal-target').value, 10);
    Storage.save('cf_goals', { title: document.getElementById('goal-title').value || 'Meta', target, deadline: document.getElementById('goal-deadline').value, achieved: false });
    showToast('Meta guardada', 'success');
    this.renderAll();
  }
};
export default Goals;
