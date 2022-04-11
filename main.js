let moveCount = 0;
const fields = [];
const oMark = document.getElementById('o');
const xMark = document.getElementById('x');
const button = document.getElementById('button');
const oCounter = document.getElementById('o-counter');
const xCounter = document.getElementById('x-counter');

class Field {
    constructor(id) {
        this.checked = 0;
        this.id = id;
        this.value = null;
        this.el = document.getElementById(this.id);
        this.checkClick();
    }

    checkClick() {
        this.el.addEventListener('click', () => { 
            if (!this.checked) {
                if (moveCount % 2) {
                    this.value = 0;
                    moveCount++;
                    oMark.classList.remove("mark_active");
                    xMark.classList.add("mark_active");
                    this.el.classList.add("oMark");
                } else {
                    this.value = 1;
                    moveCount++;
                    xMark.classList.remove("mark_active");
                    oMark.classList.add("mark_active");
                    this.el.classList.add("xMark");
                }
                this.checked = 1;
                checkWin();
            }
        });
    }
}

for (let i = 0; i < 9; i++) {
    fields.push(new Field(i));
}

function clear() {
    fields.map(field => {
        field.el.classList.remove("oMark", "xMark");
        field.value = null;
        field.checked = 0;
    });
}

function newGame() {
    clear();
}

button.addEventListener('click', () => {
    newGame();
    oCounter.innerText = 0;
    xCounter.innerText = 0;
});

function checkWin() {
    let flag = moveCount % 2;
    for (let j = 0; j < 9; j+=3) {
        if ((fields[0+j].value == flag) && (fields[1+j].value == flag) && (fields[2+j].value == flag)) { win(flag); }
    }
    for (let j = 0; j < 3; j++) {
        if ((fields[0+j].value == flag) && (fields[3+j].value == flag) && (fields[6+j].value == flag)) { win(flag); }
    }
    if ((fields[0].value == flag) && (fields[4].value == flag) && (fields[8].value == flag) || 
        (fields[2].value == flag) && (fields[4].value == flag) && (fields[6].value == flag)) { win(flag); }
    else if (moveCount == 9) { clear(); moveCount = 0; }
}

function win(side) {
    moveCount = 0;
    if (side == 0) {
        console.log('Выйграл нолик');
        clear();
        oCounter.innerText++;
    }
    if (side == 1) {
        console.log('Выйграл крестик');
        clear();
        xCounter.innerText++;
    }
}