import React, { useEffect } from 'react';
import './PaddockDetails.css';
import Paddock from './Paddock';

const PaddockDetails = (props) => {
    const { paddock, onPaddockDelete } = props;

    // Recargar la página cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            window.location.reload(); // Recargar la página
        }, 5000); // Cada 5 segundos

        return () => clearInterval(interval); // Limpia el intervalo al desmontar
    }, []);

    // Validar si paddock existe
    if (!paddock) {
        return <p>Loading paddock details...</p>;
    }

    const handlePaddockDelete = () => {
        onPaddockDelete(paddock.id);
    };

    // Consola para depuración
    console.log('Paddock details:', paddock);

    // Crear una matriz 10x10 dinámicamente
    const grid = Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => null)
    );

    // Obtener la lista de dinosaurios
    const { dinosaurs } = paddock;

    // Definir el fondo dinámico basado en el paddock
    const backgroundImages = {
        Jungle: '/images/Jungla.webp',
        Rainforest: '/images/Rainforest.webp',
        Nublar: '/images/IslaNublar.webp',
    };
    const backgroundImage = backgroundImages[paddock.name] || '/images/default.jpg';

    return (
        <div className="paddock-details-container">
            <div className="component" id="paddock-details">
                <h3>Paddock Details</h3>
                <Paddock paddock={paddock} />
                <div className="buttons">
                    <button onClick={handlePaddockDelete}>Remove Paddock</button>
                </div>
            </div>

            <h3>Enclosure View</h3>
            <div
                className="paddock-grid"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid-row">
                        {row.map((_, colIndex) => {
                            // Comprobar si hay un dinosaurio en la celda
                            const isDinosaurHere = dinosaurs.some(
                                (dinosaur) => dinosaur.posX === rowIndex && dinosaur.posY === colIndex
                            );

                            return (
                                <div key={colIndex} className="grid-cell">
                                    {isDinosaurHere && (
                                        <img
                                            src="/images/Dino.png"
                                            alt="Dinosaur"
                                            className="dinosaur-icon"
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaddockDetails;
