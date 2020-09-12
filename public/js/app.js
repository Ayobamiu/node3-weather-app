const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");
const time_now = document.getElementById("time_now");

const searchWeather = (event) => {
  event.preventDefault();
  messageOne.textContent = "loading.....";
  fetch("/weather/?address=" + event.target.address.value).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = "This is " + data.location;
        messageTwo.textContent =
          "The temp is currently " +
          data.temperature +
          "% but it feels like " +
          data.feelslike +
          "%. There is " +
          data.precip +
          "% chance of Rainfall";
        time_now.textContent = "Current time: " + data.observation_time;
      }
    });
  });
};
