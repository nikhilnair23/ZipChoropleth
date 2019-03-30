import React, { Component } from 'react'
import WorldMap from "../components/WorldMap";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

export default class ZipDetails extends Component{
    constructor(props) {
        super(props);
        let zip = this.props.match.params.zip
        console.log(zip)
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <h1>HELLO {this.props.match.params.zip}</h1>
            </div>
        );
    }

}