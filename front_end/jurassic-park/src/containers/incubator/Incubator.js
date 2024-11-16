import React, { useEffect, useState } from 'react';
import './Incubator.css';

const Incubator = () => {
    const [dinosaurs, setDinosaurs] = useState([]); // Inicializar como un array vacío

    useEffect(() => {
        const fetchDinosaurs = () => {
            fetch('/api/dinosaurs') // Ajusta el endpoint según tu backend
                .then((response) => response.json())
                .then((data) => {
                    if (Array.isArray(data)) {
                        setDinosaurs(data); // Asigna solo si es un array
                    } else {
                        console.error('Unexpected response format:', data);
                        setDinosaurs([]); // Fallback a un array vacío
                    }
                })
                .catch((error) => {
                    console.error('Error fetching dinosaurs:', error);
                    setDinosaurs([]); // Fallback a un array vacío
                });
        };

        fetchDinosaurs(); // Primera llamada
        const interval = setInterval(fetchDinosaurs, 5000); // Actualizar cada 5 segundos

        return () => clearInterval(interval); // Limpiar intervalo al desmontar
    }, []);

    return (
        <div className="incubator-container">
            <h2>Incubator</h2>
            {dinosaurs.length > 0 ? (
                <ul>
                    {dinosaurs.map((dino) => (
                        <li key={dino.id}>
                            {dino.name} - {dino.species} ({dino.type}, {dino.gender}) - Age: {dino.age}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No dinosaurs currently available.</p>
            )}
        </div>
    );
};

export default Incubator;
