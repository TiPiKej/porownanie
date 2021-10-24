// declare prop structure
interface propsOuterJoin {
  arrCheckValues: string[];
  arraCheckIfInclude: string[];
  checkFirstColumn?: number;
  checkSecondColumn?: number;
}

// declare functions
let splitString: (s: string) => string[];
let outerJoin: (props: propsOuterJoin) => string[];

// nav items
const navText = <HTMLElement>document.querySelector("#nav-text")!;
const navTextColumn = <HTMLElement>document.querySelector("#nav-text-column")!;
const navFile = <HTMLElement>document.querySelector("#nav-file")!;
const navResult = <HTMLElement>document.querySelector("#nav-result")!;

// section blocks
const textSection = <HTMLElement>document.querySelector("#text")!;
const textColumnSection = <HTMLElement>document.querySelector("#text-column")!;
const fileSection = <HTMLElement>document.querySelector("#file")!;
const resultSection = <HTMLElement>document.querySelector("#result")!;

// column count inputs
const numberColumnFirst = <HTMLInputElement>document.querySelector('#number-column-first');
const numberColumnSecond = <HTMLInputElement>document.querySelector('#number-column-second');

// buttons
const textButton = <HTMLButtonElement>document.querySelector("#text-button")!;
const textColumnButton = <HTMLButtonElement>document.querySelector("#text-column-button")!;
const fileButton = <HTMLButtonElement>document.querySelector("#file-button")!;

// text - textarea
const textFirstArea = <HTMLTextAreaElement>document.querySelector("#text-first")!;
const textSecondArea = <HTMLTextAreaElement>document.querySelector("#text-second")!;
const textColumnFirstArea = <HTMLTextAreaElement>document.querySelector("#text-column-first")!;
const textColumnSecondArea = <HTMLTextAreaElement>document.querySelector("#text-column-second")!;

// file - drop block
const fileFirstDrop = <HTMLElement>document.querySelector("#file-first")!;
const fileSecondDrop = <HTMLElement>document.querySelector("#file-second")!;

// file - uploaded file's name
const fileFirstName = <HTMLElement>document.querySelector("#file-first-name")!;
const fileSecondName = <HTMLElement>document.querySelector("#file-second-name")!;

// result - info block
const resultFirstBlock = <HTMLElement>document.querySelector("#result-first")!;
const resultSecondBlock = <HTMLElement>document.querySelector("#result-second")!;

// attach action to navbar
navText.addEventListener('click', () => {
  textSection.classList.remove("is-hidden");
  fileSection.classList.add("is-hidden");
  resultSection.classList.add("is-hidden");
  textColumnSection.classList.add("is-hidden");
});

navTextColumn.addEventListener('click', () => {
  textSection.classList.add("is-hidden");
  fileSection.classList.add("is-hidden");
  resultSection.classList.add("is-hidden");
  textColumnSection.classList.remove("is-hidden");
})

navFile.addEventListener('click', () => {
  textSection.classList.add("is-hidden");
  fileSection.classList.remove("is-hidden");
  resultSection.classList.add("is-hidden");
  textColumnSection.classList.add("is-hidden");
});

navResult.addEventListener('click', () => {
  textSection.classList.add("is-hidden");
  fileSection.classList.add("is-hidden");
  resultSection.classList.remove("is-hidden");
  textColumnSection.classList.add("is-hidden");
});

// drop boxes - attach action
[fileFirstDrop, fileSecondDrop].forEach((el, nbr) => {
  el.addEventListener('dragover', () => {
    el.classList.add("is-link");
    el.classList.remove("is-primary");
  })
  
  el.addEventListener('dragleave', () => {
    el.classList.remove("is-link");
    el.classList.add("is-primary");
  })

  el.addEventListener("drop", ev => {
    ev.preventDefault();

    // todo
  })
})

// checking words
textButton.addEventListener('click', () => {
  const firstArray = splitString(textFirstArea.value);
  const secondArray = splitString(textSecondArea.value);

  // left outer join - calculate and print result
  resultFirstBlock.innerHTML = outerJoin({ arrCheckValues: firstArray, arraCheckIfInclude: secondArray }).join('<br><hr>');
  resultSecondBlock.innerHTML = outerJoin({ arrCheckValues: secondArray, arraCheckIfInclude: firstArray }).join('<br><hr>');

  // print that nothing is unique
  [resultFirstBlock, resultSecondBlock].forEach((e: HTMLElement) => {
    if (e.innerText == '') e.innerText = 'Brak wyników'
  });

  // change styles
  textSection.classList.add("is-hidden");
  textColumnSection.classList.add('is-hidden');
  fileSection.classList.add("is-hidden");
  resultSection.classList.remove("is-hidden");
  navResult.classList.remove("is-hidden");
})

textColumnButton.addEventListener('click', () => {
  const firstArray = textColumnFirstArea.value.split('\n');
  const secondArray = textColumnSecondArea.value.split('\n');
  
  const checkFirstColumn = Number(numberColumnFirst.value) - 1;
  const checkSecondColumn = Number(numberColumnSecond.value) - 1;

  // left outer join - calculate and print result
  resultFirstBlock.innerHTML = outerJoin({ arrCheckValues: firstArray, arraCheckIfInclude: secondArray, checkFirstColumn, checkSecondColumn }).join('<br><hr>');
  resultSecondBlock.innerHTML = outerJoin({ arrCheckValues: secondArray, arraCheckIfInclude: firstArray, checkFirstColumn: checkSecondColumn, checkSecondColumn: checkFirstColumn }).join('<br><hr>');

  // print that nothing is unique
  [resultFirstBlock, resultSecondBlock].forEach((e: HTMLElement) => {
    if (e.innerText == '') e.innerText = 'Brak wyników'
  });

  // change styles
  textSection.classList.add("is-hidden");
  textColumnSection.classList.add('is-hidden');
  fileSection.classList.add("is-hidden");
  resultSection.classList.remove("is-hidden");
  navResult.classList.remove("is-hidden");
})

// functions
splitString = (s: string) => {
  return s.replace(/,/g, '.').replace(/\s|\t/g, '\n').replace(/\n{2,}/g, '\n').split('\n');
}

outerJoin = ({ arrCheckValues, arraCheckIfInclude, checkFirstColumn, checkSecondColumn }) => {
  const result: Array<string> = [];

  if (checkFirstColumn && checkSecondColumn) {

    arrCheckValues.forEach(row => {
      const item = splitString(row)[checkFirstColumn];

      let znaleziono = false;
      arraCheckIfInclude.forEach(secRow => {
        if (znaleziono) return;
        
        const secItems = splitString(secRow)[checkSecondColumn];
        if (secItems === item) znaleziono = true;
      })

      if (!znaleziono) result.push(row)
    })

  }
  else {
    
    arrCheckValues.forEach(item => {
      if (arraCheckIfInclude.indexOf(item) == -1) result.push(item);
    })

  }

  return result;
}