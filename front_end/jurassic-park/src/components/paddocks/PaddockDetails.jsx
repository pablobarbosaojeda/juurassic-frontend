import React from 'react';
import Paddock from './Paddock';

const PaddockDetails = (props) => {

  const handlePaddockDelete = () => {
    props.onPaddockDelete(props.paddock.id)
  }

  const renderMatrix = () => {
    const cells = [];
    for (let i = 0; i < 100; i++) {
      cells.push(<div key={i} className="matrix-cell"></div>);
    }
    return cells;
  }

  return(
      <div>
        <div className="paddock-details-container">
          <div className="component" id="paddock-details">
            <h3>Paddock Details</h3>
            <Paddock paddock={props.paddock}/>
            <div className="buttons">
              <button onClick={handlePaddockDelete}>Remove Paddock</button>
            </div>
          </div>
        </div>
        <div className="matrix-container">
          <div className="matrix">
            {renderMatrix()}
          </div>
        </div>
      </div>
  )
}

export default PaddockDetails;
