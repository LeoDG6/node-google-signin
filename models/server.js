import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import {router as userRoutes} from '../routes/usuarios.js';
import {dbConnection} from '../database/config.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Conectar a base de datos
        this.conectarDB();
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        // Lectura y parseo del body
        this.app.use(express.json());
        // Directorio Público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use('/api/usuarios', userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo', this.port);
          });
    }
}

export { Server };