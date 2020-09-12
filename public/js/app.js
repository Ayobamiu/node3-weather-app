const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");

const searchWeather = (event) => {
  event.preventDefault();
  messageOne.textContent = "loading.....";
  fetch(
    "http://localhost:3000/weather/?address=" + event.target.address.value
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = "Location: " + data.location;
        messageTwo.textContent = "It is " + data.weather_descriptions[0];
      }
    });
  });
};
