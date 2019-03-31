import zip from "../sources/ZIP_Codes"
import React, {Component} from 'react'

const zip2 = zip.features;

class MergingData extends Component {
    constructor(props) {
        super(props);
        this.url = "https://api.census.gov/data/2016/zbp?get=ESTAB&key=998fc8d483c08595bc410ce29422f2b5e1de51cd&for=zipcode:"
    }

    getData = (zipcode) => {

        return (fetch(this.url + zipcode, {
                method: 'get'
            }).then(function (response) {
                return response.json();
            })
        )
    }

    merge = (estab) => {

    }

}

export default MergingData