const colors = {
  NONE: "#161b22",
  FIRST_QUARTILE: "#0f2d1f",
  SECOND_QUARTILE: "#0f5132",
  THIRD_QUARTILE: "#198754",
  FOURTH_QUARTILE: "#2ecc71",
};

function renderGraph(calendar, username) {
  const grid = document.getElementById("grid");
  const usernameEl = document.getElementById("username");
  const totalEl = document.getElementById("total");
  const statusEl = document.getElementById("status");

  grid.innerHTML = "";

  usernameEl.textContent = `@${username}`;
  totalEl.textContent = `${calendar.totalContributions.toLocaleString()} contributions in the last year`;

  const allDays = calendar.weeks.flatMap((w) => w.contributionDays);

  allDays.forEach((day) => {
    const cell = document.createElement("div");
    cell.style.width = "14px";
    cell.style.height = "14px";
    cell.style.borderRadius = "3px";
    cell.style.backgroundColor = colors[day.contributionLevel] ?? colors.NONE;
    cell.title = `${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}`;
    grid.appendChild(cell);
  });

  statusEl.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
}

document.getElementById("close").addEventListener("click", () => {
  window.close();
});

async function init() {
  const username = await window.api.getUsername();
  const calendar = await window.api.fetchContributions(username);
  renderGraph(calendar, username);

  setInterval(
    async () => {
      const fresh = await window.api.fetchContributions(username);
      renderGraph(fresh, username);
    },
    10 * 60 * 1000,
  );
}

init();
