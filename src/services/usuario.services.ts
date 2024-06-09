
export type RegistroOutputDTO = {
    id: string;
    nome: string;
    cpf: string;
    senha: string;
    apartamento: string;
};

export type LoginOutputDTO = {
    id: string;
    nome: string;
    cpf: string;
    apartamento: string;
};

export type ListarUsuariosOutputDTO = {
    usuarios: {
        id: string;
        nome: string;
        cpf: string;
        senha: string;
        apartamento: string;
    }[];
}

export type FindByCpfOutputDTO = {
    id: string;
    nome: string;
    cpf: string;
    senha: string;
    apartamento: string;
};

export type FindByIdOutputDTO = {
    id: string;
    nome: string;
    cpf: string;
    senha: string;
    apartamento: string;
};

export interface UsuarioService {
    register(nome: string, cpf: string, senha: string, apartamento: string): Promise<RegistroOutputDTO>;
    login(cpf: string, senha: string): Promise<LoginOutputDTO | undefined>;
    list(): Promise<ListarUsuariosOutputDTO>;
    delete(id: string): Promise<void>;
    findByCpf(cpf: string): Promise<FindByCpfOutputDTO| undefined>;
    findById(id: string): Promise<FindByIdOutputDTO | undefined>;
}
