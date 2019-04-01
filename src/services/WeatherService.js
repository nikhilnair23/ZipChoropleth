import React, {Component} from 'react'

const url = "https://weather.cit.api.here.com/weather/1.0/report.json?product=observation&oneobservation=true&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg&zipcode="
var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
class WeatherService extends Component{
    findWeatherForZip(zipCode){
        let url2 = url + zipCode;
        debugger;
        return(fetch(proxyUrl + url2,{
        })
                .then(blob => blob.json())
                .then(data => {
                    debugger;
                    return data;
                })
        )
    }
}

export default WeatherService