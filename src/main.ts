import { initApp } from "./app.ts";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (app) initApp(app);
