import { PrismaClient } from "@prisma/client";
import { UsuarioRepository } from "../user.repository";
import { Usuario } from "../../entities/usuario.entity";

export class UsuarioRepositoryPrisma implements UsuarioRepository {
  private constructor(private readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new UsuarioRepositoryPrisma(prisma)
  }

  public async save(usuario: Usuario): Promise<void> {
    const usuarios = await this.prisma.usuario.findMany()

    if (usuarios.some(u => u.cpf === usuario.cpf)) {
      throw new Error('CPF já cadastrado')
    }

    if(usuario.cpf.length !== 11) {
      throw new Error('CPF inválido')
    }

    await this.prisma.usuario.create({
      data: {
        nome: usuario.nome,
        cpf: usuario.cpf,
        senha: usuario.senha,
        apartamento: usuario.apartamento
      }
    })
  }

  public async list(): Promise<Usuario[]> {
    const usuarios = await this.prisma.usuario.findMany()

    return usuarios.map(u => Usuario.with(u.id, u.nome, u.cpf, u.senha, u.apartamento))
    
  }

  public async delete(id: string): Promise<void> {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        id
      }
    })

    if (!usuario) {
      throw new Error('Usuário não encontrado')
    }
    
    await this.prisma.usuario.delete({
      where: {
        id
      }
    })
  }

  public async findByCpf(cpf: string): Promise<Usuario | undefined> {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        cpf
      }
    })

    if (!usuario) {
      throw new Error('Usuário não encontrado')
    }

    return Usuario.with(usuario.id, usuario.nome, usuario.cpf, usuario.senha, usuario.apartamento)
  }

  public async findById(id: string): Promise<Usuario | undefined> {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        id
      }
    })

    if (!usuario) {
      throw new Error('Usuário não encontrado')
    }

    return Usuario.with(usuario.id, usuario.nome, usuario.cpf, usuario.senha, usuario.apartamento)
  }

}