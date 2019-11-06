import React, { useState } from 'react';
import './style.css';
import PropTypes from 'prop-types';

const FilterWidgetRow = (props) => {
    const [checked, setChecked] = useState(false);

    const onClick = () => {
        const checked1 = !checked;
        setChecked(checked1);
        props.onRowClick(props.row, checked1);
    }

    return (
        <label className="row" onClick={onClick}>
            <div className="row-checkbox">
                <div
                    className="row-checkbox__mark"
                    style={{ display: checked ? "block" : "none" }}
                ></div>
            </div>
            <span className="row__title">
                {props.row.element.id}
            </span>
        </label>
    );
}

FilterWidgetRow.propTypes = {
    onRowClick: PropTypes.func.isRequired,
    row: PropTypes.object.isRequired
}

FilterWidgetRow.defaultProps = {
    row: {},
    onRowClick: () => { }
}

export default FilterWidgetRow;