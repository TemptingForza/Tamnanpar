document.addEventListener("DOMContentLoaded", () => {
  //DataForValidation file:///C:/Users/manra/Documents/Tamnanpar/Scripts/ContactUs.js:1
  const firstName = document.getElementById("User-First");
  const lastName = document.getElementById("User-Surname");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");
  const message = document.getElementById("form-input-uid-8-0");
  const submit = document.getElementById("submit");

  function DataForValidation() {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("phone", phone);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "php/Validation.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const response = JSON.parse(xhr.response);
        if (response.status === "success") {
          console.log("Hanlde success");
        } else {
          console.log("Handle error");
        }
      }
    };
    /*header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");

    fetch("Validation.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Validation passed: " + data.message);
        } else {
          alert("Validation failed: " + data.message);
        }
      })
      .catch((error) => console.error("Error:", error));*/
  }

  function valid() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "flex";
  }
  function notvalid() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none";
  }

  function send() {
    console.log(firstName.value + " " + lastName.value);
    console.log(firstName.value);
    console.log(lastName.value);
    console.log(phone.value);
    console.log(email.value);
    console.log(message.value);
  }

  submit.addEventListener("click", DataForValidation);
});
