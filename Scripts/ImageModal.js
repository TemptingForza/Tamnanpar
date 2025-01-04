document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const caption = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");

  // Get all images inside the slider
  const slides = document.querySelectorAll(".slide img");

  // Add click event listener to each image to open the modal
  slides.forEach((slide) => {
    slide.addEventListener("click", function () {
      // Display the modal
      modal.style.display = "flex";
      // Set the image source and caption for the modal
      modalImg.src = this.src;
      caption.textContent = this.alt;
    });
  });

  // Function to close the modal
  function closeModal() {
    modal.style.display = "none";
  }

  // Close the modal if the user clicks outside the modal content
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });
});
