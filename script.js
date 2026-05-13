const drinkSelect = document.getElementById("drinkSelect");
const sizeSelect = document.getElementById("sizeSelect");
const countInput = document.getElementById("countInput");
const weightInput = document.getElementById("weightInput");
const userTypeSelect = document.getElementById("userTypeSelect");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const caffeineText = document.getElementById("caffeineText");
const limitText = document.getElementById("limitText");

function loadDrinks() {
  drinkSelect.innerHTML = "";
  drinks.forEach(d => {
    const opt = document.createElement("option");
    opt.value = d.name;
    opt.textContent = d.name;
    drinkSelect.appendChild(opt);
  });
  updateSizes();
}

function updateSizes() {
  const selectedDrink = drinks.find(x => x.name === drinkSelect.value);
  sizeSelect.innerHTML = "";
  if (selectedDrink) {
    Object.keys(selectedDrink.sizes).forEach(s => {
      const opt = document.createElement("option");
      opt.value = s;
      opt.textContent = `${s}ml`;
      sizeSelect.appendChild(opt);
    });
  }
  calculateCaffeine();
}

function calculateCaffeine() {
  const d = drinks.find(x => x.name === drinkSelect.value);
  if (!d) return;

  const size = sizeSelect.value;
  const count = Number(countInput.value) || 0;
  const weight = Number(weightInput.value) || 0;
  const userType = userTypeSelect.value;

  const caffeine = d.sizes[size] * count;

  let limit = 400;
  if (userType === "pregnant") {
    limit = 200;
  } else if (userType === "teen") {
    limit = Math.floor(weight * 2.5);
  } else {
    if (weight < 50) limit = 300;
  }

  const percent = (caffeine / limit) * 100;
  const displayPercent = Math.min(percent, 100);

  progressFill.style.height = `${displayPercent}%`;
  progressText.innerText = `${caffeine} / ${limit}mg (${percent.toFixed(1)}%)`;

  if (percent >= 100) {
    progressFill.style.background = "linear-gradient(to top, #ef4444, #f87171)";
    progressFill.style.boxShadow = "0 0 15px rgba(239, 68, 68, 0.5)";
  } else {
    progressFill.style.background = "linear-gradient(to top, #10b981, #34d399)";
    progressFill.style.boxShadow = "0 0 15px rgba(16, 185, 129, 0.5)";
  }

  caffeineText.innerText = `총 카페인: ${caffeine}mg`;
  limitText.innerText = `권장량: ${limit}mg (${caffeine > limit ? "⚠️ 초과" : "✅ 정상"})`;
  limitText.style.color = caffeine > limit ? "#ef4444" : "#9ca3af";
}

drinkSelect.addEventListener("change", updateSizes);
sizeSelect.addEventListener("change", calculateCaffeine);
countInput.addEventListener("change", calculateCaffeine);
countInput.addEventListener("input", calculateCaffeine);
weightInput.addEventListener("change", calculateCaffeine);
weightInput.addEventListener("input", calculateCaffeine);
userTypeSelect.addEventListener("change", calculateCaffeine);
window.onload = loadDrinks;