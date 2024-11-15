import React from 'react';

const DinosaurForm = (props) => {

  const options = props.paddocks.map((paddock, index) => {
    return <option key={index} value={paddock._links.self.href}>{paddock.name}</option>
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    const dinosaur ={
      "name": event.target.name.value,
      "species": event.target.species.value,
      "type": event.target.type.value,
      "gender": event.target.gender.value,
      "age": event.target.age.value,
      "paddock": event.target.paddock.value
    }
    props.handleDinosaurPost(dinosaur);

  }

  return (
    <div>
      <h3>Add a new dinosaur</h3>
      <form onSubmit={handleSubmit}>
      <input type="text" required="required" placeholder="Name" name="name"/>
      <select required="required" name="species">Gender:
        <option value="Cerasinops">Cerasinops</option>
        <option value="Leptoceratops">Leptoceratops</option>
        <option value="Bagaceratops">Bagaceratops</option>
        <option value="Protoceratops">Protoceratops</option>
        <option value="Leaellynasaura">Leaellynasaura</option>
        <option value="Dracorex">Dracorex</option>
        <option value="Archaeoceratops">Archaeoceratops</option>
        <option value="Microceratops">Microceratops</option>
      </select>
      <input required="required" type="number" min="0" placeholder="Age" name="age"/>
      <select required="required" name="gender">Gender:
        <option value="female">Female</option>
        <option value="male">Male</option>
      </select>
      <select required="required" name="type">Type:
        <option value="Herbivore">Herbivore</option>
        <option value="Carnivore">Carnivore</option>
      </select>
      <select required="required" name="paddock">
        {options}
      </select>
      <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default DinosaurForm;
