import React, {Component} from 'react'
import {Router, Link, Route, BrowserRouter} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import zip from "../sources/ZIP_Codes"
import {geoMercator, geoPath, geoAlbers} from 'd3-geo'
import MergingData from "../services/MergingData"

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
        this.props.history.push('/details/'+zipCode);
    }


    render() {
        const projection = geoMercator()
            .scale(109000)
            .center([-71.12603188298199,42.27158985153841])
            .translate([250,400])
        const pathGenerator = geoPath().projection(projection)
        const countries = zip.features
            .map((d,i) => {
                return(
                <path
                key={"path" + i}
                onClick={() => this.redirect(d.properties.ZIP5)}
                d={pathGenerator(d)}
                onMouseEnter={() => {this.props.onHover(d)}}
                style={{fill: this.props.hoverElement === d.properties.OBJECTID ? "#FCBC34" : this.props.colorScale(d.properties.ESTAB), stroke: "black", strokeOpacity: 0.5 }}
                className="countries"
            />) })

        return <svg width={700} height={550}>
            {countries}
        </svg>
    }
}

export default withRouter(WorldMap)