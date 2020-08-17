import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';
import axios from 'axios';
import apiKey from './config'

// App componants
import Photo from './Components/Photo';
import Search from './Components/Search';
import Nav from './Components/Nav';
import NotFound from './Components/NotFound';


class App extends Component {

  constructor() {
    super();
    this.state = {
      //three topics can be set here
      images:{water:[], tree:[], ice:[]},
      loading: true, 
      //search results and the search topic are held here
      search:{topic:"", results:[]},
    };  
  } 

  //three topics are set on launch
  componentDidMount() {
    this.setThreeTopics();  
  }


  //API call used for the initial three topics and searches
  axiosCall = (topic) => {
    return axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${topic}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      return response.data
    })
  }

  setThreeTopics = () => {
    // map over images then take the key names to search
    //for the three base topics. Set loading to false on finish. 
    Object.keys(this.state.images).map(topic =>
        this.axiosCall(topic)
          .then (response => {
          this.setState({images: {
              ...this.state.images,
              [topic]:response.photos.photo}})
            })
          .catch(error => {
            console.log('Error fetching and parsing data', error);
            })
      )
      setTimeout(() => {
        this.setState({loading: false}) 
      }, 500);
    }
  
  //Search takes a topic and adds it to the search object in images
  handleSearch = (topic) => {
    this.setState({loading: true})
    this.axiosCall(topic)
    .then(response => {
      this.setState({search: {
        ...this.state.search,
        topic: topic, results:response.photos.photo}})
      })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
    setTimeout(() => {
      this.setState({loading: false}) 
    }, 500);
       
  }

  render() { 
    return (
      <BrowserRouter>
          <div className="container">
          <Search performSearch={this.handleSearch}/>
          <Nav images={this.state.images}/>
          <Switch>
            <Route exact path={"/"} render={ () => <Redirect to={`/Photo/${Object.keys(this.state.images)[0]}`} /> } />
            {/* If loading is true, this is displayed, else Photo component is shown */}
            <Route exact path="/photo/:searchURL" render={(props) => (this.state.loading)? <p>Loading...</p> : <Photo {...props} 
              images={this.state.images} 
              search={this.state.search}
              /> }
            /> 
            <Route component={NotFound} />
          </Switch>
          </div>   
    </BrowserRouter>
    );
  }
}

export default App;