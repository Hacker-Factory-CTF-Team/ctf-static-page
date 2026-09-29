/*
 * CTF challenge logic
 *
 * The flags are not stored as plain text here. This is only light
 * obfuscation — GitHub Pages is client-side, so it is not a security
 * boundary. The goal is simply to keep the validation logic out of HTML.
 */

const FLAG_DATA = {
  "01": "Q1RGe3dlbGNvbWVfdG9fdGhlX2N5YmVyX2ZhaXJ9",
  "02": "Q1RGe0NBRVNBUl9JU19DTEFTU0lDfQ==",
  "03": "Q1RGe0NIRUNLX1RIRV9DTElFTlR9"
};

function decodeFlag(value) {
  try {
    return atob(value);
  } catch {
    return "";
  }
}

function getCompletedChallenges() {
  try {
    const saved = JSON.parse(localStorage.getItem("ctf_completed") || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function completeChallenge(id) {
  const completed = getCompletedChallenges();
  if (!completed.includes(id)) completed.push(id);
  localStorage.setItem("ctf_completed", JSON.stringify(completed));
}

function initFlagChallenge(id, inputId, buttonId, resultId, successText, errorText) {
  const input = document.getElementById(inputId);
  const button = document.getElementById(buttonId);
  const result = document.getElementById(resultId);
  const expected = decodeFlag(FLAG_DATA[id]);

  if (!input || !button || !result || !expected) return;

  function submit() {
    const value = input.value.trim();

    if (value === expected) {
      completeChallenge(id);
      result.className = result.className.replace(/\berror\b/g, "").trim() + " success";
      result.textContent = successText;
      input.disabled = true;
      button.disabled = true;
    } else {
      result.className = result.className.replace(/\bsuccess\b/g, "").trim() + " error";
      result.textContent = errorText;
    }
  }

  button.addEventListener("click", submit);
  input.addEventListener("keydown", event => {
    if (event.key === "Enter") submit();
  });
}

// Challenge 01 — the flag itself is intentionally discoverable in the HTML.
if (document.getElementById("flag") && document.getElementById("submit")) {
  initFlagChallenge(
    "01",
    "flag",
    "submit",
    "result",
    "✓ FLAG CORRECTA — +100 puntos. Reto completado.",
    "✗ FLAG INCORRECTA — sigue investigando."
  );
}

// Challenge 02 — Caesar decoder + external flag validation.
if (document.getElementById("shift") && document.getElementById("try")) {
  const CIPHERTEXT = "FWR{FDHVDU_LV_FODVVLF}";
  const shiftInput = document.getElementById("shift");
  const decoded = document.getElementById("decoded");

  function caesarDecode(text, shift) {
    return [...text].map(ch => {
      const code = ch.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode((code - 65 - shift + 26) % 26 + 65);
      }
      if (code >= 97 && code <= 122) {
        return String.fromCharCode((code - 97 - shift + 26) % 26 + 97);
      }
      return ch;
    }).join("");
  }

  document.getElementById("try").addEventListener("click", () => {
    const shift = Number(shiftInput.value);
    decoded.textContent = Number.isInteger(shift) && shift >= 0 && shift <= 25
      ? "→ " + caesarDecode(CIPHERTEXT, shift)
      : "Introduce un desplazamiento entre 0 y 25.";
  });

  initFlagChallenge(
    "02",
    "flag",
    "submit",
    "result",
    "✓ FLAG CORRECTA — +100 puntos.",
    "✗ FLAG INCORRECTA."
  );
}

// Challenge 03 — login remains deliberately useless; the interesting part is inspection.
if (document.getElementById("login")) {
  document.getElementById("login").addEventListener("click", () => {
    document.getElementById("result").textContent = "Acceso denegado.";
  });

  initFlagChallenge(
    "03",
    "flagInput",
    "submitFlag",
    "flagResult",
    "✓ FLAG CORRECTA — +100 puntos.",
    "✗ Flag incorrecta. Revisa el código de la página."
  );
}
