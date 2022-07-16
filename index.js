/* Text me the weather
Write a script that you can run to send me the weather via text.
node script.js
Should send me the weather for Jacksonville, Fl */

/* 1. Request weather data.
   2. Extract the temperature from the weather data.
   3. Send temp to twilio to text it. */
import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import fetch from "node-fetch"
import twilio from "twilio"

function textWeather() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=30.3322&lon=-81.6557&units=imperial&appid=${process.env.OPENWEATHERMAP_API_KEY}`;
  const client = new twilio(accountSid, authToken);
  
  const fetchErrorHandler = function(err) {
    console.log(err)
  }
  
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let currentTemp = data.current.temp
      
      client.messages
        .create({
          body: `The current temperature is ${currentTemp}° in Jacksonville, FL.`,
          to: process.env.MY_PHONE_NUMBER, // Text this number
          from: process.env.TWILIO_PHONE_NUMBER, // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));
    })
    .catch(fetchErrorHandler)
}

textWeather();