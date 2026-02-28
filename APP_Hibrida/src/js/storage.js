// src/js/storage.js
const Storage = {

  getAll(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch { return []; }
  },

  save(key, item) {
    const all = this.getAll(key);
    const entry = { ...item, id: item.id || ('id_' + Date.now() + '_' + Math.random().toString(36).slice(2)) };
    all.push(entry);
    localStorage.setItem(key, JSON.stringify(all));
    return entry;
  },

  deleteById(key, id) {
    const all = this.getAll(key).filter(i => i.id !== id);
    localStorage.setItem(key, JSON.stringify(all));
  },

  getSettings() {
    try {
      return JSON.parse(localStorage.getItem('cf_settings') || '{"firstTime":true,"businessName":"Mi Negocio"}');
    } catch { return { firstTime: true, businessName: 'Mi Negocio' }; }
  },

  saveSettings(settings) {
    const current = this.getSettings();
    localStorage.setItem('cf_settings', JSON.stringify({ ...current, ...settings }));
  },

  clear(key) {
    localStorage.removeItem(key);
  }
};

export default Storage;
