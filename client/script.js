

const usernameEl = document.getElementById("username");
const passwordEl = document.getElementById("password");
const messageEl  = document.getElementById("message");
const submitBtn  = document.getElementById("submitBtn");
const btnText    = document.getElementById("btnText");
const loginTab   = document.getElementById("loginTab");
const registerTab= document.getElementById("registerTab");
const card       = document.getElementById("authCard");

let currentMode = "login";

window.switchTab = function(mode) {
  currentMode = mode;
  loginTab.classList.toggle("active", mode === "login");
  registerTab.classList.toggle("active", mode === "register");
  btnText.textContent = mode === "login" ? "login ♡" : "register ✿";
  hideMessage();
};

window.handleSubmit = function() {
  if (currentMode === "login") {
    loginUser();
  } else {
    registerUser();
  }
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSubmit();
});

async function registerUser() {
  const username = usernameEl.value.trim();
  const password = passwordEl.value;

  if (!username || !password) {
    showMessage("fill all the fields to proceed 🌸", "error");
    shakeCard();
    return;
  }

  setLoading(true);

  try {
    const res  = await fetch("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (data.success) {
      showMessage("✿ " + data.message + " ✿", "success");
      spawnConfetti();
      usernameEl.value = "";
      passwordEl.value = "";
    } else {
      showMessage("✦ " + data.message + " ✦", "error");
      shakeCard();
    }
  } catch (err) {
    console.error(err);
    showMessage("server connection failed 🌧️", "error");
    shakeCard();
  }

  setLoading(false);
}

async function loginUser() {
  const username = usernameEl.value.trim();
  const password = passwordEl.value;

  if (!username || !password) {
    showMessage("fill all the fields to proceed 🌸", "error");
    shakeCard();
    return;
  }

  setLoading(true);

  try {
    const res  = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (data.success) {
      showMessage("✿ " + data.message + " ✿", "success");
      spawnConfetti();
    } else if (res.status === 403) {
      showMessage("🔒 " + data.message, "locked");
      shakeCard();
    } else {
      showMessage("✦ " + data.message + " ✦", "error");
      shakeCard();
    }
  } catch (err) {
    console.error(err);
    showMessage("server connection failed 🌧️", "error");
    shakeCard();
  }

  setLoading(false);
}

function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = "message";
  void messageEl.offsetWidth;
  messageEl.className = "message " + type + " visible";
}

function hideMessage() {
  messageEl.className = "message";
  messageEl.textContent = "";
}

function setLoading(on) {
  submitBtn.disabled = on;
  submitBtn.style.opacity = on ? "0.7" : "1";
  btnText.textContent = on
    ? "loading..."
    : currentMode === "login" ? "login ♡" : "register ✿";
}

function shakeCard() {
  card.style.animation = "shake .45s cubic-bezier(.36,.07,.19,.97) both";
  setTimeout(() => {
    card.style.animation = "";
  }, 500);
}

const CONFETTI_COLORS = [
  "#ff85a1","#ffb3ce","#b5e5cf","#c9b8f0",
  "#fff3b0","#ffd6a5","#a2d2ff","#cdb4db"
];

function spawnConfetti() {
  const centerX = window.innerWidth / 2;
  for (let i = 0; i < 48; i++) {
    const el = document.createElement("div");
    el.className = "confetti-piece";
    el.style.cssText = `
      left: ${centerX + (Math.random() - .5) * 340}px;
      top: ${80 + Math.random() * 60}px;
      background: ${CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]};
      width: ${6 + Math.random() * 8}px;
      height: ${6 + Math.random() * 8}px;
      border-radius: ${Math.random() > .5 ? "50%" : "2px"};
      animation-delay: ${Math.random() * .6}s;
      animation-duration: ${1 + Math.random() * .8}s;
    `;
    document.body.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }
}