import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Request from '../helpers/request';
import NavBar from '../NavBar';
import DinosaurDetails from '../components/dinosaurs/DinosaurDetails';
import DinosaurContainer from './dinosaurs/DinosaurContainer';
import DinosaurFormContainer from './dinosaurs/DinosaurFormContainer';
import PaddockDetails from '../components/paddocks/PaddockDetails';
import PaddockFormContainer from './paddocks/PaddockFormContainer';
import PaddockContainer from './paddocks/PaddockContainer';
import DashboardContainer from './park/DashboardContainer';


class MainContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      park: {},
      dinosaurs: [],
      paddocks: [],
      visitors: 0,
      revenue: 0,
      parkOpen: false,
      date: null
      // totalRevenue: 0
    }
    this.findPaddockById = this.findPaddockById.bind(this);
    this.findDinosaurById = this.findDinosaurById.bind(this);
    this.handleDinosaurDelete = this.handleDinosaurDelete.bind(this);
    this.handlePaddockDelete = this.handlePaddockDelete.bind(this);
    this.handleUpdateDinosaur = this.handleUpdateDinosaur.bind(this);
    this.closePark = this.closePark.bind(this);
    this.visitorTimer = null;

  }

  componentDidMount(){

    // this.visitorTimer = setInterval(() => this.addVisitors(), 10000);

    const request = new Request();

    const promise1 = request.get('/api/dinosaurs');
    const promise2 = request.get('/api/paddocks');
    const promise3 = request.get('/api/parks');
    const promises = [promise1, promise2, promise3]

    Promise.all(promises)
    .then((data) => {
      this.setState({
        dinosaurs: data[0]._embedded.dinosaurs,
        paddocks: data[1]._embedded.paddocks,
        park: data[2]._embedded.parks[0]
      })
    })

    const today = new Date();
    const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    this.setState({
      date: date
    })
  }

  addVisitors() {
    const updatedVisitors = this.state.visitors + 1;
    const updatedRevenue = this.state.revenue + 5;
    this.setState({
      visitors: updatedVisitors,
      revenue: updatedRevenue
    });
  }

  closePark() {
    // stop the visitor counter going up
    clearTimeout(this.visitorTimer);

    let updatedPark = this.state.park;
    updatedPark.totalRevenue += this.state.revenue;
    this.setState({
      visitors: 0,
      park: updatedPark,
      revenue: 0,
      parkOpen: false
    });

    // post the park with updated revenue to database
    let parkToPost = {
      totalRevenue: updatedPark.totalRevenue
    };
    const request = new Request();
    request.patch('/api/parks/' + updatedPark.id, parkToPost).then(() => {
      // window.location = '/'
    })
  }

  /**/

  openPark = () => {
    this.setState({
      parkOpen: true
    })
    this.visitorTimer = setInterval(() => this.addVisitors(), 1000);
  }

  toggleOpenClose = () => {
    if(this.state.parkOpen) {
      this.closePark();

    } else {
      this.openPark();
    }
  }

  findDinosaurById(id){
    const dinosaur = this.state.dinosaurs.find((dinosaur) => {
      return dinosaur.id === parseInt(id)
    })
    return dinosaur;
  }

  findPaddockById(id){
    const paddock = this.state.paddocks.find((paddock) => {
      return paddock.id === parseInt(id)
    })
    return paddock;
  }

  handleDinosaurDelete(id){
    const request = new Request()
    const url = '/api/dinosaurs/'+id;
    request.delete(url).then(()=>{
      window.location ='/';
    });
  }

  handlePaddockDelete(id){
    const request = new Request()
    const url = '/api/paddocks/'+id;
    request.delete(url).then(()=>{
      window.location ='/';
    });
  }

  handleUpdateDinosaur(id, dinosaur){
    const request = new Request();
    request.patch('/api/dinosaurs/'+id, dinosaur)
    .then(() => {
      window.location = '/dinosaurs/'+id;
    })
  }

  handleFeedDinosaur(id, dinosaur){
    const request = new Request();
    request.patch('/api/dinosaurs/'+id, dinosaur)
    .then(() => {
      window.location = '/dinosaurs/'+id;
    })
  }
  render(){
    return(
      <Fragment>
      <Router>
      <NavBar/>
      <Switch>
      {/* HOME */}
      <Route exact path="/" render={(props) => {
        return (
          <Fragment>
            <div className="main-container">
              <div className="dinosaur-paddock-wrapper">
                <div className="dinosaur-paddock-container">
                  <DinosaurContainer dinosaurs={this.state.dinosaurs}/>
                </div>
              </div>

              <div id="stats" className="component">
                <h3>Today's Date:</h3>
                <h3>{this.state.date}</h3>
                <p><span>Total Revenue:</span> £ {this.state.park.totalRevenue}</p>
                <div className="buttons">
                  <button onClick={this.toggleOpenClose}>
                    {(this.state.parkOpen) ? "Close Park" : "Open Park"}
                  </button>
                </div>
                <p><span>Visitor Count:</span> {this.state.visitors}</p>
                <p><span>Daily Revenue:</span> £{this.state.revenue}</p>
              </div>

              <div className="dinosaur-paddock-wrapper">
                <div className="dinosaur-paddock-container">
                  <PaddockContainer paddocks={this.state.paddocks}/>
                </div>
              </div>
            </div>
          </Fragment>
        )
      }}/>
      {/* ADD A DINOSAUR */}
      <Route exact path="/dinosaurs/new" render={(props) =>{
        return <DinosaurFormContainer
        paddocks={this.state.paddocks}/>
      }}/>

      {/* VIEW A DINOSAUR BY ID */}
      <Route exact path="/dinosaurs/:id" render={(props) => {
        const id = props.match.params.id;
        const dinosaur = this.findDinosaurById(id);
        return <DinosaurDetails
        dinosaur={dinosaur}
        paddocks={this.state.paddocks}
        handleFeedDinosaur={this.handleFeedDinosaur}
        handleUpdateDinosaur={this.handleUpdateDinosaur}
        findPaddockById={this.findPaddockById}
        onDinosaurDelete={this.handleDinosaurDelete}/>
      }}/>

      {/* ADD A PADDOCK */}
      <Route exact path="/paddocks/new" render={(props) =>{
        return <PaddockFormContainer/>
      }}/>

      {/* VIEW A PADDOCK BY ID */}
      <Route exact path="/paddocks/:id" render={(props) => {
        // const dino_id = props.match.params.id;
        // const dinosaur = this.findDinosaurById(dino_id);
        const id = props.match.params.id;
        const paddock = this.findPaddockById(id);
        return <PaddockDetails
        dinosaurs={this.state.dinosaurs}
        paddock={paddock}
        onPaddockDelete={this.handlePaddockDelete}/>
      }}/>

      {/* VIEW DASHBOARD */}
      <Route exact path="/dashboard" render={(props) => {
        return <DashboardContainer/>
      }}/>

      </Switch>
      </Router>
      </Fragment>
    )
  }
}

export default MainContainer;
