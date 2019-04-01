import React, { Component } from 'react'
import WorldMap from "../components/WorldMap";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import WeatherService from "../services/WeatherService"

let zip
export default class ZipDetails extends Component{
    constructor(props) {
        super(props);
        zip = this.props.match.params.zip
        this.weatherService = new WeatherService();
        this.state = {
            zip : '',
            state : '',
            city : ''
        }
    }

    componentDidMount(){
        this.weatherService.findWeatherForZip(zip).then((info) => {
            this.setState({
                zip : info.observations.location[0].observation[0],
                city : info.observations.location[0].observation[0].city,
                state : info.observations.location[0].observation[0].state
            })
        })
    }

    render() {
        console.log(this.state.zip)
        return (
            <div className="card">
                <div className="card-header">
                    <h2>Weather for {this.state.city},{this.state.state}</h2>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        <li className="list-group-item">
                            Temperature : {this.state.zip !== '' && this.state.zip.temperature}
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

}