const request = require("request");

const geocode = (address, callback) => { 
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYXlvYmFtaXUiLCJhIjoiY2tld3o2MnBhMDRpdjJ1cGhlNjhpcjRnNiJ9.wLMTV5h4zzcpHhJWNbTNxw&limit=1";

  request({ url: url, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to map service", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find Location. Try another search term", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
