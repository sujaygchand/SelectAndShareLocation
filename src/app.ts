import { Validation } from "./validation";
import axios from "axios";

let form: HTMLFormElement;
let addressInput: HTMLInputElement;
const zoomLevel = 16;

const GOOGLE_API_KEY = "Your key goes here";

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function Init() {
  form = document.querySelector("form") as HTMLFormElement;
  Validation.checkHTMLElementIsValid([form], "form cannot be found on page");
  form.addEventListener("submit", searchAddressHandler);

  addressInput = document.getElementById("address") as HTMLInputElement;
  Validation.checkHTMLElementIsValid(
    [addressInput],
    "address cannot be found on page"
  );
}

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) =>
      searchResultResponse<GoogleGeocodingResponse>(response.data))
    .catch((error) => searchResultResponseError(error));
}

function searchResultResponse<T extends GoogleGeocodingResponse>(
  responseData: T
) {
  if (responseData.status !== "OK") 
    throw new Error("Could not fetch location");

  const coordinates = responseData.results[0].geometry.location;
  const map = new google.maps.Map(document.getElementById("map") as Element, {
    center: coordinates,
    zoom: zoomLevel,
  });

  new google.maps.Marker({ position: coordinates, map: map });
}

function searchResultResponseError(error: any) {
  alert(error?.message);
  console.log(error);
}

// Execution Logic start
Init();
