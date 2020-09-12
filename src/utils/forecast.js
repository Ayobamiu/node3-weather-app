const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=06a165d7cc33f382c191717821db007b&query=${latitude},${longitude}`;
  request({ url: url, json: true }, function (error, response, body) {
    if (error) {
      callback("Unable to connect!!", undefined);
    } else if (body.error) {
      callback(
        { errorInfo: body.error.info, errorType: body.error.type },
        undefined
      );
    } else {
      callback(undefined, {
        name: "fore",
        weather_descriptions: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        rain_chance: body.current.precip,
        precip: body.current.precip,
        feelslike: body.current.feelslike,
        observation_time: body.current.observation_time,
      });
    }
  });
};

module.exports = forecast;
