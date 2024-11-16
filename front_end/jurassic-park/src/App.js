import React, { Component } from 'react';
import './App.css';
import MainContainer from './containers/MainContainer';
import Incubator from './containers/incubator/Incubator'; // Importar el componente de la incubadora

class App extends Component {
    render() {
        return (
            <div className="app-container">
                {/* Header */}
                <header className="app-header">
                    <h1>Jurassic Park Management</h1>
                </header>

                {/* Main Content */}
                <main className="app-main">
                    <div className="main-content-wrapper">
                        <MainContainer /> {/* Render del contenedor principal */}
                        <Incubator /> {/* Render de la incubadora */}
                    </div>
                </main>

                {/* Footer */}
                <footer className="app-footer">
                    <p>&copy; 2024 Jurassic Park Inc. All rights reserved.</p>
                </footer>
            </div>
        );
    }
}

export default App;
