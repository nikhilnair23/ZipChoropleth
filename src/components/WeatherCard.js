import React from "react";


const WeatherCard = ({zip}) =>{
    return(
        <div className="card border-primary shadow-lg">
            {/*<div className={"card-header " + ({zip.daylight}==='N'})}>*/}
            <div className={"card-header " + (zip.daylight==='N' ? 'zip-night' : 'zip-day')}>
                <h3 className="card-header text-center zip-header">Weather</h3>
                <img className="img zip-img" src={zip.iconLink}/>
                    <p className="zip-temp float-right">{zip.temperature}°C </p>
                <div>
                    <table className="table table-borderless text-white">
                        <tr>
                            <td>Real Feel</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Current conditions</td>
                            <td>{zip.description}</td>
                        </tr>
                        <tr></tr>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default WeatherCard