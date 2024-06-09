
export type UsuarioType = {
    id: string;
    nome: string;
    cpf: string;
    senha: string;
    apartamento: string;
}

export class Usuario {
    private constructor(readonly type: UsuarioType) {}

    public static create(nome: string, cpf: string, senha: string, apartamento: string) {
        return new Usuario({
            id: crypto.randomUUID().toString(),
            nome,
            cpf,
            senha,
            apartamento
        });
    }

    public static with(id: string, nome: string, cpf: string, senha: string, apartamento: string) {
        return new Usuario({ id, nome, cpf, senha, apartamento });
    }

    public get id() {
        return this.type.id;
    }

    public get nome() {
        return this.type.nome;
    }

    public get cpf() {
        return this.type.cpf;
    }

    public get senha() {
        return this.type.senha;
    }

    public get apartamento() {
        return this.type.apartamento;
    }
}
