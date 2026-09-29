const CTF = {
  challenges: {
    "01": { points: 100 },
    "02": { points: 100 },
    "03": { points: 100 },
    "04": { points: 250 }
  }
};

function getCompleted() {
  try {
    return JSON.parse(localStorage.getItem("ctf_completed") || "[]");
  } catch {
    return [];
  }
}

function updateHome() {
  const completed = getCompleted();
  const count = document.getElementById("completedCount");
  const score = document.getElementById("score");

  if (count) count.textContent = completed.length;
  if (score) {
    score.textContent = completed.reduce(
      (sum, id) => sum + (CTF.challenges[id]?.points || 0), 0
    );
  }

  document.querySelectorAll(".challenge").forEach(card => {
    const id = card.dataset.challenge;
    const status = card.querySelector(".status");
    const link = card.querySelector(".challenge-link");

    card.classList.remove("locked");
    card.classList.add("active");

    if (completed.includes(id)) {
      if (status) status.textContent = id === "04" ? "DONE" : "DONE";
      if (link) link.textContent = "COMPLETADO ✓";
    } else if (id === "04") {
      if (status) status.textContent = "ADVANCED";
    } else {
      if (status) status.textContent = "OPEN";
    }
  });
}

document.getElementById("resetProgress")?.addEventListener("click", () => {
  if (confirm("¿Seguro que quieres borrar tu progreso?")) {
    localStorage.removeItem("ctf_completed");
    updateHome();
  }
});

updateHome();
