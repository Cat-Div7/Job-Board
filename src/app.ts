export function initApp() {
  const app = document.querySelector<HTMLDivElement>("#app");
  
  if (!app) return;
  
  app.innerHTML = `
  <h1>HireFlow</h1>
  <div id="jobs"></div>
  `;

  console.log("App initialized");
}
