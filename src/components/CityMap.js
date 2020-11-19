import React, {Component} from 'react'
import {Router, Link, Route, BrowserRouter} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import zip from "../sources/ZIP_Codes"
import {geoMercator, geoPath, geoAlbers} from 'd3-geo'
import {LegendThreshold} from 'react-d3-legends';
import WeatherService from "../services/WeatherService";
import {Spinner} from 'spin.js';
import "../css/spin.css"
import ToolTip from "./ToolTip";

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

class CityMap extends Component {
    constructor(props) {
        super(props);
        this.weatherService = new WeatherService();
        this.state = {
            tooltip: false,
            zipCode: '',
            X: '',
            Y: ''
        }
    }

    enableToolTip = (event,zipCode) => {
        this.setState({
            tooltip: true,
            X: event.screenX,
            Y: event.screenY,
            zipCode : zipCode
        })
    }

    disableToolTip = () => {
        this.setState({
            tooltip: false
        })
    }


    redirect = (zipCode) => {
        let target = document.getElementById('map');
        let spinner = new Spinner(opts)
        spinner.spin(target);

        this.weatherService.findWeatherForZip(zipCode).then((info) => {
            this.props.history.push({
                pathname: '/details/' + zipCode,
                state: {
                    zip: info.observations.location[0].observation[0],
                    city: info.observations.location[0].observation[0].city,
                    state: info.observations.location[0].observation[0].state,
                    zipCode: zipCode
                }
            });
        })
    }


    render() {
        /*109000*/
        const projection = geoMercator()
            .scale(114000)
            .center([-71.12603188298199, 42.27158985153841 - 0.01])
            .translate([140, 375])
        const pathGenerator = geoPath().projection(projection)
        const city = zip.features
            .map((d, i) => {
                return (
                    <path
                        key={"path" + i}
                        onClick={() => this.redirect(d.properties.ZIP5)}
                        d={pathGenerator(d)}
                        onMouseEnter={(event) => {
                            // this.enableToolTip(event,d.properties.ZIP5);
                            this.props.onHover(d);
                        }}
                        onMouseLeave={() => {
                            // this.disableToolTip();
                        }}
                        style={{
                            fill: this.props.hoverElement === d.properties.OBJECTID ?
                                "#FCBC34" : this.props.colorScale(d.properties.ESTAB),
                            stroke: "black",
                            strokeOpacity: 0.9
                        }}
                        className="countries"
                    />)
            })

        return (
            <div className="zip-height zip-bg">
                <div>
                    <h2 className="text-center zip-map-header pt-4">Zip Choropleth Of Boston</h2>
                </div>
                <div className="row zip-height">
                    <div className=" col-lg-2 col-xl-3 col-sm-1 col-md-2"/>
                    <div className="col-8 col-md-7 col-lg-6 col-xl-5 zip-height">
                            {this.state.tooltip &&
                            <ToolTip
                                X = {this.state.X}
                                Y = {this.state.Y}
                                zipCode= {this.state.zipCode}
                            />
                            }
                        <div id="map" className="zip-height">
                            <div className="zip-height" ref={"child"}>
                                {/* 500 500*/}
                                <svg width={620} height={this.props.height}>
                                    <g>
                                        {city}
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 col-md-3 col-lg-4 col-xl-4 zip-legend-vertical">
                        <div className="mt-5 zip-leg-v">
                            <p className="text-white font-weight-bolder mb-0">Number of Establishments</p>
                            <LegendThreshold
                                scale={this.props.colorScale}
                                direction="column"
                                labelMargin="0 15px 0 0"
                                shape={"rect"}
                            />
                        </div>
                    </div>
                    <div className="zip-legend-horizontal">
                        <p className="text-white font-weight-bolder zip-legend-text">Number of Establishments</p>
                        <div className ="pl-4 pr-2">
                        <LegendThreshold
                            scale={this.props.colorScale}
                            direction="horizontal"
                            labelMargin="0 10px 0 0"
                            shape={"rect"}
                        />
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

export default withRouter(CityMap)
