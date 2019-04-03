import React from 'react'
const Tooltip = ({X,Y,zipCode}) => {
    var styles = {
        position:'absolute',
        left : X/2.5,
        top : Y/2
    }
    return(
        <div style={styles} className="zip-tooltip">
            <p className="zip-tooltip-text">{zipCode}</p>
        </div>
    )
}

export default Tooltip