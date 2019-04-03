import React from "react";


const WeatherCard = ({zip}) => {
    return (
        <div className={"card border-dark shadow-lg " + (zip.daylight === 'N' ? 'zip-card-night' : 'zip-card-day')}>
            {/*<div className={"card-header " + ({zip.daylight}==='N'})}>*/}
            <div className={"card-header" }>
                <h3 className="card-header text-center zip-header">Weather</h3>
                <div className="row">
                    <div className="col-3">
                    <img className="img zip-img" src={zip.iconLink}/>
                    </div>
                    <div className="col-5">
                        <p className={"pt-3 text-center "+ (zip.daylight === 'N' ? 'zip-temp-night' : 'zip-temp-day')}>
                            {zip.temperature} °C
                        </p>
                    </div>
                    <div className={"col-4 text-justify " + (zip.daylight === 'N' ? 'zip-weather-night' : 'zip-weather-day') }>
                        <p>
                            HI : {zip.highTemperature} °C
                        </p>
                        <p>
                            LO : {zip.lowTemperature} °C
                        </p>
                    </div>
                </div>
                <div>
                    <table className={"table table-borderless " +
                    (zip.daylight === 'N' ? 'zip-night-color' : 'zip-day-color')}>
                        <tr>
                            <td className="col1">Real Feel</td>
                            <td>{zip.comfort}°C</td>
                        </tr>
                        <tr>
                            <td className="col1">Current conditions</td>
                            <td>{zip.description}</td>
                        </tr>
                        <tr>
                            <td className="col1">Humidity</td>
                            <td>{zip.humidity}%</td>
                        </tr>
                        <tr>
                            <td className="col1">Wind Speed</td>
                            <td>{zip.windSpeed} miles/hr</td>
                        </tr>
                        <tr>
                            <td className="col1">Wind Direction</td>
                            <td>{zip.windDesc}</td>
                        </tr>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default WeatherCard