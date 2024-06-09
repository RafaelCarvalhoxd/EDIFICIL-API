import { Request, Response } from "express";
import { AvisoRepositoryPrisma } from "../repositories/prisma/aviso.repository.prisma";
import { prisma } from "../utils/prisma.util";
import { AvisoServiceImplementation } from "../services/implementation/aviso.service.implementation";

export class AvisoController {
    private constructor() {}

    public static build() {
        return new AvisoController();
    }

    public async criarAviso(req: Request, res: Response) {
        const { tipo, assunto, descricao } = req.body;

        const repository = AvisoRepositoryPrisma.build(prisma);
        const avisoService = AvisoServiceImplementation.build(repository);

        const output = await avisoService.criarAviso(tipo, assunto, descricao);

        const data = {
            id: output.id,
            tipo: output.tipo,
            assunto: output.assunto,
            descricao: output.descricao,
            data: output.data
        }

        res.status(201).json(data);
    }

    public async listarAvisos(req: Request, res: Response) {
        const repository = AvisoRepositoryPrisma.build(prisma);
        const avisoService = AvisoServiceImplementation.build(repository);

        const output = await avisoService.listarAvisos();

        const data = {
            avisos: output.avisos
        }

        res.status(200).json(data);
    }

    public async buscarAviso(req: Request, res: Response) {
        const { id } = req.params;

        const repository = AvisoRepositoryPrisma.build(prisma);
        const avisoService = AvisoServiceImplementation.build(repository);

        const output = await avisoService.buscarAviso(id);

        if (!output) {
            res.status(404).json({ message: "Aviso não encontrado" });
            return;
        }

        const data = {
            id: output.id,
            tipo: output.tipo,
            assunto: output.assunto,
            descricao: output.descricao,
            data: output.data
        }

        res.status(200).json(data);
    }

    public async editarAviso(req: Request, res: Response) {
        const { id } = req.params;
        const { tipo, assunto, descricao } = req.body;

        const repository = AvisoRepositoryPrisma.build(prisma);
        const avisoService = AvisoServiceImplementation.build(repository);

        await avisoService.editarAviso(id, tipo, assunto, descricao);

        res.status(204).send();
    }

    public async deletarAviso(req: Request, res: Response) {
        const { id } = req.params;

        const repository = AvisoRepositoryPrisma.build(prisma);
        const avisoService = AvisoServiceImplementation.build(repository);

        await avisoService.deletarAviso(id);

        res.status(204).send();
    }
}
