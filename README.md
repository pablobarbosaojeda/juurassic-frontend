# Jurassic Park Management System

Este proyecto es un sistema de gestión del parque temático Jurassic Park, diseñado como una aplicación web que permite a la administración gestionar la población de dinosaurios y realizar el seguimiento de los visitantes en el parque.

## Funcionalidades del Proyecto

1. **Gestión de Dinosaurios**:
   - Añadir o eliminar dinosaurios en el parque.
   - Asignar dinosaurios a recintos específicos (paddocks).
   - Alimentar a los dinosaurios.
   - Transferir dinosaurios entre recintos, asegurando que solo se mezclen dinosaurios del mismo tipo (herbívoros o carnívoros).

2. **Gestión de Recintos**:
   - Crear, modificar o eliminar recintos en el parque.
   - Ver detalles sobre qué dinosaurios están en cada recinto.

3. **Seguimiento de Visitantes**:
   - Monitorear el número de visitantes en el parque en tiempo real.
   - Registrar ingresos acumulados a partir de las entradas.

4. **Estado del Parque**:
   - Abrir y cerrar el parque para visitantes.

## Tecnologías Utilizadas

- **Frontend**: ReactJS
- **Backend**: Java (Spring Boot)
- **Base de Datos**: PostgreSQL

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas:

- Node.js (v14 o superior)
- Java JDK 17 o superior
- Maven
- PostgreSQL
- Docker (opcional para base de datos)

## Cómo Ejecutar el Proyecto

### 1. Configuración de la Base de Datos

1. Inicia el servicio PostgreSQL:
   ```bash
   sudo service postgresql start
   
   sudo -u postgres -i
   createdb jurassicparkmanagement

2. Ejecutar el Backend
   cd JurassicParkWorld-master

   ./mvnw spring-boot:run

3. Ejecutar el Frontend

   ```bash
   cd juurassic-frontend-master/front_end

   npm install

   npm start




