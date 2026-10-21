const certs = [
  ["Programming in Python", "Coursera"],
  ["C Programming with DSA Foundation", "Coursera"],
  ["Advanced Java Development", "Coursera"],
  ["Create a Supermarket App using Java OOP", "Coursera"],
  ["Preparing for the AZ-900 Microsoft Azure Fundamentals Exam", "Coursera"],
  ["MongoDB Basics for Students - Skill Badge (Skill-a-thon 2026)", "ICT Academy"],
  ["Celonis Foundations", "Celonis Academy"],
  ["Get Data Into Celonis", "Celonis Academy"],
  ["Process Mining - From Theory to Execution", "Celonis Academy"],
  ["Build Action Flows", "Celonis Academy"],
  ["Process Mining Audit Professional", "Celonis Academy"],
  ["Process Automation Concepts", "Celonis Academy"],
  ["Digital Application Fundamentals (STEM)", "FutureSkills Prime (NASSCOM)"]
];

const list = document.getElementById("certList");
const filters = document.querySelector(".filters");
let active = "All";

function render() {
  list.innerHTML = "";
  certs.filter(c => active === "All" || c[1] === active).forEach(([title, org]) => {
    const li = document.createElement("li");
    const t = document.createElement("span");
    t.textContent = title;
    const o = document.createElement("span");
    o.className = "org";
    o.textContent = org;
    li.append(t, o);
    list.appendChild(li);
  });
  filters.querySelectorAll("button").forEach(b =>
    b.setAttribute("aria-pressed", b.dataset.org === active));
}

["All", ...new Set(certs.map(c => c[1]))].forEach(org => {
  const b = document.createElement("button");
  b.textContent = org;
  b.dataset.org = org;
  b.addEventListener("click", () => { active = org; render(); });
  filters.appendChild(b);
});
render();

// Typing effect
const words = ["C", "Python", "JavaScript", "Java", "MongoDB"];
const el = document.getElementById("typed");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
let w = 0, i = 0, del = false;
function tick() {
  const word = words[w];
  el.textContent = word.slice(0, i);
  if (!del && i === word.length) { del = true; return setTimeout(tick, 1300); }
  if (del && i === 0) { del = false; w = (w + 1) % words.length; }
  i += del ? -1 : 1;
  setTimeout(tick, del ? 60 : 110);
}
if (reduce) el.textContent = words.join(", "); else tick();

// Theme toggle (remembered when storage is available)
const root = document.documentElement;
try { const s = localStorage.getItem("theme"); if (s) root.dataset.theme = s; } catch (e) {}
document.getElementById("theme").addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

document.getElementById("year").textContent = new Date().getFullYear();
