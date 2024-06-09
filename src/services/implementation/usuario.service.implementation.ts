import { Usuario } from "../../entities/usuario.entity";
import { UsuarioRepository } from "../../repositories/user.repository";
import { FindByCpfOutputDTO, FindByIdOutputDTO, ListarUsuariosOutputDTO, LoginOutputDTO, RegistroOutputDTO, UsuarioService } from "../usuario.services";

export class UsuarioServiceImplementation implements UsuarioService {
  private constructor(readonly repository: UsuarioRepository) {}

  public static build(repository: UsuarioRepository) {
    return new UsuarioServiceImplementation(repository)
  }

  public async register(nome: string, cpf: string, senha: string, apartamento: string): Promise<RegistroOutputDTO> {
    const usuario = Usuario.create(nome, cpf, senha, apartamento)

    await this.repository.save(usuario)

    const output: RegistroOutputDTO = {
      id: usuario.id,
      nome: usuario.nome,
      cpf: usuario.cpf,
      senha: usuario.senha,
      apartamento: usuario.apartamento
    }

    return output
  }

  public async login(cpf: string, senha: string): Promise<LoginOutputDTO| undefined> {
    const usuario = await this.repository.findByCpf(cpf)

    if (!usuario || usuario.senha !== senha) {
      throw new Error('Usuário ou senha inválidos')
    }

    const output: LoginOutputDTO = {
      id: usuario.id,
      nome: usuario.nome,
      cpf: usuario.cpf,
      apartamento: usuario.apartamento
    }

    return output
  }

  public async list(): Promise<ListarUsuariosOutputDTO> {
    const usuarios = await this.repository.list()

    const output: ListarUsuariosOutputDTO = {
      usuarios: usuarios.map(u => ({
        id: u.id,
        nome: u.nome,
        cpf: u.cpf,
        senha: u.senha,
        apartamento: u.apartamento
      }))
    }

    return output
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  public async findByCpf(cpf: string): Promise<FindByCpfOutputDTO | undefined> {
    const usuario = await this.repository.findByCpf(cpf)

    if (!usuario) {
      return undefined
    }

    const output: FindByCpfOutputDTO = {
      id: usuario.id,
      nome: usuario.nome,
      cpf: usuario.cpf,
      senha: usuario.senha,
      apartamento: usuario.apartamento
    }

    return output
  }

  public async findById(id: string): Promise<FindByIdOutputDTO | undefined> {
    const usuario = await this.repository.findById(id)

    if (!usuario) {
      return undefined
    }

    const output: FindByIdOutputDTO = {
      id: usuario.id,
      nome: usuario.nome,
      cpf: usuario.cpf,
      senha: usuario.senha,
      apartamento: usuario.apartamento
    }

    return output
  }
}