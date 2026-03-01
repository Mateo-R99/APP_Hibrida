export const router = {
  navigate(screen) {
    const map = { home: '/', income: '/ingresos.html', expenses: '/gastos.html', movements: '/movimientos.html', goals: '/metas.html' };
    if (map[screen]) window.location.href = map[screen];
  }
};
