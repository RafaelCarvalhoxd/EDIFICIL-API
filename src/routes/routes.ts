import { Router } from 'express';
import { UsuarioController } from '../controllers/usuario.controller';
import { ReservaController } from '../controllers/reserva.controller';
import { AvisoController } from '../controllers/aviso.controller';

const routes = Router();

const usuarioController = UsuarioController.build();
const reservaController = ReservaController.build();
const avisoController = AvisoController.build();

// Rotas de usuário
routes.post('/usuarios/register', (req, res) => usuarioController.register(req, res));
routes.post('/usuarios/login', (req, res) => usuarioController.login(req, res));
routes.get('/usuarios', (req, res) => usuarioController.list(req, res));
routes.delete('/usuarios/:id', (req, res) => usuarioController.delete(req, res));
routes.get('/usuarios/cpf/:cpf', (req, res) => usuarioController.findByCpf(req, res));
routes.get('/usuarios/:id', (req, res) => usuarioController.findById(req, res));

// Rotas de reservas
routes.post('/reservas', (req, res) => reservaController.criarReserva(req, res));
routes.get('/reservas', (req, res) => reservaController.listarReservas(req, res));
routes.get('/reservas/:id', (req, res) => reservaController.buscarReserva(req, res));
routes.put('/reservas/:id', (req, res) => reservaController.editarReserva(req, res));
routes.delete('/reservas/:id', (req, res) => reservaController.cancelarReserva(req, res));

// Rotas de avisos
routes.post('/avisos', (req, res) => avisoController.criarAviso(req, res));
routes.get('/avisos', (req, res) => avisoController.listarAvisos(req, res));
routes.get('/avisos/:id', (req, res) => avisoController.buscarAviso(req, res));
routes.put('/avisos/:id', (req, res) => avisoController.editarAviso(req, res));
routes.delete('/avisos/:id', (req, res) => avisoController.deletarAviso(req, res));

export { routes };
