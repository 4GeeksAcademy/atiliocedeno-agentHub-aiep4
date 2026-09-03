/**
 * Minimal reactive store for vanilla JavaScript.
 */

export class Store {
  constructor(initialState, options = {}) {
    this.options = options;
    this.state = { ...initialState };
    this.listeners = new Map();
    this.globalListeners = new Set();

    if (options.persistKey) {
      try {
        const saved = localStorage.getItem(options.persistKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          // Merge saved state over initial, but keep initial defaults for empty arrays
          this.state = { ...initialState };
          for (const key of Object.keys(parsed)) {
            if (Array.isArray(parsed[key]) && parsed[key].length === 0 && Array.isArray(initialState[key]) && initialState[key].length > 0) {
              this.state[key] = initialState[key];
            } else {
              this.state[key] = parsed[key];
            }
          }
        }
      } catch {}
    }
  }

  get(key) {
    return this.state[key];
  }

  set(key, value) {
    const oldValue = this.state[key];
    if (oldValue === value) return;
    this.state[key] = value;
    this.notify(key);
    this.notifyGlobal();
    if (this.options.persistKey) {
      try {
        localStorage.setItem(this.options.persistKey, JSON.stringify(this.state));
      } catch {}
    }
  }

  update(fn) {
    const updates = fn(this.state);
    const keys = Object.keys(updates);
    let changed = false;
    for (const key of keys) {
      if (this.state[key] !== updates[key]) {
        this.state[key] = updates[key];
        changed = true;
        this.notify(key);
      }
    }
    if (changed) {
      this.notifyGlobal();
      if (this.options.persistKey) {
        try {
          localStorage.setItem(this.options.persistKey, JSON.stringify(this.state));
        } catch {}
      }
    }
  }

  subscribe(key, listener) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key).add(listener);
    return () => this.listeners.get(key)?.delete(listener);
  }

  subscribeGlobal(listener) {
    this.globalListeners.add(listener);
    return () => this.globalListeners.delete(listener);
  }

  notify(key) {
    this.listeners.get(key)?.forEach((l) => l());
  }

  notifyGlobal() {
    this.globalListeners.forEach((l) => l());
  }
}