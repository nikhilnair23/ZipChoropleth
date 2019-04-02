import React, {Component} from 'react'
import {Router, Link, Route, BrowserRouter} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import zip from "../sources/ZIP_Codes"
import {geoMercator, geoPath, geoAlbers} from 'd3-geo'
import { LegendThreshold } from 'react-d3-legends';
import WeatherService from "../services/WeatherService";
import {Spinner} from 'spin.js';
import "../css/spin.css"

let opts = {
    lines: 13, // The number of lines to draw
    length: 45, // The length of each line
    width: 12, // The line thickness
    radius: 32, // The radius of the inner circle
    scale: 0.4, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    color: '#4973ff', // CSS color or array of colors
    fadeColor: 'transparent', // CSS color or array of colors
    speed: 3.0, // Rounds per second
    rotate: 46, // The rotation offset
    animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    className: 'spinner', // The CSS class to assign to the spinner
    top: '49%', // Top position relative to parent
    left: '45%', // Left position relative to parent
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    position: 'absolute' // Element positioning
};

class WorldMap extends Component {
    constructor(props) {
        super(props);
        this.weatherService = new WeatherService();

    }

    redirect = (zipCode) => {
        let target = document.getElementById('map');
        let spinner = new Spinner(opts)
        spinner.spin(target);

        this.weatherService.findWeatherForZip(zipCode).then((info) =>{

            this.props.history.push({
                pathname : '/details/'+zipCode,
                state : {
                    zip : info.observations.location[0].observation[0],
                    city : info.observations.location[0].observation[0].city,
                    state : info.observations.location[0].observation[0].state
                }
            });
        })
    }


    render() {
        const projection = geoMercator()
            .scale(109000)
            .center([-71.12603188298199,42.27158985153841])
            .translate([140,375])
        const pathGenerator = geoPath().projection(projection)
        const countries = zip.features
            .map((d,i) => {
                return(
                <path
                key={"path" + i}
                onClick={() => this.redirect(d.properties.ZIP5)}
                d={pathGenerator(d)}
                onMouseEnter={() => {this.props.onHover(d)}}
                style={{fill: this.props.hoverElement === d.properties.OBJECTID ?
                        "#FCBC34" : this.props.colorScale(d.properties.ESTAB), stroke: "black", strokeOpacity: 0.5 }}
                className="countries"
            />) })

        return (
            <div id="map">
                <div className="container-fluid text-center"><h2>Map of Boston</h2></div>
            <svg width={500} height={500}>
                <g>
            {countries}
                </g>
        </svg>
                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "14px",
                }}><p className="text-black-50 font-weight-bolder p-2">Number of Establishments</p></div>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        fontSize: "14px",
                        paddingBottom : "10px"
                    }}
                    className="float-right"
                >
                    <LegendThreshold
                        scale={this.props.colorScale}
                        direction="row"
                        labelMargin="0 15px 0 0"
                        shape={"rect"}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(WorldMap)