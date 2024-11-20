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

    const sliderWidth = slider.clientWidth;
    const walk = currentX - startX;
    const dragPercentage = (walk / sliderWidth) * 100;

    let targetSlide = currentSlide;

    // Refined slide visibility calculation
    const visibilityThreshold = 30; // Adjust this value as needed
    let mostVisibleSlide = currentSlide;
    let maxVisibility = 0;

    slides.forEach((slide, index) => {
      // Calculate the position of each slide relative to the current view
      const slideOffset = index * sliderWidth;
      const currentPosition = -currentSlide * sliderWidth + walk;

      // Calculate visibility
      const slideLeft = slideOffset;
      const slideRight = slideOffset + sliderWidth;

      const visibleLeft = Math.max(currentPosition, slideLeft);
      const visibleRight = Math.min(currentPosition + sliderWidth, slideRight);

      const visibleWidth = Math.max(0, visibleRight - visibleLeft);
      const visibilityPercentage = (visibleWidth / sliderWidth) * 100;

      console.log(`Slide ${index}:
            Offset: ${slideOffset}
            Current Position: ${currentPosition}
            Visible Width: ${visibleWidth}
            Visibility: ${visibilityPercentage.toFixed(2)}%`);

      // Track the most visible slide
      if (visibilityPercentage > maxVisibility) {
        maxVisibility = visibilityPercentage;
        mostVisibleSlide = index;
      }
    });

    // Determine target slide based on drag direction and visibility
    if (dragPercentage < -visibilityThreshold) {
      // Dragged left significantly
      targetSlide = Math.min(currentSlide + 1, slides.length - 1);
    } else if (dragPercentage > visibilityThreshold) {
      // Dragged right significantly
      targetSlide = Math.max(currentSlide - 1, 0);
    } else {
      // Use the most visible slide
      targetSlide = mostVisibleSlide;
    }

    console.log(`
    Drag Percentage: ${dragPercentage.toFixed(2)}%
    Most Visible Slide: ${mostVisibleSlide}
    Target Slide: ${targetSlide}`);

    // Go to the target slide
    goToSlide(targetSlide);
    resetAutoSlide();
  }

  // Helper function to calculate slide visibility
  function calculateSlideVisibility(slidePosition, sliderWidth, dragDistance) {
    // Calculate the current position of the slider after dragging
    const currentSliderPosition = -currentSlide * sliderWidth + dragDistance;

    // Calculate how much of the slide is visible
    const slideLeft = slidePosition;
    const slideRight = slidePosition + sliderWidth;

    // Calculate the visible portion of the slide
    const visibleLeft = Math.max(currentSliderPosition, slideLeft);
    const visibleRight = Math.min(
      currentSliderPosition + sliderWidth,
      slideRight
    );

    // Calculate the percentage of the slide that is visible
    const visibleWidth = Math.max(0, visibleRight - visibleLeft);
    const visibilityPercentage = (visibleWidth / sliderWidth) * 100;

    return visibilityPercentage;
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
