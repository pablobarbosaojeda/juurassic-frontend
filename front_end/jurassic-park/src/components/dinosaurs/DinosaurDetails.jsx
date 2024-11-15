import React from 'react';
import Dinosaur from './Dinosaur';

const DinosaurDetails = (props) => {

  const options = props.paddocks.map((paddock, index) => {
    return <option key={index} value={paddock.id}>{paddock.name} ({paddock.type})</option>
  })

  const handleDinosaurDelete = () => {
    props.onDinosaurDelete(props.dinosaur.id)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const dinosaur = {
    }

    if ( props.dinosaur.belly > 0){
      dinosaur.belly = props.dinosaur.belly -= 1
    } else {
      dinosaur.belly = 0
    }
    props.handleUpdateDinosaur(props.dinosaur.id, dinosaur)

  }

  const handleTransferSubmit = (event) => {
    event.preventDefault();
    const dinosaur = {};
    const newPaddock = props.findPaddockById(event.target.paddock.value);
    if (newPaddock) {
      if(props.dinosaur.type === newPaddock.type){
        dinosaur.paddock = newPaddock._links.self.href;
        props.handleUpdateDinosaur(props.dinosaur.id, dinosaur);
      } else {
        alert("Dinosaur type: "+props.dinosaur.type+" cannot be transferred to the "+newPaddock.name+ " Paddock");
      }
    }
  }


  return(
    <div className="dinosaur-details-container">
      <div className="component"  id="dinosaur-details">
        <h3>Dinosaur Details</h3>
        <Dinosaur dinosaur={props.dinosaur} dinosaurPassesAway={handleDinosaurDelete}/>
        <div className="buttons">
          <form onSubmit={handleSubmit}>
            <button type="submit">Feed Dinosaur</button>
          </form>
          <form id="transfer-button" onSubmit={handleTransferSubmit}>
            <select name="paddock">
            <option selected disabled value="none">Select a paddock</option>
              {options}
            </select>
            <button type="submit">Transfer Paddock</button>
          </form>
          <button onClick={handleDinosaurDelete}>Remove Dinosaur</button>
        </div>
      </div>
    </div>
  )
}
export default DinosaurDetails
