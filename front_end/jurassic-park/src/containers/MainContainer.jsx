import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Request from '../helpers/request';
import NavBar from '../NavBar';
import DinosaurDetails from '../components/dinosaurs/DinosaurDetails';
import DinosaurContainer from './dinosaurs/DinosaurContainer';
import DinosaurFormContainer from './dinosaurs/DinosaurFormContainer';
import PaddockDetails from '../components/paddocks/PaddockDetails';
import PaddockContainer from './paddocks/PaddockContainer';
import DashboardContainer from './park/DashboardContainer';

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            park: {},
            dinosaurs: [],
            paddocks: [],
            visitors: 0,
            revenue: 0,
            parkOpen: false,
            date: null,
        };

        this.findPaddockById = this.findPaddockById.bind(this);
        this.findDinosaurById = this.findDinosaurById.bind(this);
        this.handleDinosaurDelete = this.handleDinosaurDelete.bind(this);
        this.handlePaddockDelete = this.handlePaddockDelete.bind(this);
        this.handleUpdateDinosaur = this.handleUpdateDinosaur.bind(this);
    }

    componentDidMount() {
        const request = new Request();

        const promise1 = request.get('/api/dinosaurs');
        const promise2 = request.get('/api/paddocks');
        const promise3 = request.get('/api/parks');
        const promises = [promise1, promise2, promise3];

        Promise.all(promises)
            .then((data) => {
                this.setState({
                    dinosaurs: data[0]._embedded.dinosaurs,
                    paddocks: data[1]._embedded.paddocks,
                    park: data[2]._embedded.parks[0] || {}, // Manejo si no hay parques
                });
            })
            .catch((error) => console.error('Error fetching data:', error));

        const today = new Date();
        const date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
        this.setState({
            date: date,
        });
    }

    findDinosaurById(id) {
        return this.state.dinosaurs.find((dinosaur) => dinosaur.id === parseInt(id));
    }

    findPaddockById(id) {
        return this.state.paddocks.find((paddock) => paddock.id === parseInt(id));
    }

    handleDinosaurDelete(id) {
        const request = new Request();
        const url = `/api/dinosaurs/${id}`;
        request.delete(url).then(() => {
            this.setState({
                dinosaurs: this.state.dinosaurs.filter((dinosaur) => dinosaur.id !== id),
            });
        });
    }

    handlePaddockDelete(id) {
        const request = new Request();
        const url = `/api/paddocks/${id}`;
        request.delete(url).then(() => {
            this.setState({
                paddocks: this.state.paddocks.filter((paddock) => paddock.id !== id),
            });
        });
    }

    handleUpdateDinosaur(id, dinosaur) {
        const request = new Request();
        request.patch(`/api/dinosaurs/${id}`, dinosaur).then(() => {
            const updatedDinosaurs = this.state.dinosaurs.map((d) =>
                d.id === id ? { ...d, ...dinosaur } : d
            );
            this.setState({ dinosaurs: updatedDinosaurs });
        });
    }

    render() {
        return (
            <Fragment>
                <Router>
                    <NavBar
                        parkData={{
                            visitors: this.state.visitors,
                            hazardLevel: 0, // Placeholder, actualizar según lógica real
                            totalRevenue: this.state.park.totalRevenue || 0,
                        }}
                    />
                    <Switch>
                        {/* HOME */}
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <div className="main-container">
                                    <div className="dinosaur-paddock-wrapper">
                                        <div className="dinosaur-paddock-container">
                                            <DinosaurContainer dinosaurs={this.state.dinosaurs} />
                                        </div>
                                    </div>
                                    <div className="dinosaur-paddock-wrapper">
                                        <div className="dinosaur-paddock-container">
                                            <PaddockContainer paddocks={this.state.paddocks} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        />

                        {/* ADD A DINOSAUR */}
                        <Route
                            exact
                            path="/dinosaurs/new"
                            render={() => (
                                <DinosaurFormContainer paddocks={this.state.paddocks || []} />
                            )}
                        />

                        {/* VIEW A DINOSAUR BY ID */}
                        <Route
                            exact
                            path="/dinosaurs/:id"
                            render={(props) => {
                                const id = props.match.params.id;
                                const dinosaur = this.findDinosaurById(id);
                                return (
                                    <DinosaurDetails
                                        dinosaur={dinosaur}
                                        paddocks={this.state.paddocks}
                                        handleUpdateDinosaur={this.handleUpdateDinosaur}
                                        onDinosaurDelete={this.handleDinosaurDelete}
                                    />
                                );
                            }}
                        />

                        {/* VIEW A PADDOCK BY ID */}
                        <Route
                            exact
                            path="/paddocks/:id"
                            render={(props) => {
                                const id = props.match.params.id;
                                const paddock = this.findPaddockById(id);
                                return (
                                    <PaddockDetails
                                        paddock={paddock}
                                        onPaddockDelete={this.handlePaddockDelete}
                                    />
                                );
                            }}
                        />

                        {/* VIEW DASHBOARD */}
                        <Route exact path="/dashboard" render={() => <DashboardContainer />} />
                    </Switch>
                </Router>
            </Fragment>
        );
    }
}

export default MainContainer;
