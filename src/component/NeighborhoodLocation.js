import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default class NeighborhoodLocation extends Component {

    constructor(props){
        super(props);
        this.neighborhoodId = this.props.location.pathname.substr(14);
    }
    neighborhoodId = "";
    state = {
        data: []
    };
    
      componentDidMount() {
        this.callCountryApi('/neighborhood/' + this.neighborhoodId)
          .then(res => this.setState({ data: res }))
          .catch(err => console.log(err));
      }
    
      callCountryApi = async (location_param) => {
        const response = await fetch('/location' + location_param);
        const body = await response.json();
    
        if (response.status !== 200) throw Error(body.message);
    
        return body;
      };

    render() {
        return (            
                <div>
                    <p>Brasil - Sub Neighborhoods</p>
                    {this.state.data.map(subneighborhood =>
                    <div key={subneighborhood.id}><li>{subneighborhood.name}</li></div> 
                    )}                    
                </div>           
        )
    }
}