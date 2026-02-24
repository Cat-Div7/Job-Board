type RouteHandler = (params?: Record<string, string>) => void;

const routes: {
  path: string;
  handler: RouteHandler;
}[] = [];

export function registerRoute(path: string, handler: RouteHandler) {
  routes.push({ path, handler });
}

function matchRoute(url: string) {
  for (const route of routes) {
    const routeParts = route.path.split("/");
    const urlParts = url.split("/");

    if (routeParts.length !== urlParts.length) continue;

    const params: Record<string, string> = {};
    let matched = true;

    routeParts.forEach((part, i) => {
      if (part.startsWith(":")) {
        params[part.slice(1)] = urlParts[i];
      } else if (part !== urlParts[i]) {
        matched = false;
      }
    });

    if (matched) {
      return { handler: route.handler, params };
    }
  }
}

export function navigate(path: string) {
  window.history.pushState({}, "", path);
  resolveRoute();
}

export function resolveRoute() {
  const path = window.location.pathname;

  const match = matchRoute(path);

  if (match) match.handler(match.params);
}

export function initRouter() {
  document.addEventListener("click", (e) => {
    const link = (e.target as HTMLElement).closest(
      "a[data-link]",
    ) as HTMLAnchorElement | null;

    if (!link) return;
    e.preventDefault();

    history.pushState({}, "", link.href);
    resolveRoute();
  });

  window.addEventListener("popstate", resolveRoute);
}

window.addEventListener("popstate", resolveRoute);
