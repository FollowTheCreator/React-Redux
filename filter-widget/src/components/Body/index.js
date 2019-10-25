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
        this.onDimensionClick = this.onDimensionClick.bind(this);
        this.onRowClick = this.onRowClick.bind(this);

        this.state = {
            searchString: "",
            contexts: [],
            dimensions: [],
            cells: []
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

    onContextClick(row, checked){
        if(checked){
            const element = row.element;
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
                if(header.parent !== row.element.id){
                    dimensions.push(header);
                }
            });

            this.setState({
                dimensions: [...dimensions]
            });
        }
    }

    onDimensionClick(row, checked){
        if(checked){
            const table = this.state.contexts.find(
                (context) => row.parent == context.element.id
            )
            .element;
            const cells = [];
            const rows = Array.from(table.rows);

            rows.map((item, index) => {
                if(index > 0){
                    const cell = item.cells[row.index];
                    cell.id = cell.innerText;

                    cells.push({
                        parent: row.element.id,
                        element: cell
                    });
                }
            });

            this.setState({
                cells: [...this.state.cells, ...cells]
            });
        }
        else{
            const rows = this.state.cells;
            const cells = [];

            rows.map(item => {
                if(item.parent !== row.element.id){
                    cells.push(item);
                }
            });

            this.setState({
                cells: cells
            });
        }
    }

    onRowClick(){

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
                <Rows 
                    rows={this.state.cells}
                    onRowClick={this.onRowClick}
                />
            </div>
        );
    }
}

export default Body;