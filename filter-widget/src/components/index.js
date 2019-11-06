import React, { useState, useEffect } from 'react';
import './style.css';
import Header from './FilterWidgetHeader';
import Body from '../containers/Body';
import PropTypes from 'prop-types';

const App = (props) => {
    const [showingComponent, setShowingComponent] = useState("");
    const [canUpdate, setCanUpdate] = useState(true);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [prevX, setPrevX] = useState(0);
    const [prevY, setPrevY] = useState(0);

    const onMouseMove = (e) => {
        const xShift = prevX - e.clientX;
        const yShift = prevY - e.clientY;

        setX(x - xShift);
        setY(y - yShift);
        setPrevX(e.clientX);
        setPrevY(e.clientY);
    }

    const onMouseDown = (e) => {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        setPrevX(e.clientX);
        setPrevY(e.clientY);
    }

    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    const onWidgetClick = () => {
        setCanUpdate(true);
    }

    const onDropdownClick = (canUpdate, showingComponent) => {
        setCanUpdate(canUpdate);
        setShowingComponent(showingComponent);
    }

    return (
        <div
            style={{
                top: `${y}px`,
                left: `${x}px`
            }}
            className="filter-widget"
            onClick={onWidgetClick}
        >
            <Header
                title="FILTER WIDGET"
                onMouseDown={onMouseDown}
            />
            <Body
                tables={props.tables}
                showingComponent={showingComponent}
                onDropdownClick={onDropdownClick}
                canUpdate={canUpdate}
            />
        </div>
    );
}

App.propTypes = {
    tables: PropTypes.array.isRequired
}

App.defaultProps = {
    tables: []
}

export default App;