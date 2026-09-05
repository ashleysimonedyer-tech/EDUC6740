const slides = [
  "Dyslexia is a neurodevelopmental learning difference (unrelated to general intellectual ability) characterised primarily by persistent difficulties with fluent reading, phonological processing, word recognition, and spelling (American Psychiatric Association, 2013; Snowling et al., 2020).",
  "Cognitively and physically, students experience memory limits, visual stress, lower neural adaptation to repetitive sensory input, and subtle motor coordination or posture challenges (Perrachione et al., 2016; Quercia, 2026; Williams, 2025). ",
  "Despite these barriers, dyslexic learners frequently demonstrate distinct strengths, such as  increased visual-spatial reasoning, vivid 3D spatial visualisation, and strong problem-solving capacities (Eide & Eide, 2011; von Károlyi et al., 2003).",
  "In the classroom, high cognitive load demands and time constraints can lead to mental fatigue, inattention, and emotional impacts such as reading anxiety. (Carroll et al., 2005; Farrell, 2022; López-Zamora et al., 2025).",
  "Students may require variance to the usual class instructional pacing, accessible formats and extended time to access the curriculum without being hindered by underlying decoding and processing barriers (Almgren Bäck et al., 2023; Farrell, 2022; Lewandowski et al., 2008; Wood et al., 2018)."
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
    toggleBtn.innerText = "Take a breather";
    toggleBtn.classList.remove('off');
    start();
  } else {
    toggleBtn.innerText = "Restart";
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
