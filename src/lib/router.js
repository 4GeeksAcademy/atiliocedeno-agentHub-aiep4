/**
 * Minimal vanilla SPA router using hash-based routing.
 */

class Router {
  constructor(outletId = 'root') {
    this.routes = [];
    this.outlet = document.getElementById(outletId);
    this.customRender = null;
    window.addEventListener('hashchange', () => this.resolve());
    window.addEventListener('popstate', () => this.resolve());
  }

  setRenderFn(fn) {
    this.customRender = fn;
  }

  addRoute(path, handler) {
    this.routes.push({ path, handler });
  }

  navigate(path) {
    window.location.hash = path;
  }

  getPath() {
    return window.location.hash.slice(1) || '/';
  }

  async resolve() {
    const path = this.getPath();
    const route = this.routes.find((r) => r.path === path);

    if (!route) {
      const home = this.routes.find((r) => r.path === '/');
      if (home) {
        const el = await home.handler();
        this.render(el);
      }
      return;
    }

    const el = await route.handler();
    this.render(el);
  }

  render(el) {
    if (this.customRender) {
      this.customRender(el);
    } else if (this.outlet) {
      this.outlet.innerHTML = '';
      this.outlet.appendChild(el);
    }
  }

  init() {
    this.resolve();
  }
}

export const router = new Router('root');
export default Router;