import React, {Component, Fragment} from 'react';

class Dinosaur extends Component{
  constructor(props) {
    super(props);
    this.state = {
      belly: null
    }
    this.hungerTimer = null;
    this.increaseHunger = this.increaseHunger.bind(this);
  }

  componentDidUpdate() {
    // this method will run any time any data on the Dinosaur changes (potentially LOTS! of times)
    // we only want this method to run once: whenever we FULLY have the dinosaur prop, and whenever we have not yet initialized this.state.belly
    if (this.props.dinosaur && this.state.belly == null) {
      this.setState({
        belly: this.props.dinosaur.belly
      })
      this.hungerTimer = setInterval(() => this.increaseHunger(), 5000);
    }
  }

  increaseHunger(){
    const updatedBelly = this.state.belly + 1;
    this.setState({
      belly: updatedBelly
    })
    if (this.state.belly >= 15) {
      this.props.dinosaurPassesAway();
      alert("You have lost a dinosaur due to malnutrition!")
    }
  }

  render() {
    if(!this.props.dinosaur){
      return "Loading..."
    }

    return(
      <Fragment>
      <div className="component" id="element">
        <table>
          <tr>
            <th colspan="2"><h3>{this.props.dinosaur.name}</h3></th>
          </tr>
          <tr>
            <td className="first">Species:</td>
            <td>{this.props.dinosaur.species}</td>
          </tr>
          <tr>
            <td>Type:</td>
            <td>{this.props.dinosaur.type}</td>
          </tr>
          <tr>
            <td>Hunger:</td>
            <td>{this.state.belly}</td>
          </tr>
          <tr>
            <td>Gender:</td>
            <td>{this.props.dinosaur.gender}</td>
          </tr>
          <tr>
            <td>Age:</td>
            <td>{this.props.dinosaur.age}</td>
          </tr>
          <tr>
            <td>Paddock:</td>
            <td>{this.props.dinosaur.paddock.name}</td>
          </tr>
          <tr>
            <td colspan="2"><img className="dinosaur-image" src={this.props.dinosaur.img} alt="dinosaur"/></td>
          </tr>
        </table>
      </div>
      </Fragment>
    )
  }
}

export default Dinosaur;
