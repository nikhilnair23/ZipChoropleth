import React, {Component} from 'react'
import WorldMap from "./CityMap";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import WeatherService from "../services/WeatherService"
import WeatherCard from "./WeatherCard";


let zip
export default class ZipDetails extends Component {
    constructor(props) {
        super(props);
        zip = this.props.match.params.zip
        this.state = {
            zip: this.props.location.state.zip,
            state: this.props.location.state.state,
            city: this.props.location.state.city,
            zipCode : this.props.location.state.zipCode
        }
    }

    redirectBackHome = () =>{
        debugger;
        this.props.history.push('/');
    }

    render() {
        return (
            <div className={"zip-height " + (this.state.zip.daylight === 'N' ? 'zip-night' : 'zip-day')}>
                <h1 className={"text-center font-weight-bold p-4 " +
                (this.state.zip.daylight === 'N' ? 'zip-detail-title-night' : 'zip-detail-title-day')}>
                    {this.state.city}, MA ({this.state.zipCode})
                </h1>
                <div className="row">
                    <div className="col-2">
                        <div className="">
                        <button onClick={() => this.redirectBackHome()}
                            className="btn zip-back-btn">
                            <i className="fa fa-chevron-circle-left fa-5x"></i>
                        </button>
                        </div>
                    </div>
                    <div className="col-8 justify-content-center zip-weather-card">
                        <WeatherCard
                            zip = {this.state.zip}
                        />
                    </div>
                    <div className="col-2"></div>

                </div>
            </div>
        );
    }

}