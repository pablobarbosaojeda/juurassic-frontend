import React from 'react';
import Paddock from './Paddock';

const PaddockDetails = (props) => {

  const handlePaddockDelete = () => {
    props.onPaddockDelete(props.paddock.id)
  }

  return(
    <div className="paddock-details-container">
      <div className="component" id="paddock-details">
        <h3>Paddock Details</h3>
        <Paddock paddock={props.paddock}/>
        <div className="buttons">
          <button onClick={handlePaddockDelete}>Remove Paddock</button>
        </div>
      </div>
    </div>
  )
}
export default PaddockDetails
