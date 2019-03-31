import React, { Component } from 'react'
import WorldMap from "../components/WorldMap";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import {withRouter} from 'react-router-dom'

import { scaleThreshold } from 'd3-scale'
import {schemePurples} from 'd3-scale-chromatic'
import ZipDetails from "../components/ZipDetails";

const colorScale = scaleThreshold().domain([250,500,750,1000,1250,1500,1750,2000]).range(schemePurples[9])

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.onResize = this.onResize.bind(this)
        this.onHover = this.onHover.bind(this)
        this.state = {screenWidth: 1000, screenHeight: 500, hover: "none", brushExtent: [0, 40]}
    }

    onResize() {
        debugger;
        this.setState({ screenWidth: window.innerWidth, screenHeight: window.innerHeight - 120 })
    }

    onHover(d) {
        this.setState({ hover: d.properties.OBJECTID })
    }


    componentDidMount() {
        window.addEventListener('resize', this.onResize, false)
        this.onResize()
    }

    render() {
        return (
            <div className="container-fluid bg-secondary">
                <div className="container-fluid text-center"><h2>Map of Boston</h2></div>
                <Router>
                <div className="container-fluid">
                    <Route path="/"
                           exact
                           render={() => <WorldMap
                        hoverElement = {this.state.hover} onHover={this.onHover} colorScale={colorScale}
                        size={[this.state.screenWidth / 2, this.state.screenHeight / 2]}
                    />}/>
                    <Route exact path={"/details/:zip"} component={ZipDetails}/>
                </div>
                </Router>
            </div>
        );
    }
}

export default MainPage