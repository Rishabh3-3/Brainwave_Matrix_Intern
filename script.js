const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.sort((a, b) => a.start.localeCompare(b.start));

  tasks.forEach((task, index) => {
    const card = document.createElement("div");
    card.className = "task-card";

    const info = document.createElement("div");
    info.className = "info";

    info.innerHTML = `<strong>#${index + 1}. ${task.title}</strong><br>${task.start} - ${task.end}`;


    const actions = document.createElement("div");
    actions.className = "actions";

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑";
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    actions.appendChild(delBtn);
    card.appendChild(info);
    card.appendChild(actions);
    taskList.appendChild(card);
  });
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("taskTitle").value;
  const start = document.getElementById("startTime").value;
  const end = document.getElementById("endTime").value;

  tasks.push({ title, start, end });
  saveTasks();
  renderTasks();
  taskForm.reset();
});

renderTasks();

const modeToggle = document.getElementById("modeToggle");
const modeLabel = document.getElementById("modeLabel");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  modeToggle.checked = true;
  modeLabel.textContent = "Dark Mode";
}

modeToggle.addEventListener("change", () => {
  if (modeToggle.checked) {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
    modeLabel.textContent = "Dark Mode";
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
    modeLabel.textContent = "Light Mode";
  }
});