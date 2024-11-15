import React, {Fragment} from 'react';

const PaddockList = (props) => {

  const paddocks = props.paddocks.map((paddock, index) => {
    const url = "/paddocks/" +paddock.id;
		return(
      <div key={index} className="component">
  			<li key={index}>
          <h3>{paddock.name}</h3>
          <div className="buttons">
	            <a href={url}><button>View Paddock Details</button></a>
	        </div>
        </li>
      </div>
		)
	})

  return (
    <Fragment>
    <div className="buttons">
      <a href="/paddocks/new"><button>Add Paddock</button></a>
    </div>
      <ul className="container-list">
        {paddocks}
      </ul>
    </Fragment>
  )
}

export default PaddockList;
