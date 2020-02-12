import React from 'react'
import PropTypes from 'prop-types'
import './Key.css'

const Key = ({ letter, isSelected, index,onClick }) => (
    <div className={`key ${isSelected}`} onClick={() => onClick(index)}>
        <span className="symbol">
            {/*if the card is hidden use HIDDEN_SYMBOL*/}
            {letter}
        </span>
    </div>
)

Key.propTypes = {
    letter: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default Key