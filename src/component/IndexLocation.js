import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import StateLocation from './StateLocation';

export default class IndexLocation extends Component {

    state = {
        data: []
    };
    
      componentDidMount() {
        this.callCountryApi('/country')
          .then(res => this.setState({ data: res }))
          .catch(err => console.log(err));
      }
    
      callCountryApi = async (location_param) => {
        const response = await fetch('/location' + location_param);
        const body = await response.json();
    
        if (response.status !== 200) throw Error(body.message);

        /*if(location_param.indexOf('country') > -1){
            body.forEach(function(part, index, theArray){
                theArray[index].id = '/state/' + part.id;
            });
        } else if(location_param.indexOf('state') > -1){
            body.forEach(function(part, index, theArray){
                theArray[index].id = '/city/' + part.id;
            });
        } else if(location_param.indexOf('city') > -1){
            body.forEach(function(part, index, theArray){
                theArray[index].id = '/neighborhood/' + part.id;
            });
        } else if(location_param.indexOf('neighborhood') > -1){
            body.forEach(function(part, index, theArray){
                theArray[index].id = '/subneighborhood/' + part.id;
            });
        }*/
    
        return body;
      };

    render() {
        return (
            <Router>
                <div>
                    <p>Brasil - States</p>
                    {this.state.data.map(state =>
                    <div key={state.id}><li><Link to={`/state/${state.id}`}>{state.name}</Link></li></div>
                    )}
                    <Switch>
                        <Route exact path='/state/:stateId' component={StateLocation} />
                    </Switch>
                </div>
            </Router>
        )
    }
}