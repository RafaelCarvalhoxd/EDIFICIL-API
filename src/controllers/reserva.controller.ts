import { Request, Response } from "express";
import { ReservaRepositoryPrisma } from "../repositories/prisma/reserva.repository.prisma";
import { UsuarioRepositoryPrisma } from "../repositories/prisma/usuario.repository.prisma";
import { prisma } from "../utils/prisma.util";
import { ReservaServiceImplementation } from "../services/implementation/reserva.service.implementaion";

export class ReservaController {
    private constructor() {}

    public static build() {
        return new ReservaController();
    }

    public async criarReserva(req: Request, res: Response) {
        const { area, data, usuarioId } = req.body;

        const reservaRepository = ReservaRepositoryPrisma.build(prisma);
        const usuarioRepository = UsuarioRepositoryPrisma.build(prisma);
        const reservaService = ReservaServiceImplementation.build(reservaRepository, usuarioRepository);

        const output = await reservaService.criarReserva(area, new Date(data), usuarioId);

        const responseData = {
            id: output.id,
            area: output.area,
            data: output.data,
            usuario: {
                id: output.usuario.id,
                nome: output.usuario.nome,
                apartamento: output.usuario.apartamento
            }
        }

        res.status(201).json(responseData);
    }

    public async listarReservas(req: Request, res: Response) {
        const reservaRepository = ReservaRepositoryPrisma.build(prisma);
        const usuarioRepository = UsuarioRepositoryPrisma.build(prisma);
        const reservaService = ReservaServiceImplementation.build(reservaRepository, usuarioRepository);

        const output = await reservaService.listarReservas();

        const responseData = {
            reservas: output.reservas
        }

        res.status(200).json(responseData);
    }

    public async buscarReserva(req: Request, res: Response) {
        const { id } = req.params;

        const reservaRepository = ReservaRepositoryPrisma.build(prisma);
        const usuarioRepository = UsuarioRepositoryPrisma.build(prisma);
        const reservaService = ReservaServiceImplementation.build(reservaRepository, usuarioRepository);

        const output = await reservaService.buscarReserva(id);

        if (!output) {
            res.status(404).json({ message: "Reserva não encontrada" });
            return;
        }

        const responseData = {
            id: output.id,
            area: output.area,
            data: output.data,
            usuario: {
                id: output.usuario.id,
                nome: output.usuario.nome,
                apartamento: output.usuario.apartamento
            }
        }

        res.status(200).json(responseData);
    }

    public async editarReserva(req: Request, res: Response) {
        const { id } = req.params;
        const { area, data } = req.body;

        const reservaRepository = ReservaRepositoryPrisma.build(prisma);
        const usuarioRepository = UsuarioRepositoryPrisma.build(prisma);
        const reservaService = ReservaServiceImplementation.build(reservaRepository, usuarioRepository);

        await reservaService.editarReserva(id, area, new Date(data));

        res.status(204).send();
    }

    public async cancelarReserva(req: Request, res: Response) {
        const { id } = req.params;

        const reservaRepository = ReservaRepositoryPrisma.build(prisma);
        const usuarioRepository = UsuarioRepositoryPrisma.build(prisma);
        const reservaService = ReservaServiceImplementation.build(reservaRepository, usuarioRepository);

        await reservaService.cancelarReserva(id);

        res.status(204).send();
    }
}
