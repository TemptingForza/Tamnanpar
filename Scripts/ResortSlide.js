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
  const autoSlideDelay = 10000;
  let isUserInteracting = false;

  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
  }

  function updateSlider() {
    //const slideWidth =
    //window.innerWidth < 480 ? 90 : window.innerWidth < 768 ? 80 : 100; // Adjust slide width based on screen size
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    //slider.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
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
  window.addEventListener("resize", updateSlider);

  function nextSlide() {
    if (isUserInteracting) return;
    console.log("Next Slide Button Clicked");
    currentSlide = (currentSlide + 1) % slides.length; // Loop back to the first slide
    updateSlider();
    resetAutoSlide(); // Reset the auto slide interval
  }

  function prevSlide() {
    if (isUserInteracting) return;
    console.log("Previous Slide Button Clicked");
    currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Loop back to the last slide
    updateSlider();
    resetAutoSlide(); // Reset the auto slide interval
  }

  function autoSlide() {
    console.log("Auto sliding to next slide");
    //nextSlide(); // Automatically go to the next slide
  }

  function startAutoSlide() {
    setTimeout(() => {
      slideInterval = setInterval(autoSlide, 10000); // Change slide every 10 seconds
    }, autoSlideDelay);
  }

  function resetAutoSlide() {
    isUserInteracting = false;
    clearInterval(slideInterval);
    startAutoSlide(); // Restart the auto slide
  }

  // Start the automatic slide change
  startAutoSlide();

  // Optional: Clear the interval when user interacts with the slider
  slider.addEventListener("mouseenter", () => clearInterval(slideInterval));
  slider.addEventListener("mouseleave", startAutoSlide); // Restart the interval when mouse leaves

  // Button Navigation
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide(); // Reset the auto slide interval on button click
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide(); // Reset the auto slide interval on button click
  });
  //nextBtn.addEventListener("click", nextSlide);
  //prevBtn.addEventListener("click", prevSlide);

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
    isUserInteracting = true;
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

    //const walkThreshold = window.innerWidth / 2;
    const slideWidth =
      window.innerWidth < 480 ? 90 : window.innerWidth < 768 ? 80 : 100; // Adjust according to your designconst slider = document.querySelector("#slides");
    const walk = currentX - startX;

    // Calculate the current slide position in percentage
    const currentSlidePosition = currentSlide * 100; // e.g., slide 0 -> -0%, slide 1 -> -100%, etc.
    const newSlidePosition = currentSlidePosition + (walk / slideWidth) * 100; // Adjust the new position based on drag

    let targetSlide = currentSlide;

    if (newSlidePosition < currentSlidePosition - 50) {
      // If dragged past halfway to the previous slide
      targetSlide = Math.max(currentSlide - 1, 0); // Ensure we don't go below 0
    } else if (newSlidePosition > currentSlidePosition + 50) {
      // If dragged past halfway to the next slide
      targetSlide = Math.min(currentSlide + 1, slides.length - 1); // Ensure we don't go above the last slide
    }
    // Go to the target slide
    goToSlide(targetSlide);

    resetAutoSlide(); // Reset the auto slide interval
    //const walkThreshold = slideWidth / 2;
    //const visiblePercentage = Math.abs(walk) / slideWidth;
    //if (Math.abs(walk) > walkThreshold) {
    //if (visiblePercentage > 0.5) {
    //if (walk > 0) {
    //prevSlide(); // Move to previous slide
    //} else {
    //nextSlide(); // Move to next slide
    //}
    //} else {
    //updateSlider(); // Reset to current slide
    //}
    //resetAutoSlide(); // Reset the auto slide interval
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
