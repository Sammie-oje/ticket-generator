const submitButton = document.querySelector("#submit");
const nameInput = document.querySelector("#full-name");
const email = document.querySelector("#email");
const userName = document.querySelector("#username");
const fileInput = document.querySelector("#upload");
const dropZone = document.querySelector("#upload-img-container");

const maxSize = 500 * 1024;

let hasRun = true;

submitButton.addEventListener("click", validateInputs);

function validateInputs(e) {
  e.preventDefault();

  const inputValue = nameInput.value;
  const regex = /^[A-Za-z]+(\s[A-Za-z]+)+$/;
  const nameValid = regex.test(inputValue);

  const emailValue = email.value;
  const emailRegex = /^[A-Za-z0-9-_]+@[A-Za-z]+\.[A-Za-z]{2,}$/i;
  const emailValid = emailRegex.test(emailValue);

  const userNameValue = userName.value;
  const userRegex = /^@[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/;
  const userNameValid = userRegex.test(userNameValue);

  if (nameValid && emailValid && userNameValid) {
    generateTicket();
  } else {
    const labels = document.querySelectorAll(".label");

    const errorValue = () => {
      if (!nameValid) {
        const nameErr = document.querySelector("#nameErr");
        nameErr.innerHTML = `
          <img src="assets/images/icon-info2.svg" alt="error">
          <span>Enter a valid name</span>
        `;
      } else if (!emailValid) {
        const emailErr = document.querySelector("#emailErr");
        emailErr.innerHTML = `
          <img src="assets/images/icon-info2.svg" alt="error">
          <span>Enter a valid email address</span>`;
      } else if (!userNameValid) {
        const userErr = document.querySelector("#userErr");
        userErr.innerHTML = `
          <img src="assets/images/icon-info2.svg" alt="error">
          <span>Enter a valid user name</span>
          `;
      }
    };
    errorValue();

    /*     if (hasRun) {
      labels.forEach((label) => {
        const errorPar = document.createElement("p");
        errorPar.innerHTML = `

          `;
        errorPar.classList.add("error-par");
        label.appendChild(errorPar);
      });
      hasRun = false;
    } */
  }
}

document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "change-img") {
    e.preventDefault();
    e.stopPropagation();
    fileInput.click();
  }

  if (e.target && e.target.id === "remove-img") {
    e.preventDefault();
    e.stopPropagation();
    fileInput.value = "";

    const uploadIcon = document.querySelector("#upload-icon");
    uploadIcon.src = "assets/images/icon-upload.svg";

    const desc = document.getElementById("input-desc");
    desc.innerHTML = "Drag and drop or click to upload";
  }
});

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  validateFileSize(file);
});

const validateFileSize = (file) => {
  if (file) {
    const fileSize = file.size;
    console.log(fileSize);
    if (fileSize <= maxSize) {
      console.log("Image size is valid");

      const uploadIcon = document.querySelector("#upload-icon");
      const reader = new FileReader();
      reader.onload = function renderImg(e) {
        uploadIcon.src = "";
        uploadIcon.src = e.target.result;
      };
      reader.readAsDataURL(file);

      const desc = document.getElementById("input-desc");
      function updateDesc() {
        desc.innerHTML = "";
        desc.innerHTML = `
        <button class="img-btn" id="remove-img">Remove image</button>
        <button class="img-btn" id="change-img">Change image</button>
        `;
      }

      const errorMsg = document.querySelector(".error-msg");
      errorMsg.style.color = "white";

      updateDesc();
    } else {
      console.log("Image size is invalid");

      const errorMsg = document.querySelector(".error-msg");

      errorMsg.style.color = "hsl(7, 71%, 60%)";

      return;
    }
  }
};

//Drag and drop feature
/* ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropZone.addEventListener(eventName, (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
});

dropZone.addEventListener("drop", (e) => {
  const dt = e.dataTransfer;
  const files = dt.files;
  if (files.length > 0) {
    const uploadedFile = files[0];
    const newFileList = new DataTransfer();
    newFileList.files.add(uploadedFile);

    fileInput.files = newFileList.files;

    validateFileSize(uploadedFile);
  }
});

dropZone.addEventListener("click", () => {
  fileInput.click();
}); */

function generateTicket() {
  const inputValue = nameInput.value;

  const emailValue = email.value;

  const userNameValue = userName.value;

  const date = new Date();

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthName = month[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const generateRandomNum = (length, min, max) => {
    const randomLists = [];
    for (let i = 0; i < length; i++) {
      const randomNum = Math.floor(Math.random() * (max - min + 1) + 1);
      randomLists.push(randomNum);
    }
    return randomLists.join("");
  };

  const randomNumbers = generateRandomNum(5, 1, 9);

  const uploadIcon = document.querySelector("#upload-icon");
  const imageSrc = uploadIcon.src;

  const main = document.querySelector("main");
  main.innerHTML = "";
  main.innerHTML = `
      <section id="hd-section">
        <img
          src="assets/images/logo-full.svg"
          alt="coding conf logo"
          id="main-img"
        />
        <h3 class="gradient-hd">
          Congrats, <span id="gradient-text">${inputValue}</span>! <br>
          Your ticket is ready.
        </h3>
        <p class="about">
          We've emailed your ticket to <br>
          <span id="email-text">${emailValue}</span> and will send updates in <br>
          the run up to the event.
        </p>
      </section>
      
      <section class="ticket-section">
          <img 
            src="assets/images/pattern-ticket.svg" 
            width="300" 
            height="300"
            id="ticket-img"
          />
          <p class="ticket-hd">
            <img 
              src="assets/images/logo-mark.svg" 
              alt="logo" 
              id="ticket-logo"
              width="30"
              height="30"
            />
            <span>Coding Conf</span>
          </p>
          <p id="date">
            ${monthName} ${day}, ${year} / Austin, TX
          </p>

          <div class="user-info">
            <img 
              src="${imageSrc}" 
              alt="avatar" 
              id="ticket-avatar" 
              width="40" 
              height="40"
            />
            <div id="info-wrapper">
              <p id="user-name">${inputValue}</p>
              <p id="github-info">
                <img src="assets/images/icon-github.svg">
                <span>${userNameValue}</span>
              </p>            
            </div>
          </div>
        <span id="random-num">#${randomNumbers}</span>

      </section>
    `;
}
