import React from 'react';

const DinosaurForm = (props) => {

    const options = props.paddocks.map((paddock, index) => {
        return <option key={index} value={paddock._links.self.href}>{paddock.name}</option>
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const dinosaur = {
            "name": event.target.name.value,
            "species": event.target.species.value,
            "type": event.target.type.value,
            "gender": event.target.gender.value,
            "age": event.target.age.value,
            "health": event.target.health.value,
            "strength": event.target.strength.value,
            "hungerLevel": event.target.hungerLevel.value,
            "paddock": event.target.paddock.value
        }
        props.handleDinosaurPost(dinosaur);
    }

    return (
        <div>
            <h3>Add a New Dinosaur</h3>
            <form onSubmit={handleSubmit} className="dinosaur-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required="required" placeholder="Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="species">Species:</label>
                    <select id="species" name="species" required="required">
                        <option value="Cerasinops">Cerasinops</option>
                        <option value="Leptoceratops">Leptoceratops</option>
                        <option value="Bagaceratops">Bagaceratops</option>
                        <option value="Protoceratops">Protoceratops</option>
                        <option value="Leaellynasaura">Leaellynasaura</option>
                        <option value="Dracorex">Dracorex</option>
                        <option value="Archaeoceratops">Archaeoceratops</option>
                        <option value="Microceratops">Microceratops</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <input type="number" id="age" name="age" min="0" required="required" placeholder="Age" />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" name="gender" required="required">
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type:</label>
                    <select id="type" name="type" required="required">
                        <option value="Herbivore">Herbivore</option>
                        <option value="Carnivore">Carnivore</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="health">Health:</label>
                    <input type="number" id="health" name="health" min="0" max="100" required="required" placeholder="Health (0-100)" />
                </div>
                <div className="form-group">
                    <label htmlFor="strength">Strength:</label>
                    <input type="number" id="strength" name="strength" min="0" required="required" placeholder="Strength" />
                </div>
                <div className="form-group">
                    <label htmlFor="hungerLevel">Hunger Level:</label>
                    <input type="number" id="hungerLevel" name="hungerLevel" min="0" max="100" required="required" placeholder="Hunger Level (0-100)" />
                </div>
                <div className="form-group">
                    <label htmlFor="paddock">Paddock:</label>
                    <select id="paddock" name="paddock" required="required">
                        {options}
                    </select>
                </div>
                <div className="form-actions">
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}

export default DinosaurForm;
