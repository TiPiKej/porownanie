// nav items
const navText = document.querySelector("#nav-text");
const navFile = document.querySelector("#nav-file");
const navResult = document.querySelector("#nav-result");

// section blocks
const textSection = document.querySelector("#text");
const fileSection = document.querySelector("#file");
const resultSection = document.querySelector("#result");

// text - textarea
const textFirstArea = document.querySelector("#text-first");
const textSecondArea = document.querySelector("#text-second");

// file - drop block
const fileFirstDrop = document.querySelector("#file-first");
const fileSecondDrop = document.querySelector("#file-second");

// file - uploaded file's name
const fileFirstName = document.querySelector("#file-first-name");
const fileSecondName = document.querySelector("#file-second-name");

// attach action to navbar
navText.addEventListener('click', () => {
  textSection.classList.remove("is-hidden");
  fileSection.classList.add("is-hidden");
  resultSection.classList.add("is-hidden");
});

navFile.addEventListener('click', () => {
  textSection.classList.add("is-hidden");
  fileSection.classList.remove("is-hidden");
  resultSection.classList.add("is-hidden");
});

navResult.addEventListener('click', () => {
  textSection.classList.add("is-hidden");
  fileSection.classList.add("is-hidden");
  resultSection.classList.remove("is-hidden");
});

// 