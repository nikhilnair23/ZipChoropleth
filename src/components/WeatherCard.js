import React from "react";


const WeatherCard = ({zip}) => {
    return (
        <div className={"card border-dark shadow-lg " + (zip.daylight === 'N' ? 'zip-card-night' : 'zip-card-day')}>
            {/*<div className={"card-header " + ({zip.daylight}==='N'})}>*/}
            <div className={"card-header" }>
                <h3 className="card-header text-center zip-header">Weather</h3>
                <div className="row">
                    <div className="col-4">
                    <img className="img zip-img" src={zip.iconLink}/>
                    </div>
                    <div className="col-4">
                        <p className="zip-temp pt-3">{zip.temperature} °C </p>
                    </div>
                    <div className="col-4 text-justify">
                        <p className="zip-temp-high">HI : {zip.highTemperature} °C </p>
                        <p className="zip-temp-low">LO : {zip.lowTemperature} °C </p>
                    </div>
                </div>
                <div>
                    <table className="table table-borderless zip-weather-font">
                        <tr>
                            <td>Real Feel</td>
                            <td>{zip.comfort}°C</td>
                        </tr>
                        <tr>
                            <td className="zip-col-1">Current conditions</td>
                            <td>{zip.description}</td>
                        </tr>
                        <tr>
                            <td>Humidity</td>
                            <td>{zip.humidity}%</td>
                        </tr>
                        <tr>
                            <td>Wind Speed</td>
                            <td>{zip.windSpeed} miles/hr</td>
                        </tr>
                        <tr>
                            <td>Wind Direction</td>
                            <td>{zip.windDesc}</td>
                        </tr>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default WeatherCard