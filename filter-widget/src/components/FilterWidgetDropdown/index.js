import React, { useState, useEffect } from 'react';
import './style.css';
import Rows from '../FilterWidgetRows';
import Utils from '../../Utils';
import PropTypes from 'prop-types';

const FilterWidgetDropdown = (props) => {
    const [display, setDisplay] = useState("none");

    useEffect(() => {
        const component = props.showingComponent;

        if (!props.canUpdate) {
            return;
        }

        props.onDropdownClick(false, "");

        if (component === props.id) {
            setDisplay("block");
        }
        else {
            setDisplay("none");
        }
    });

    const onClick = () => {
        if (props.rows.length === 0) {
            return;
        }

        if (display !== "block") {
            props.onDropdownClick(true, props.id);
            setDisplay("block");
        }
        else {
            setDisplay("none");
        }
    }

    const getCheckedRows = () => {
        return Utils.getRowsPreview(props.rows);
    }

    return (
        <div className="dropdown">
            <button className="dropdown-btn" onClick={onClick}>
                <p className="dropdown-btn__title">
                    {props.title}
                </p>
                <p className="dropdown-btn__selected">
                    {getCheckedRows()}
                </p>
            </button>
            <div
                style={{
                    display
                }}
                className="dropdown-content"
                onClick={(e) => e.stopPropagation()}
            >
                <Rows onRowClick={props.onRowClick} rows={props.rows} />
            </div>
        </div>
    );
}

FilterWidgetDropdown.propTypes = {
    onDropdownClick: PropTypes.func.isRequired,
    showingComponent: PropTypes.string,
    rows: PropTypes.array.isRequired,
    title: PropTypes.string,
    onRowClick: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    canUpdate: PropTypes.bool.isRequired
}

FilterWidgetDropdown.defaultProps = {
    showingComponent: "",
    rows: [],
    title: "",
    onDropdownClick: () => { },
    onRowClick: () => { },
    id: "",
    canUpdate: true
}

export default FilterWidgetDropdown;