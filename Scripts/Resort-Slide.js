const slider = document.querySelector("#slides");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;
let startX;
let currentX;
let isDragging = false;

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

function updateSlider() {
  // Update slider position
  slider.style.transform = `translateX(-${currentSlide * 33.333}%)`;

  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function nextSlide() {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    updateSlider();
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlider();
  }
}

// Button Navigation
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Dot Navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => goToSlide(index));
});

// Touch/Mouse Events
function handleDragStart(e) {
  isDragging = true;
  startX = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX;
  slider.style.transition = "none";
}

function handleDragMove(e) {
  if (!isDragging) return;

  e.preventDefault();
  currentX = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX;
  const walk = currentX - startX;
  const sliderPosition = -(currentSlide * 33.333);

  slider.style.transform = `translateX(calc(${sliderPosition}% + ${walk}px))`;
}

function handleDragEnd() {
  if (!isDragging) return;

  isDragging = false;
  slider.style.transition = "transform 0.5s ease";

  const walkThreshold = 100;
  const walk = currentX - startX;

  if (Math.abs(walk) > walkThreshold) {
    if (walk > 0 && currentSlide > 0) {
      prevSlide();
    } else if (walk < 0 && currentSlide < slides.length - 1) {
      nextSlide();
    } else {
      updateSlider(); // Reset to current slide
    }
  } else {
    updateSlider(); // Reset to current slide
  }
}

// Mouse Events
slider.addEventListener("mousedown", handleDragStart);
window.addEventListener("mousemove", handleDragMove);
window.addEventListener("mouseup", handleDragEnd);

// Touch Events
slider.addEventListener("touchstart", handleDragStart);
slider.addEventListener("touchmove", handleDragMove);
slider.addEventListener("touchend", handleDragEnd);

// Keyboard Navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});
