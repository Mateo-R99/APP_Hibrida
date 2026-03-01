// src/js/utils.js

export function formatCOP(amount) {
  if (typeof amount !== 'number') return '$0';
  return '$' + Math.round(amount).toLocaleString('es-CO');
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  const months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  return `${parseInt(d)} ${months[parseInt(m)-1]} ${y}`;
}

let _toastTimer = null;

export function showToast(message, type = 'success', duration = 2500) {
  const toast = document.getElementById('cf-toast');
  if (!toast) return;

  if (_toastTimer) clearTimeout(_toastTimer);

  toast.textContent = message;
  toast.className   = `toast toast--visible toast--${type}`;

  _toastTimer = setTimeout(() => {
    toast.className = 'toast';
  }, duration);
}
