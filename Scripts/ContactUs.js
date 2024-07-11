var contactlink = document.getElementById("contact-link");
var contactcontainer = document.getElementById("contact-container");
var closecontact = document.getElementById("close-contact");

contactlink.addEventListener('click', function(event) {
  event.preventDefault();
  contactcontainer.style.display = "block";
});
closecontact.addEventListener('click', function() {
  contactcontainer.style.display = "none";
});
window.addEventListener('click', function(event) {
  if (event.target == contactcontainer) {
    contactcontainer.style.display = "none";
  }
});