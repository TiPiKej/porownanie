"use strict";
// declare functions
var splitString;
var outerJoin;
// nav items
var navText = document.querySelector("#nav-text");
var navTextColumn = document.querySelector("#nav-text-column");
var navFile = document.querySelector("#nav-file");
var navResult = document.querySelector("#nav-result");
// section blocks
var textSection = document.querySelector("#text");
var textColumnSection = document.querySelector("#text-column");
var fileSection = document.querySelector("#file");
var resultSection = document.querySelector("#result");
// column count inputs
var numberColumnFirst = document.querySelector('#number-column-first');
var numberColumnSecond = document.querySelector('#number-column-second');
// buttons
var textButton = document.querySelector("#text-button");
var textColumnButton = document.querySelector("#text-column-button");
var fileButton = document.querySelector("#file-button");
// text - textarea
var textFirstArea = document.querySelector("#text-first");
var textSecondArea = document.querySelector("#text-second");
var textColumnFirstArea = document.querySelector("#text-column-first");
var textColumnSecondArea = document.querySelector("#text-column-second");
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
    textColumnSection.classList.add("is-hidden");
});
navTextColumn.addEventListener('click', function () {
    textSection.classList.add("is-hidden");
    fileSection.classList.add("is-hidden");
    resultSection.classList.add("is-hidden");
    textColumnSection.classList.remove("is-hidden");
});
navFile.addEventListener('click', function () {
    textSection.classList.add("is-hidden");
    fileSection.classList.remove("is-hidden");
    resultSection.classList.add("is-hidden");
    textColumnSection.classList.add("is-hidden");
});
navResult.addEventListener('click', function () {
    textSection.classList.add("is-hidden");
    fileSection.classList.add("is-hidden");
    resultSection.classList.remove("is-hidden");
    textColumnSection.classList.add("is-hidden");
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
    resultFirstBlock.innerHTML = outerJoin({ arrCheckValues: firstArray, arraCheckIfInclude: secondArray }).join('<br><hr>');
    resultSecondBlock.innerHTML = outerJoin({ arrCheckValues: secondArray, arraCheckIfInclude: firstArray }).join('<br><hr>');
    // print that nothing is unique
    [resultFirstBlock, resultSecondBlock].forEach(function (e) {
        if (e.innerText == '')
            e.innerText = 'Brak wyników';
    });
    // change styles
    textSection.classList.add("is-hidden");
    textColumnSection.classList.add('is-hidden');
    fileSection.classList.add("is-hidden");
    resultSection.classList.remove("is-hidden");
    navResult.classList.remove("is-hidden");
});
textColumnButton.addEventListener('click', function () {
    var firstArray = textColumnFirstArea.value.split('\n');
    var secondArray = textColumnSecondArea.value.split('\n');
    var checkFirstColumn = Number(numberColumnFirst.value) - 1;
    var checkSecondColumn = Number(numberColumnSecond.value) - 1;
    // left outer join - calculate and print result
    resultFirstBlock.innerHTML = outerJoin({ arrCheckValues: firstArray, arraCheckIfInclude: secondArray, checkFirstColumn: checkFirstColumn, checkSecondColumn: checkSecondColumn }).join('<br><hr>');
    resultSecondBlock.innerHTML = outerJoin({ arrCheckValues: secondArray, arraCheckIfInclude: firstArray, checkFirstColumn: checkSecondColumn, checkSecondColumn: checkFirstColumn }).join('<br><hr>');
    // print that nothing is unique
    [resultFirstBlock, resultSecondBlock].forEach(function (e) {
        if (e.innerText == '')
            e.innerText = 'Brak wyników';
    });
    // change styles
    textSection.classList.add("is-hidden");
    textColumnSection.classList.add('is-hidden');
    fileSection.classList.add("is-hidden");
    resultSection.classList.remove("is-hidden");
    navResult.classList.remove("is-hidden");
});
// functions
splitString = function (s) {
    return s.replace(/,/g, '.').replace(/\s|\t/g, '\n').replace(/\n{2,}/g, '\n').split('\n');
};
outerJoin = function (_a) {
    var arrCheckValues = _a.arrCheckValues, arraCheckIfInclude = _a.arraCheckIfInclude, checkFirstColumn = _a.checkFirstColumn, checkSecondColumn = _a.checkSecondColumn;
    var result = [];
    if (checkFirstColumn && checkSecondColumn) {
        arrCheckValues.forEach(function (row) {
            var item = splitString(row)[checkFirstColumn];
            var znaleziono = false;
            arraCheckIfInclude.forEach(function (secRow) {
                if (znaleziono)
                    return;
                var secItems = splitString(secRow)[checkSecondColumn];
                if (secItems === item)
                    znaleziono = true;
            });
            if (!znaleziono)
                result.push(row);
        });
    }
    else {
        arrCheckValues.forEach(function (item) {
            if (arraCheckIfInclude.indexOf(item) == -1)
                result.push(item);
        });
    }
    return result;
};
