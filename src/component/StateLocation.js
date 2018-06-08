import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CityLocation from './CityLocation';

export default class StateLocation extends Component {

    constructor(props){
        super(props);
        this.stateId = this.props.location.pathname.substr(7);
    }
    stateId = "";
    state = {
        data: []
    };
    
      componentDidMount() {
        this.callCountryApi('/state/' + this.stateId)
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
                    <p>Brasil - Cities</p>
                    {this.state.data.map(city =>
                    <div key={city.id}><li><Link to={`/city/${city.id}`}>{city.name}</Link></li></div> 
                    )}
                    <Switch>
                        <Route exact path='/city/:cityId' component={CityLocation} />
                    </Switch>
                </div>
            </Router>
        )
    }
}