import crypto from "crypto";

export type AvisoType = {
    id: string;
    tipo: string;
    assunto: string;
    descricao: string;
    data: Date;
}

export class Aviso {
    private constructor(readonly type: AvisoType) {}

    public static create(tipo: string, assunto: string, descricao: string) {
        return new Aviso({
            id: crypto.randomUUID().toString(),
            tipo,
            assunto,
            descricao,
            data: new Date()
        });
    }

    public static with(id: string, tipo: string, assunto: string, descricao: string, data: Date) {
        return new Aviso({ id, tipo, assunto, descricao, data });
    }

    public get id() {
        return this.type.id;
    }

    public get tipo() {
        return this.type.tipo;
    }

    public get assunto() {
        return this.type.assunto;
    }

    public get descricao() {
        return this.type.descricao;
    }

    public get data() {
        return this.type.data;
    }

    public edit (tipo: string, assunto: string, descricao: string) {
        this.type.tipo = tipo;
        this.type.assunto = assunto;
        this.type.descricao = descricao;
    }
}
