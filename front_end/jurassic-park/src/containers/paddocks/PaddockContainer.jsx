import React, {Component, Fragment} from 'react';
import PaddockList from '../../components/paddocks/PaddockList';


class PaddockContainer extends Component {
  render() {
    return (
      <Fragment>

        <PaddockList
          paddocks={this.props.paddocks}/>
    
      </Fragment>
    )
  }
}

export default PaddockContainer;
