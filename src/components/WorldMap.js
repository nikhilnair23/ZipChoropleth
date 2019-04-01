import React, {Component} from 'react'
import {Router, Link, Route, BrowserRouter} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import zip from "../sources/ZIP_Codes"
import {geoMercator, geoPath, geoAlbers} from 'd3-geo'
import MergingData from "../services/MergingData"
import { Legend } from 'react-d3-legends';
import { LegendQuantile } from 'react-d3-legends';
import { LegendThreshold } from 'react-d3-legends';

class WorldMap extends Component {
    constructor(props) {
        super(props);
        this.mergeService = new MergingData();
    }

    componentDidMount(){
        let estArray = []
        zip.features.map((d,i)=> {

            this.mergeService.getData(d.properties.ZIP5).then((estab)=>{
            })
            }
        )

    }

    redirect = (zipCode) => {
        debugger;
        this.props.history.push({
            pathname : '/details/'+zipCode});
    }


    render() {
        const projection = geoMercator()
            .scale(109000)
            .center([-71.12603188298199,42.27158985153841])
            .translate([125,400])
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
            <div>
            <svg width={500} height={500}>
            {countries}
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