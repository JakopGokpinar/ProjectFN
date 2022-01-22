import React from "react";
import SearchResult from "./SearchResult";
class SearchFilters extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            filters: {
                name:"filter"
            }
        }
    }

    getFilters = () => {
        return this.state;
    }

    setFilter = (filter,prop) => {
        this.setState({
            [filter]: prop
        })
    }

    render(){
        return(
            <SearchResult getfilter={this.getFilters} ></SearchResult>
        )
    }
}

export default SearchFilters;