import React, {Component} from 'react'
import CityMap from "../components/CityMap";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import {withRouter} from 'react-router-dom'

import {scaleThreshold} from 'd3-scale'
import {schemePurples} from 'd3-scale-chromatic'
import ZipDetails from "../components/ZipDetails";

const colorScale = scaleThreshold().domain([250, 500, 750, 1000, 1250, 1500, 1750]).range(schemePurples[7])

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.onResize = this.onResize.bind(this)
        this.onHover = this.onHover.bind(this)
        this.state = {screenWidth: 1000, screenHeight: 500, hover: "none"}
    }

    onResize() {
        this.setState({screenWidth: window.innerWidth, screenHeight: window.innerHeight - 120})
    }

    onHover(d) {
        this.setState({hover: d.properties.OBJECTID})
    }


    componentDidMount() {
        window.addEventListener('resize', this.onResize, false)
        this.onResize()
    }

    render() {
        return (
            <div className="zip-height">
                <Router>
                    <div className="zip-height">
                        <Route path="/"
                               exact
                               render={() => <CityMap
                                   hoverElement={this.state.hover} onHover={this.onHover} colorScale={colorScale}
                                   width = {this.state.screenWidth * 0.8}
                                   height= {this.state.screenHeight * 0.95}
                               />}/>
                        <Route exact path={"/details/:zip"} component={ZipDetails}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default MainPage
