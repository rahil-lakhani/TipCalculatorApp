const billAmountValue = document.querySelector(".billAmountValue");
const numberOfPeople = document.querySelector(".numberOfPeople");
const numberOfPeopleValue = document.querySelector(".numberOfPeopleValue");
const numberOfPeopleError = document.querySelector(".numberOfPeopleTitle p");
const customTipPercentage = document.querySelector(".customTipPercentage");
const tipAmountPerPerson = document.querySelector(".tipAmountPerPerson");
const totalPerPerson = document.querySelector(".totalPerPerson");
const resetButton = document.querySelector(".resetButton");
const buttons = document.querySelectorAll(".tipPercentage");

//Calculate Tip When Click On Tip Percentage Button

buttons.forEach((button) => {
    button.addEventListener("click", (e) => {

        if (billAmountValue.value === "") {
            alert("Bill Amount is Missing. Please Enter it!");
            resetEverything();
            return;
        }

        let tipvalue = e.target.innerText;
        tipvalue = tipvalue.substr(0, tipvalue.length - 1);

        if (billAmountValue.value === "") return;
        if (numberOfPeopleValue.value === "") numberOfPeopleValue.value = 1;

        calculateTip(
            parseFloat(billAmountValue.value),
            parseInt(tipvalue),
            parseInt(numberOfPeopleValue.value)
        );

        tipHolder(
            parseInt(tipvalue)
        );

    });
});

//Calculate Tip When User Gives Custom Tip Percentage Input

customTipPercentage.addEventListener("blur", (e) => {

    if (billAmountValue.value === "") {
        alert("Bill Amount is Missing. Please Enter it!");
        resetEverything();
        return;
    }

    if (numberOfPeopleValue.value === "") numberOfPeopleValue.value = 1;

    calculateTip(
        parseFloat(billAmountValue.value),
        parseFloat(e.target.value),
        parseInt(numberOfPeopleValue.value)
    );

    tipHolder(
        parseFloat(e.target.value),
    );

});

//Calculate Tip When User Gives Bill Amount or the Number of People Input

function tipHolder(tipPercentage) {

    numberOfPeopleValue.addEventListener("blur", (e) => {

        if (billAmountValue.value === "") {

            tipAmountPerPerson.innerHTML = "$0.00";
            totalPerPerson.innerHTML = "$0.00";

            billAmountValue.addEventListener("blur", (event) => {

                if (e.target.value === "") e.target.value = 1;

                calculateTip(
                    parseFloat(event.target.value),
                    tipPercentage,
                    parseInt(e.target.value)
                );

            });

        } else {

            calculateTip(
                parseFloat(billAmountValue.value),
                tipPercentage,
                parseInt(e.target.value)
            );

        }

        //Error When User Enters 0 As Number Of People

        if (e.target.value === "0") {
            numberOfPeopleError.style.visibility = "visible";
            numberOfPeople.classList.add("numberOfPeopleInError");            
        } else {
            numberOfPeopleError.style.visibility = "hidden";
            numberOfPeople.classList.remove("numberOfPeopleInError");
        }

    });

}

//Calculate Total When User Gives only the Bill Amount

billAmountValue.addEventListener("blur", (e) => {

    if (numberOfPeopleValue.value === "") numberOfPeopleValue.value = 1;

    calculateTip(
        parseFloat(e.target.value),
        0,
        parseInt(numberOfPeopleValue.value)
    );

});

//Calculate Tip

function calculateTip(billAmountValue, tipPercentage, numberOfPeopleValue) {

    let tipAmount = (billAmountValue * (tipPercentage / 100)) / numberOfPeopleValue;
    let tip = Math.floor(tipAmount * 100) / 100;
    tip = tip.toFixed(2);
    console.log("this is tip: ", tip);

    let totalAmount = (tipAmount * numberOfPeopleValue + billAmountValue) / numberOfPeopleValue;
    totalAmount = totalAmount.toFixed(2);
    console.log("this is total amount: ", totalAmount);

    if (numberOfPeopleValue === 0) {
        tipAmountPerPerson.innerHTML = "$0.00";
        totalPerPerson.innerHTML = "$0.00";
    } else {
        tipAmountPerPerson.innerHTML = "$" + tip;
        totalPerPerson.innerHTML = "$" + totalAmount;
    }

}

//Reset Everything

resetButton.addEventListener("click", resetEverything);

function resetEverything() {
    tipAmountPerPerson.innerHTML = "$0.00";
    totalPerPerson.innerHTML = "$0.00";
    billAmountValue.value = "";
    numberOfPeopleValue.value = "";
    customTipPercentage.value = "";
    tipHolder(0);
}

//Other

tipHolder(0);