import React from 'react';
import './style.css';
import Header from './Header';
import Body from '../containers/Body';
import PropTypes from 'prop-types';

class App extends React.Component {
    constructor(props){
        super(props);

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onWidgetClick = this.onWidgetClick.bind(this);
        this.onDropdownClick = this.onDropdownClick.bind(this);

        this.state = {
            showingComponent: null,
            canUpdate: true,
            x: 0,
            y: 0,
            prevX: 0,
            prevY: 0,
            isMouseDown: false
        }
    }

    onMouseMove(e){
        e.preventDefault();
        
        if (this.state.isMouseDown) {
            const xShift = this.state.prevX - e.clientX;
            const yShift = this.state.prevY - e.clientY;

            this.setState({
                x: this.state.x - xShift,
                y: this.state.y - yShift,
                prevX: e.clientX,
                prevY: e.clientY
            });
        }
    }

    onMouseDown(e){
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);

        this.setState({
            prevX: e.clientX,
            prevY: e.clientY,
            isMouseDown: true
        });
    }

    onMouseUp(){
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);

        this.setState({
            isMouseDown: false
        });
    }

    onWidgetClick(){
        this.setState(
            {
                canUpdate: true
            }
        );
    }

    onDropdownClick(canUpdate, showingComponent){
        this.setState(
            {
                canUpdate,
                showingComponent
            }
        );
    }

    render(){
        const { y, x } = this.state;

        return(
            <div 
                style={{
                    top: `${y}px`,
                    left: `${x}px`
                }}
                className="filter-widget"
                onClick={this.onWidgetClick}
            >
                <Header 
                    title="FILTER WIDGET" 
                    onMouseDown={this.onMouseDown} 
                />
                <Body 
                    tables={this.props.tables}
                    showingComponent={this.state.showingComponent}
                    onDropdownClick={this.onDropdownClick}
                    canUpdate={this.state.canUpdate}
                />
            </div>
        );
    }
}

App.propTypes = {
    tables: PropTypes.array.isRequired
}

export default App;