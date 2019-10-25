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

            contexts.push({checked: false, element});
        }

        this.setState({
            contexts
        });
    }

    onContextClick(row, checked){
        if(checked){
            const headers = row.element.getElementsByTagName("th");
            const dimensions = [];
    
            for(let i = 0; i < headers.length; i++){
                const header = headers[i];
                header.id = `${row.element.id}/${header.innerText}`;
    
                dimensions.push({
                    checked: false,
                    parent: row,
                    element: header,
                    index: i
                });
            }

            const contexts = this.state.contexts.map((item) => {
                if(item.element.id === row.element.id){
                    return {
                        checked: !item.checked, 
                        element: item.element
                    };
                }

                return item;
            });
    
            this.setState({
                dimensions: [...this.state.dimensions, ...dimensions],
                contexts
            });
        }
        else{
            const headers = this.state.dimensions;
            const dimensions = [];
            
            const rows = this.state.cells;
            const cells = [];

            headers.map(header => {
                if(header.parent.element.id !== row.element.id){
                    dimensions.push(header);
                }
                else{
                    rows.map(item => {
                        if(item.parent.parent.element.id !== header.parent.element.id){
                            if(!cells.includes(item)){
                                cells.push(item);
                            }
                        }
                    });
                }
            });

            const contexts = this.state.contexts.map((item) => {
                if(item.element.id === row.element.id){
                    return {
                        checked: !item.checked, 
                        element: item.element
                    };
                }

                return item;
            });

            this.setState({
                dimensions,
                cells,
                contexts
            });
        }
    }

    onDimensionClick(row, checked){
        if(checked){
            const table = this.state.contexts.find(
                (context) => row.parent.element.id == context.element.id
            )
            .element;
            const cells = [];
            const rows = Array.from(table.rows);

            rows.map((item, index) => {
                if(index > 0){
                    const cell = item.cells[row.index];
                    cell.id = cell.innerText;

                    cells.push({
                        checked,
                        parent: row,
                        element: cell
                    });
                }
            });

            const dimensions = this.state.dimensions.map((item) => {
                if(item.element.id === row.element.id){
                    return {
                        checked: !item.checked, 
                        element: item.element,
                        parent: item.parent,
                        index: item.index
                    };
                }

                return item;
            });

            this.setState({
                cells: [...this.state.cells, ...cells],
                dimensions
            });
        }
        else{
            const rows = this.state.cells;
            const cells = [];

            rows.map(item => {
                if(item.parent.element.id !== row.element.id){
                    cells.push(item);
                }
            });

            const dimensions = this.state.dimensions.map((item) => {
                if(item.element.id === row.element.id){
                    return {
                        checked: !item.checked, 
                        element: item.element,
                        parent: item.parent,
                        index: item.index
                    };
                }

                return item;
            });

            this.setState({
                cells,
                dimensions
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