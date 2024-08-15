const baseURL = "https://api.frankfurter.app/latest?amount=10&amp;from=GBP&amp;to=USD";
const dropdownsel = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdownsel){
    for (currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if(select.name === "from" && currcode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currcode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtvalue = amount.value;
    if(amtvalue === "" || amtvalue <1){
        amtvalue = 1;
        amount.value =1;
    }

    const url = `https://api.frankfurter.app/latest?amount=10&amp;from=${fromCurr.value}&amp;to=${toCurr.value}`;
    let response = await fetch(url);
    let data = await response.json();
    let exchangeRate = (data.rates[toCurr.value])/10; //json file mai 10amt ka dikha rha tha

    let finalAmt = exchangeRate*amtvalue;
    msg.innerText = `${amtvalue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
};

const updateFlag = (element) =>{ //gives target
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});
  
window.addEventListener("load", () => {
    updateExchangeRate();
});