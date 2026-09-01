const slides = [
  "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.",
  "Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere.",
  "Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
  "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.",
  "In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor."
];

let currentSlide = 0;
let isActive = true;
let timer = null;

const contentEl = document.getElementById('content');
const toggleBtn = document.getElementById('toggleBtn');
const speedSlider = document.getElementById('speedSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slideIndicator = document.getElementById('slideIndicator');

function scrambleWord(word) {
  if (word.length <= 3) return word;

  let chars = word.split('');
  let idx = Math.floor(Math.random() * (chars.length - 3)) + 1;

  let temp = chars[idx];
  chars[idx] = chars[idx + 1];
  chars[idx + 1] = temp;

  return chars.join('');
}

function step() {
  if (!isActive) return;

  let currentText = slides[currentSlide];
  let words = currentText.split(/(\s+)/);

  let transformed = words.map(w => {
    if (/\s+/.test(w)) return w;
    return Math.random() > 0.4 ? scrambleWord(w) : w;
  }).join('');

  contentEl.innerText = transformed;
}

function updateSlideDisplay() {
  slideIndicator.innerText = `Slide ${currentSlide + 1} of ${slides.length}`;
  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === slides.length - 1;

  if (!isActive) {
    contentEl.innerText = slides[currentSlide];
  }
}

function start() {
  stop();
  timer = setInterval(step, parseInt(speedSlider.value));
}

function stop() {
  if (timer) clearInterval(timer);
}

toggleBtn.addEventListener('click', () => {
  isActive = !isActive;
  if (isActive) {
    toggleBtn.innerText = "Pause Simulation";
    toggleBtn.classList.remove('off');
    start();
  } else {
    toggleBtn.innerText = "Start Simulation";
    toggleBtn.classList.add('off');
    stop();
    contentEl.innerText = slides[currentSlide];
  }
});

prevBtn.addEventListener('click', () => {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlideDisplay();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    updateSlideDisplay();
  }
});

speedSlider.addEventListener('input', () => {
  if (isActive) start();
});

updateSlideDisplay();
start();
