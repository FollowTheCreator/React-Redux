import React from 'react';
import './style.css';

class StateStorage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const saveState = this.props.stateSaved ? "State saved" : "Save state";

        return(
            <div className="state-storage">
                <button 
                    className="state-storage-btn state-storage__save-state" 
                    onClick={this.props.onSaveClick}
                >
                    {saveState}
                </button>
                <button 
                    className="state-storage-btn state-storage__restore" 
                    onClick={this.props.onRestoreClick}
                >
                        Restore state
                </button>
            </div>
        );
    }
}

export default StateStorage;