import React, {Fragment} from 'react';

const DinosaurList = (props) => {

	const dinosaurs = props.dinosaurs.map((dinosaur, index) => {
		const url = "/dinosaurs/" +dinosaur.id;
		return(
			<div key={index} className="component">
				<li key={index}>
					<h3>{dinosaur.name}</h3>
					<div className="buttons">
	            <a href={url}><button>View Dinosaur Details</button></a>
	        </div>
	      </li>
			</div>
		)
	})
	return (
    <Fragment>
		<div className="buttons">
			<a href="/dinosaurs/new"><button>Add Dinosaur</button></a>
		</div>
  		<ul className="container-list">
  		    {dinosaurs}
  		</ul>
    </Fragment>
	)
}

 export default DinosaurList;
