export function addClicked1(index) {
    let button = document.getElementById(index);
    let day1Text = document.getElementById(`${index}day1`);
    let day2Text = document.getElementById(`${index}day2`);
    let dateText = document.getElementById(`${index}date`);
    button.classList.add("clicked");
    dateText.classList.add('clickedDate');
    day1Text.classList.add("clickedDay");
    day2Text.classList.add("clickedDay");
}

export function removeClicked1(index) {
    let button = document.getElementById(index);
    let day1Text = document.getElementById(`${index}day1`);
    let day2Text = document.getElementById(`${index}day2`);
    let dateText = document.getElementById(`${index}date`);
    button.classList.remove("clicked");
    dateText.classList.remove('clickedDate');
    day1Text.classList.remove("clickedDay");
    day2Text.classList.remove("clickedDay");
}

export function addClicked2(index) {
    let button = document.getElementById(`${index}hours`);
    let abrivText = document.getElementById(`${index}abriv`);
    let numberText = document.getElementById(`${index}number`);

    button.classList.add("clicked");
    numberText.classList.add('clickedDate');
    abrivText.classList.add("clickedDay");
}

export function removeClicked2(index) {
    let button = document.getElementById(`${index}hours`);
    let abrivText = document.getElementById(`${index}abriv`);
    let numberText = document.getElementById(`${index}number`);
    button.classList.remove("clicked");
    numberText.classList.remove('clickedDate');
    abrivText.classList.remove("clickedDay");
}

