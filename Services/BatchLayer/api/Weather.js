const axios = require("axios").default;
require('dotenv').config({ path: require('find-config')('.env') })

module.exports = (date, cityName) => {
    let isForcast = false;
    let today = new Date().toISOString().split('T')[0];
    today = new Date(today);
    let fromDate = new Date(date);
    let toDate = new Date(date);
    let temperature;
    cityName = encodeURI(cityName);

    // To calculate the time difference of two dates
    let Difference_In_Time = fromDate.getTime() - today.getTime();

    // To calculate the no. of days between two dates
    let Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));

    if (today.getTime() <= fromDate.getTime()) {
        isForcast = true;
        toDate.setDate(toDate.getDate() + Difference_In_Days);
    } else if (today.getTime() === fromDate.getTime()) {
        isForcast = true;
        Difference_In_Days = 0;
    } else {
        toDate.setDate(toDate.getDate() + 1);
    }

    fromDate = fromDate.toLocaleDateString("en-CA");
    toDate = toDate.toLocaleDateString("en-CA");

    return new Promise((resolve, reject) => {
        // if date is today:
        // go to this axios:
        if (isForcast) {
            axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&country=IL
        // &state=Israel&days=16&key=${process.env.WEATHER_API_KEY}`
            ).then(async function (resultforcast) {
                temperature = resultforcast.data.data[Difference_In_Days].temp;
                if (temperature >= 30) {
                    return resolve("חם מאוד");
                }
                else if (temperature >= 25 && temperature < 30){
                    return resolve("חם");
                }
                else if (temperature > 20 && temperature < 25){
                    return resolve("נעים");
                }
                else if (temperature > 15 && temperature <= 20) {
                    return resolve("קר");
                }
                else {
                    return resolve("קר מאוד");
                }
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
        }
        else {
            // if we want a date before this date go to this axios:
            axios.get(
                `https://api.weatherbit.io/v2.0/history/daily?city=${cityName}&country=IL
                &state=Israel&start_date=${fromDate}&end_date=${toDate}&key=${process.env.WEATHER_API_KEY}`
            )
                .then(async function (result) {
                    temperature = result.data.data[Difference_In_Days].temp;
                    if (temperature >= 30) {
                        return resolve("חם מאוד");
                    }
                    else if (temperature >= 25 && temperature < 30){
                        return resolve("חם");
                    }
                    else if (temperature > 20 && temperature < 25){
                        return resolve("נעים");
                    }
                    else if (temperature > 15 && temperature <= 20) {
                        return resolve("קר");
                    }
                    else {
                        return resolve("קר מאוד");
                    }
                }).catch((error) => {
                console.log(error);
                reject(error);
            });
        }
    })
}