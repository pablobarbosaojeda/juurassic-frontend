import React, { useState, useEffect } from 'react';

const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState("");

    // Valores predeterminados para parkData
    const parkData = props.parkData || { visitors: 0, hazardLevel: 0, totalRevenue: 0 };

    useEffect(() => {
        // Actualizar el estado del parque basado en la hora
        const updateParkStatus = () => {
            const currentHour = new Date().getHours();
            setIsOpen(currentHour >= 8 && currentHour < 20); // Parque abierto de 8 AM a 8 PM
        };

        updateParkStatus();
        const interval = setInterval(updateParkStatus, 60000); // Actualizar cada minuto
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Obtener y formatear la fecha actual
        const today = new Date();
        const formattedDate = today.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        setCurrentDate(formattedDate);
    }, []);

    return (
        <header>
            {/* Logo del parque */}
            <img src="/images/jurassic_park_logo.png" alt="Logo" />

            {/* Menú principal */}
            <ul>
                <li className="navLink">
                    <a href="/">HOME</a>
                </li>
            </ul>

            {/* Información dinámica del parque */}
            <div className="navbar-info">
                <p>
                    Estado del parque: <strong>{isOpen ? "Abierto" : "Cerrado"}</strong>
                </p>
                <p>
                    Visitantes actuales: <strong>{parkData.visitors}</strong>
                </p>
                <p>
                    Nivel de peligro: <strong>{parkData.hazardLevel}</strong>
                </p>
                <p>
                    Ingresos totales: <strong>${parkData.totalRevenue.toFixed(2)}</strong>
                </p>
                <p>
                    Fecha: <strong>{currentDate}</strong>
                </p>
            </div>
        </header>
    );
};

export default NavBar;
