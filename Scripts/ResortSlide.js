document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector("#slides");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dots = document.querySelectorAll(".dot");

  let currentSlide = 0;
  let startX;
  let currentX;
  let isDragging = false;
  let slideInterval;

  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
  }

  function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    //slider.style.transform = `translateX(-${currentSlide * 33.333}%)`;

    console.log(
      `Current Slide: ${currentSlide + 1} - Content: ${
        slides[currentSlide].textContent
      }`
    );

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  function nextSlide() {
    console.log("Next Slide Button Clicked");
    currentSlide = (currentSlide + 1) % slides.length; // Loop back to the first slide
    updateSlider();
    resetAutoSlide(); // Reset the auto slide interval
  }

  function prevSlide() {
    console.log("Previous Slide Button Clicked");
    currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Loop back to the last slide
    updateSlider();
    resetAutoSlide(); // Reset the auto slide interval
  }

  function autoSlide() {
    nextSlide(); // Automatically go to the next slide
  }

  function startAutoSlide() {
    slideInterval = setInterval(autoSlide, 5000); // Change slide every 3 seconds
  }

  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide(); // Restart the auto slide
  }

  // Start the automatic slide change
  startAutoSlide();

  // Optional: Clear the interval when user interacts with the slider
  slider.addEventListener("mouseenter", () => clearInterval(slideInterval));
  slider.addEventListener("mouseleave", startAutoSlide); // Restart the interval when mouse leaves

  // Button Navigation
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Dot Navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
      resetAutoSlide(); // Reset the auto slide interval
    });
  });

  // Touch/Mouse Events
  function handleDragStart(e) {
    isDragging = true;
    startX = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX;
    slider.style.transition = "none";
    clearInterval(slideInterval); // Clear the auto slide interval on drag start
  }

  function handleDragMove(e) {
    if (!isDragging) return;

    e.preventDefault();
    currentX = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX;
    const walk = currentX - startX;

    slider.style.transform = `translateX(calc(-${
      currentSlide * 100
    }% + ${walk}px))`;
  }

  function handleDragEnd() {
    if (!isDragging) return;

    isDragging = false;
    slider.style.transition = "transform 0.5s ease";

    const walkThreshold = 100;
    const walk = currentX - startX;

    if (Math.abs(walk) > walkThreshold) {
      if (walk > 0) {
        prevSlide(); // Move to previous slide
      } else {
        nextSlide(); // Move to next slide
      }
    } else {
      updateSlider(); // Reset to current slide
    }
    resetAutoSlide(); // Reset the auto slide interval
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
});
