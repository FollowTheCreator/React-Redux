import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

class FilterWidgetRow extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            checked: false
        }

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const checked = !this.state.checked;
        this.setState({
            checked: checked
        });

        this.props.onRowClick(this.props.row, checked);
    }

    render() {
        return (
            <label className="row" onClick={this.onClick}>
                <div className="row-checkbox">
                    <div
                        className="row-checkbox__mark"
                        style={{ display: this.state.checked ? "block" : "none" }}
                    ></div>
                </div>
                <span className="row__title">
                    {this.props.row.element.id}
                </span>
            </label>
        );
    }
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