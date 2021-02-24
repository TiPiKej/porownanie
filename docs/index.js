"use strict";
// declare functions
var splitString;
var outerJoin;
// nav items
var navText = document.querySelector("#nav-text");
var navFile = document.querySelector("#nav-file");
var navResult = document.querySelector("#nav-result");
// section blocks
var textSection = document.querySelector("#text");
var fileSection = document.querySelector("#file");
var resultSection = document.querySelector("#result");
// buttons
var textButton = document.querySelector("#text-button");
var fileButton = document.querySelector("#file-button");
// text - textarea
var textFirstArea = document.querySelector("#text-first");
var textSecondArea = document.querySelector("#text-second");
// file - drop block
var fileFirstDrop = document.querySelector("#file-first");
var fileSecondDrop = document.querySelector("#file-second");
// file - uploaded file's name
var fileFirstName = document.querySelector("#file-first-name");
var fileSecondName = document.querySelector("#file-second-name");
// result - info block
var resultFirstBlock = document.querySelector("#result-first");
var resultSecondBlock = document.querySelector("#result-second");
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
// drop boxes - attach action
[fileFirstDrop, fileSecondDrop].forEach(function (el, nbr) {
    el.addEventListener('dragover', function () {
        el.classList.add("is-link");
        el.classList.remove("is-primary");
    });
    el.addEventListener('dragleave', function () {
        el.classList.remove("is-link");
        el.classList.add("is-primary");
    });
    el.addEventListener("drop", function (ev) {
        ev.preventDefault();
        // todo
    });
});
// checking words
textButton.addEventListener('click', function () {
    var firstArray = splitString(textFirstArea.value);
    var secondArray = splitString(textSecondArea.value);
    // left outer join - calculate and print result
    resultFirstBlock.innerHTML = outerJoin(firstArray, secondArray).join('<br>');
    resultSecondBlock.innerHTML = outerJoin(secondArray, firstArray).join('<br>');
    // print that nothing is unique
    [resultFirstBlock, resultSecondBlock].forEach(function (e) {
        if (e.innerText == '')
            e.innerText = 'Brak wyników';
    });
    // change styles
    textSection.classList.add("is-hidden");
    fileSection.classList.add("is-hidden");
    resultSection.classList.remove("is-hidden");
    navResult.classList.remove("is-hidden");
});
// functions
splitString = function (s) {
    return s.replace(/\s/g, '\n').replace(/\n{2,}/g, '\n').split('\n');
};
outerJoin = function (fArray, sArray) {
    if (fArray === void 0) { fArray = []; }
    if (sArray === void 0) { sArray = []; }
    var result = [];
    fArray.forEach(function (item) {
        if (sArray.indexOf(item) == -1)
            result.push(item);
    });
    return result;
};
