// declare functions
let splitString: (s: string) => string[];
let outerJoin: (arrCheckValues: string[], arraCheckIfInclude: string[]) => string[];

// nav items
const navText = <HTMLElement>document.querySelector("#nav-text")!;
const navFile = <HTMLElement>document.querySelector("#nav-file")!;
const navResult = <HTMLElement>document.querySelector("#nav-result")!;

// section blocks
const textSection = <HTMLElement>document.querySelector("#text")!;
const fileSection = <HTMLElement>document.querySelector("#file")!;
const resultSection = <HTMLElement>document.querySelector("#result")!;

// buttons
const textButton = <HTMLButtonElement>document.querySelector("#text-button")!;
const fileButton = <HTMLButtonElement>document.querySelector("#file-button")!;

// text - textarea
const textFirstArea = <HTMLTextAreaElement>document.querySelector("#text-first")!;
const textSecondArea = <HTMLTextAreaElement>document.querySelector("#text-second")!;

// file - drop block
const fileFirstDrop = <HTMLElement>document.querySelector("#file-first")!;
const fileSecondDrop = <HTMLElement>document.querySelector("#file-second")!;

// file - uploaded file's name
const fileFirstName = <HTMLElement>document.querySelector("#file-first-name")!;
const fileSecondName = <HTMLElement>document.querySelector("#file-second-name")!;

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

  // left outer join
  console.log(
    outerJoin(firstArray, secondArray)
  )
})

// functions
splitString = (s: string) => {
  return s.replace(/\s/g, '\n').replace(/\n{2,}/g, '\n').split('\n');
}

outerJoin = (fArray = [], sArray = []) => {
  const result: Array<string> = [];

  fArray.forEach(item => {
    if (sArray.indexOf(item) == -1) result.push(item);
  })

  return result;
}