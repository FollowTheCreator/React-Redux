import React from 'react';
import './style.css';

class Search extends React.Component{
    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        this.props.onChange(e.target.value);
    }

    render(){
        return(
            <div className="search">
                <button className="search__btn">⌕</button>
                <input onChange={this.onChange} className="search__input" placeholder="Search..." autoComplete="off"/>
            </div>
        );
    }
}

export default Search;