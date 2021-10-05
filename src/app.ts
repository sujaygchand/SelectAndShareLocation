import { Validation } from "./validation";
let form : HTMLFormElement; 
let addressInput : HTMLInputElement;

function Init() {
  form = document.querySelector("form") as HTMLFormElement;
  Validation.checkHTMLElementIsValid([form], "form cannot be found on page");
  
  addressInput = document.getElementById("address") as HTMLInputElement;
  Validation.checkHTMLElementIsValid([addressInput], "address cannot be found on page");
}

function searchAddressHandler(event: Event){
    event.preventDefault();
    const enteredAddress = addressInput.value;
}

// Execution Logic start
Init();