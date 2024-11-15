import React from 'react';

const PaddockForm = (props) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        const paddock = {
            "name": event.target.name.value,
            "type": event.target.type.value,
            "capacity": parseInt(event.target.capacity.value, 10) // Convertir capacity a número
        }
        props.handlePaddockPost(paddock);
    }

    return (
        <div>
            <h3>Add a new paddock</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" required="required" placeholder="Name" name="name"/>
                <input type="number" min="1" required="required" placeholder="Capacity" name="capacity"/>
                <select required="required" name="type">Type:
                    <option value="Herbivore">Herbivores Only</option>
                    <option value="Carnivore">Carnivores Only</option>
                </select>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default PaddockForm;
