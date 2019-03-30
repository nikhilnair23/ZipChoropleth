import React, {Component} from 'react'
/*import worlddata from '../sources/boston'*/
import boston from '../sources/boston'
import {Router, Link, Route, BrowserRouter} from 'react-router-dom'
import BOST from '../sources/Boston_new'
import {withRouter} from 'react-router-dom'
import zip from "../sources/ZIP_Codes"
import {geoMercator, geoPath, geoAlbers} from 'd3-geo'

const geoJson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "name": "Africa"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-6, 36], [33, 30], [-6, 36]]]
            }
        }]
    }

class WorldMap extends Component {
    constructor(props) {
        super(props);
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
                style={{fill: this.props.hoverElement === d.properties.OBJECTID ? "#FCBC34" : this.props.colorScale(d.launchday), stroke: "black", strokeOpacity: 0.5 }}
                className="countries"
            />) })

        return <svg width={700} height={550}>
            {countries}
        </svg>
    }
}

export default withRouter(WorldMap)




/*
import React, {Component} from 'react'
import worlddata from '../components/world'
/!*import worlddata from '../sources/boston'*!/
import {geoMercator, geoPath, geoAlbers} from 'd3-geo'

const geoJson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "name": "Africa"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-6, 36], [33, 30], [-6, 36]]]
            }
        }]
}

class WorldMap extends Component {
    render() {
        const projection = geoMercator()
            .scale(120)
            .translate([430,250])
        const pathGenerator = geoPath().projection(projection)
        const countries = worlddata.features
            .map((d,i) => <path
                key={"path" + i}
                d={pathGenerator(d)}
                onMouseEnter={() => {this.props.onHover(d)}}
                style={{fill: this.props.hoverElement === d.id ? "#FCBC34" : this.props.colorScale(d.launchday), stroke: "black", strokeOpacity: 0.5 }}
                className="countries"
            />)

        return <svg width={700} height={500}>
            {countries}
        </svg>
    }
}

export default WorldMap*/
