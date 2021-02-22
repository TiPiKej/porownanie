// nav items
var navText = document.querySelector("#nav-text");
var navFile = document.querySelector("#nav-file");
var navResult = document.querySelector("#nav-result");
// section blocks
var textSection = document.querySelector("#text");
var fileSection = document.querySelector("#file");
var resultSection = document.querySelector("#result");
// text - textarea
var textFirstArea = document.querySelector("#text-first");
var textSecondArea = document.querySelector("#text-second");
// file - drop block
var fileFirstDrop = document.querySelector("#file-first");
var fileSecondDrop = document.querySelector("#file-second");
// file - uploaded file's name
var fileFirstName = document.querySelector("#file-first-name");
var fileSecondName = document.querySelector("#file-second-name");
// attach action to navbar
navText.addEventListener('click', function () {
    textSection.classList.remove("is-hidden");
    fileSection.classList.add("is-hidden");
    resultSection.classList.add("is-hidden");
});
navFile.addEventListener('click', function () {
    textSection.classList.add("is-hidden");
    fileSection.classList.remove("is-hidden");
    resultSection.classList.add("is-hidden");
});
navResult.addEventListener('click', function () {
    textSection.classList.add("is-hidden");
    fileSection.classList.add("is-hidden");
    resultSection.classList.remove("is-hidden");
});
// 
