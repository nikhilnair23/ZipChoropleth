import React, {Component} from 'react'
import WorldMap from "../components/WorldMap";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import WeatherService from "../services/WeatherService"
import WeatherCard from "./WeatherCard";


let zip
export default class ZipDetails extends Component {
    constructor(props) {
        super(props);
        zip = this.props.match.params.zip
        this.weatherService = new WeatherService();
        this.state = {
            zip: this.props.location.state.zip,
            state: this.props.location.state.state,
            city: this.props.location.state.city
        }
    }

    render() {
        return (
            <div>
                <h1 className="text-center text-danger font-weight-bold p-4"> {this.state.city}, MA </h1>
                <div className="row justify-content-center">
                    <div>
                        <WeatherCard
                            zip = {this.state.zip}
                        />
                    </div>
                </div>
            </div>
        );
    }

}