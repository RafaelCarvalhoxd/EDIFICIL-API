import { Usuario } from "../entities/usuario.entity";


export interface UsuarioRepository {
  save(usuario: Usuario): Promise<void>;
  findById(id: string): Promise<Usuario | undefined>;
  findByCpf(cpf: string): Promise<Usuario | undefined>;
  list(): Promise<Usuario[]>;
  delete(id: string): Promise<void>;
}
