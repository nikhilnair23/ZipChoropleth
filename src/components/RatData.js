import React, { Component } from 'react'
import { select } from 'd3-selection'
export default class RatData extends Component{
    constructor(props) {
        super(props);
    }


    createChart(){
        const node = this.node
        select(node).
            selectAll('rect')
            .data(this.props.ratData)
            .attr('height',function (d) {
                return d/10* 1.5;
            })
            .attr('y',function (d) {
                return 150- d/10 * 1.5;
            });
    }

    render() {
        debugger;
        return (
            <svg ref={node => this.node = node}
                width="100" height="150" >
                <rect x="0" width="15" fill="#d1c9b8"></rect>
                <rect x="25" width="15" fill="#d1c9b8"></rect>
                <rect x="50" width="15" fill="#d1c9b8"></rect>
                <rect x="75" width="15" fill="#d1c9b8"></rect>
            </svg>
        );
    }

}