type RouteHandler = () => void;

const routes = new Map<string, RouteHandler>();

export function registerRoute(path: string, handler: RouteHandler) {
  routes.set(path, handler);
}

export function navigate(path: string) {
  window.history.pushState({}, "", path);
  resolveRoute();
}

export function resolveRoute() {
  const path = window.location.pathname;

  const handler = routes.get(path);

  if (handler) handler();
  else console.warn("Route Not Found:", path);
}

window.addEventListener("popstate", resolveRoute);
