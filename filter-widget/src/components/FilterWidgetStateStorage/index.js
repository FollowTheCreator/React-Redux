import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

const FilterWidgetStateStorage = (props) => {
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

FilterWidgetStateStorage.propTypes = {
    stateSaved: PropTypes.bool.isRequired,
    onSaveClick: PropTypes.func.isRequired,
    onRestoreClick: PropTypes.func.isRequired
}

FilterWidgetStateStorage.defaultProps = {
    stateSaved: false,
    onSaveClick: () => { },
    onRestoreClick: () => { }
}

export default FilterWidgetStateStorage;