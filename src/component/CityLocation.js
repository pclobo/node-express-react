import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NeighborhoodLocation from './NeighborhoodLocation';

export default class CityLocation extends Component {

    constructor(props){
        super(props);
        this.cityId = this.props.location.pathname.substr(6);
    }
    cityId = "";
    state = {
        data: []
    };
    
      componentDidMount() {
        this.callCountryApi('/city/' + this.cityId)
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
            <Router>
                <div>
                    <p>Brasil - Neighborhoods</p>
                    {this.state.data.map(neighborhood =>
                    <div key={neighborhood.id}><li><Link to={`/neighborhood/${neighborhood.id}`}>{neighborhood.name}</Link></li></div> 
                    )}
                    <Switch>
                        <Route exact path='/neighborhood/:neighborhoodId' component={NeighborhoodLocation} />
                    </Switch>
                </div>
            </Router>
        )
    }
}