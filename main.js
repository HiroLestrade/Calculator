let operation = false;
let writing = false;
let operatorPrev = true;
let dot = false;

const txt = document.querySelector(".value");
txt.value = 0;

const bttns = document.querySelectorAll(".bttn").forEach((bttn) => {
    bttn.addEventListener("click", () => {
        switch (bttn.innerText) {
            //Equals. Eval the operation and jump to the post operation state.
            case "=":
                writing = false;
                operation = true;
                operatorPrev = false;
                dot = false;
                txt.value = eval(txt.value);
                break;

            //Clear. Return to the initial state.
            case "c":
                writing = false;
                operation = false;
                operatorPrev = true;
                dot = false;
                txt.value = 0;
                break;

            //Dot
            case ".":
                if (!dot) {
                    //A dot cannot be after a dot.
                    dot = true;
                    //00 Initial state
                    if (operation == false && writing == false) {
                        writing = true;
                        txt.value = "0.";
                    }
                    //01 Press a dot
                    else if (operation == false && writing == true) {
                        if(operatorPrev == true) txt.value += "0.";
                        else txt.value += bttn.innerText;
                    }
                    //10 Press equal
                    else if (operation == true && writing == false) {
                        writing = true;
                        operation = false;
                        txt.value = "0.";
                    }
                    //11 An operator after an equal
                    else if (writing == true && operation == true) {
                        operation = false;
                        txt.value += "0.";
                    }
                    //Dot is like a number.
                    operatorPrev = false;
                }
                break;

            //Operators
            case "+":
            case "-":
            case "*":
            case "/":
                //Only, out of the initial state, can be an operator.
                if (!operatorPrev) {
                    //01 Press a num
                    if (operation == false && writing == true) {
                        txt.value += bttn.innerText;
                    }
                    //10 Press equal
                    else if (operation == true && writing == false) {
                        writing = true;
                        txt.value += bttn.innerText;
                    }
                    //11 An operator after an equal
                    else if (operation == true && writing == true) {
                        writing = false;
                        txt.value += bttn.innerText;
                    }
                    //An operator cannot be after an operator.
                    operatorPrev = true;
                    //A dot can be after an operator.
                    dot = false;
                }
                break;

            //Numbers
            default:
                //00 Initial state
                if (operation == false && writing == false && bttn.innerText != 0) {
                    writing = true;
                    txt.value = bttn.innerText;
                }
                //01 Press a num
                else if (operation == false && writing == true) {
                    if(bttn.innerText == 0 && operatorPrev){
                        txt.value += "0.";
                    }
                    else txt.value += bttn.innerText;
                }
                //10 Press equal
                else if (operation == true && writing == false) {
                    if(bttn.innerText == 0){
                        writing = false;
                        operation = false;
                        operatorPrev = true;
                        dot = false;
                        txt.value = 0;
                    }
                    else{
                        writing = true;
                        operation = false;
                        txt.value = bttn.innerText;
                    }
                }
                //11 An number after the post operation operator.
                else if (writing == true && operation == true) {
                    operation = false;
                    txt.value += bttn.innerText;
                }
                //An operator can be after a number.
                operatorPrev = false;
        }
    });
});