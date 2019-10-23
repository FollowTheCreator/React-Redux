import React from 'react';
import './style.css';
/*
class App extends React.Component {
    constructor(props) {
        super(props);

        this.widgetRef = React.createRef();

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);

        this.state = {
            x: 0,
            y: 0,
            xShift: 0,
            yShift: 0,
            widgetX: 0,
            widgetY: 0,
            isMouseDown: false
        };
    }

    componentDidMount() {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }

    onMouseMove(e) {
        e.preventDefault();
        const { isMouseDown } = this.state;

        if (isMouseDown) {
            this.setState({
                xShift: this.state.x - e.clientX,
                yShift: this.state.y - e.clientY,
                x: e.clientX,
                y: e.clientY,
                widgetX: this.widgetRef.current.style.left,
                widgetY: this.widgetRef.current.style.top
            });
        }
    }

    onMouseDown() {
        this.setState({ isMouseDown: true });
    }

    onMouseUp() {
        this.setState({ isMouseDown: false });
    }

    render() {
        const { yShift, xShift, widgetX, widgetY, y, x } = this.state;

        return (
            <div
                style={{
                    top: `${widgetY + yShift}px`,
                    left: `${widgetX + xShift}px`
                }}
                ref={this.widgetRef}
                className="filter-widget"
            >
                <div>
                    <div 
                        className="drag-hook" 
                        onMouseDown={this.onMouseDown}
                    >
                        #
                    </div>
                </div>
                Widget
            </div>
        )
    }
}
 */

class App extends React.Component {
    constructor(props){
        super(props);

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);

        this.state = {
            x: 0,
            y: 0,
            prevX: 0,
            prevY: 0,
            isMouseDown: false
        }
    }

    componentDidMount() {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
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
        this.setState({
            prevX: e.clientX,
            prevY: e.clientY,
            isMouseDown: true
        });
    }

    onMouseUp(){
        this.setState({
            isMouseDown: false
        });
    }

    render(){
        const { y, x } = this.state;

        return(
            <div 
                style={{
                    top: `${y}px`,
                    left: `${x}px`
                }}
                id="filter-widget" 
                className="filter-widget"
            >
                <div>
                    <div 
                        id="drag-hook" 
                        className="drag-hook" 
                        onMouseDown={this.onMouseDown}
                    >
                        #
                    </div>
                </div>
                Widget
            </div>
        )
    }
}

export default App;