import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

const StateStorage = (props) => {
    return (
        <div className="state-storage">
            <button
                className="state-storage-btn state-storage__save-state"
                onClick={props.onSaveClick}
            >
                {props.stateSaved ? "State saved" : "Save state"}
            </button>
            <button
                className="state-storage-btn state-storage__restore"
                onClick={props.onRestoreClick}
            >
                Restore state
            </button>
        </div>
    );
}

StateStorage.propTypes = {
    stateSaved: PropTypes.bool.isRequired,
    onSaveClick: PropTypes.func.isRequired,
    onRestoreClick: PropTypes.func.isRequired
}

export default StateStorage;