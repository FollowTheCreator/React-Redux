import React from 'react';
import './style.css';

class SearchSort extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const sortBy = this.props.sortAsc ? "A-Z" : "Z-A";

        return(
            <div 
                className="search-settings-filter search-settings__sort" 
                onClick={this.props.onSortClick}
            >
                {sortBy}
            </div>
        )
    }
}

export default SearchSort;