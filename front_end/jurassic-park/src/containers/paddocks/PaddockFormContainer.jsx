import React, {Component} from 'react';
import PaddockForm from '../../components/paddocks/PaddockForm';
import Request from '../../helpers/request';

class PaddockFormContainer extends Component {
  constructor(props) {
    super(props);
    this.handlePaddockPost = this.handlePaddockPost.bind(this);
  }

  handlePaddockPost(paddock){
    const request = new Request();
    request.post('/api/paddocks', paddock).then(() => {
      window.location = '/'
    })
  }
  render(){
    return (
      <div className="form">
      <PaddockForm
      handlePaddockPost={this.handlePaddockPost}/>
      </div>
    )
  }
}

export default PaddockFormContainer;
