import React from 'react';
import './style.css';
import Rows from '../Rows';
import Utils from '../../../Services/Utils';
import PropTypes from 'prop-types';

class Dropdown extends React.Component{
    constructor(props){
        super(props);

        this.onClick = this.onClick.bind(this);
        this.getCheckedRows = this.getCheckedRows.bind(this);

        this.state = {
            display: "none"
        }
    }

    componentDidUpdate(){
        const component = this.props.showingComponent;
        if(this.props.canUpdate){
            this.props.onDropdownClick(false, null);
            this.setState(
                {
                    display: "none"
                },
                () => {
                    if(component !== null){
                        component.setState({
                            display: "block"
                        });
                    }
                }
            );
        }
    }
        
    onClick(){
        if(this.props.rows.length > 0){ 
            if(this.state.display !== "block"){
                this.props.onDropdownClick(true, this);
                this.setState({
                    display: "block"
                });
            }
            else{
                this.setState({
                    display: "none"
                });
            }
        }
    }

    onContentClick(e){
        e.stopPropagation();
    }

    getCheckedRows(){
        return Utils.getRowsPreview(this.props.rows);
    }

    render(){
        const checkedRows = this.getCheckedRows();

        return(
            <div className="dropdown">
                <button className="dropdown-btn" onClick={this.onClick}>
                    <p className="dropdown-btn__title">
                        {this.props.title}
                    </p>
                    <p className="dropdown-btn__selected">
                        {checkedRows}
                    </p>
                </button>
                <div
                    style={{
                        display: this.state.display
                    }}
                    className="dropdown-content"
                    onClick={this.onContentClick}
                >
                    <Rows onRowClick={this.props.onRowClick} rows={this.props.rows} />
                </div>
            </div>
        );
    }
}

Dropdown.propTypes = {
    canUpdate: PropTypes.bool.isRequired,
    onDropdownClick: PropTypes.func.isRequired,
    showingComponent: PropTypes.element.isRequired,
    rows: PropTypes.array.isRequired,
    title: PropTypes.string,
    onRowClick: PropTypes.func.isRequired
}

export default Dropdown;