import React from 'react';
import './style.css';
import Dropdown from './Dropdown';
import Search from './Search';
import Rows from './Rows';

class Body extends React.Component{
    constructor(props){
        super(props);

        this.onSearchChange = this.onSearchChange.bind(this);
        this.onContextClick = this.onContextClick.bind(this);

        this.state = {
            searchString: "",
            contexts: [],
            dimensions: [],
            rows: [
                {
                    id: 'Dimension1',
                    element: 1
                },
                {
                    id: 1,
                    element: 1
                },
                {
                    id: 1,
                    element: 1
                },
                {
                    id: 1,
                    element: 1
                },
                {
                    id: 1,
                    element: 1
                },
                {
                    id: 1,
                    element: 1
                },
                {
                    id: 1,
                    element: 1
                },
                {
                    id: 1,
                    element: 1
                },
                {
                    id: 1,
                    element: 1
                },
                {
                    id: 1,
                    element: 1
                },
                {
                    id: 1,
                    element: 1
                }
            ]
        }
    }

    componentDidMount(){
        const tables = document.getElementsByTagName("table");
        const contexts = [];

        for(let i = 0; i < tables.length; i++){
            const element = tables[i];
            element.id = tables[i].id || `table${i}`;

            contexts.push({element});
        }

        this.setState({
            contexts: contexts
        });
    }

    onContextClick(element, checked){
        if(checked){
            const headers = element.getElementsByTagName("th");
            const dimensions = [];
    
            for(let i = 0; i < headers.length; i++){
                const header = headers[i];
                header.id = `${element.id}/${header.innerText}`;
    
                dimensions.push({
                    parent: element.id,
                    element: header,
                    index: i
                });
            }
    
            this.setState({
                dimensions: [...this.state.dimensions, ...dimensions]
            });
        }
        else{
            const headers = this.state.dimensions;
            const dimensions = [];

            headers.map(header => {
                if(header.parent !== element.id){
                    dimensions.push(header);
                }
            });

            this.setState({
                dimensions: [...dimensions]
            });
        }
    }

    onDimensionClick(){

    }

    onSearchChange(value){
        this.setState({
            searchString: value
        });
    }

    render(){
        return(
            <div className="body">
                <Dropdown 
                    title="CONTEXTS"
                    rows={this.state.contexts}
                    onRowClick={this.onContextClick}
                />
                <Dropdown 
                    title="DIMENSIONS"
                    rows={this.state.dimensions}
                    onRowClick={this.onDimensionClick}
                />
                <Search onChange={this.onSearchChange}/>
                <Rows rows={this.state.rows}/>
            </div>
        );
    }
}

export default Body;