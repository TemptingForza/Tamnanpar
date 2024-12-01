// Get the modal
var modal = document.getElementById("imageModal");

// Get the image and insert it inside the modal
var modalImg = document.getElementById("modalImage");
var captionText = document.getElementById("caption");

// Function to open modal
function openModal(src, caption) {
  modal.style.display = "block";
  modalImg.src = src;
  captionText.innerHTML = caption;
}

// Function to close modal
function closeModal() {
  modal.style.display = "none";
}

// Add double-click event to each slide image
document.querySelectorAll(".slide img").forEach(function (img) {
  img.addEventListener("dblclick", function () {
    openModal(this.src, this.alt || "Image");
  });
});
