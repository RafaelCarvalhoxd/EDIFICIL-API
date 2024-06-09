import { Request, Response } from "express";
import { UsuarioRepositoryPrisma } from "../repositories/prisma/usuario.repository.prisma";
import { prisma } from "../utils/prisma.util";
import { UsuarioServiceImplementation } from "../services/implementation/usuario.service.implementation";

export class UsuarioController {
    private constructor() {}

    public static build() {
        return new UsuarioController();
    }

    public async register(req: Request, res: Response) {
        const { nome, cpf, senha, apartamento } = req.body;
       
        const repository = UsuarioRepositoryPrisma.build(prisma);
        const usuarioService = UsuarioServiceImplementation.build(repository);

        const output = await usuarioService.register(nome, cpf, senha, apartamento);

        const data = {
            id: output.id,
            nome: output.nome,
            cpf: output.cpf,
            senha: output.senha,
            apartamento: output.apartamento
        }

        res.status(201).json(data);
    }

    public async login(req: Request, res: Response) {
        const { cpf, senha } = req.body;

        const repository = UsuarioRepositoryPrisma.build(prisma);
        const usuarioService = UsuarioServiceImplementation.build(repository);

        const output = await usuarioService.login(cpf, senha);

        if (!output) {
            res.status(401).json({ message: "Usuário não encontrado" });
            return;
        }

        const data = {
            id: output.id,
            nome: output.nome,
            cpf: output.cpf,
            apartamento: output.apartamento
        }

        res.status(200).json(data);
    }

    public async list(req: Request, res: Response) {
        const repository = UsuarioRepositoryPrisma.build(prisma);
        const usuarioService = UsuarioServiceImplementation.build(repository);

        const output = await usuarioService.list();

        const data = {
          usuarios: output.usuarios
        }

        res.status(200).json(data);
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;

        const repository = UsuarioRepositoryPrisma.build(prisma);
        const usuarioService = UsuarioServiceImplementation.build(repository);

        await usuarioService.delete(id);

        res.status(204).send();
    }

    public async findByCpf(req: Request, res: Response) {
        const { cpf } = req.params;

        const repository = UsuarioRepositoryPrisma.build(prisma);
        const usuarioService = UsuarioServiceImplementation.build(repository);

        const output = await usuarioService.findByCpf(cpf);

        if (!output) {
            res.status(404).json({ message: "Usuário não encontrado" });
            return;
        }

        const data = {
            id: output.id,
            nome: output.nome,
            cpf: output.cpf,
            senha: output.senha,
            apartamento: output.apartamento
        }

        res.status(200).json(data);
    }

    public async findById(req: Request, res: Response) {
        const { id } = req.params;

        const repository = UsuarioRepositoryPrisma.build(prisma);
        const usuarioService = UsuarioServiceImplementation.build(repository);

        const output = await usuarioService.findById(id);

        if (!output) {
            res.status(404).json({ message: "Usuário não encontrado" });
            return;
        }

        const data = {
            id: output.id,
            nome: output.nome,
            cpf: output.cpf,
            senha: output.senha,
            apartamento: output.apartamento
        }

        res.status(200).json(data);
    }
}
