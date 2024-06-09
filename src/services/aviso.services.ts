import { Aviso } from "../entities/aviso.entity";

export type CriarAvisoOutputDTO = {
    id: string;
    tipo: string;
    assunto: string;
    descricao: string;
    data: Date;
};

export type ListarAvisosOutputDTO = {
    avisos: {
        id: string;
        tipo: string;
        assunto: string;
        descricao: string;
        data: Date;
    }[];
}


export type BuscarAvisoOutPutDTO = {
    id: string;
    tipo: string;
    assunto: string;
    descricao: string;
    data: Date;
};


export interface AvisoService {
    criarAviso(tipo: string, assunto: string, descricao: string): Promise<CriarAvisoOutputDTO>;
    listarAvisos(): Promise<ListarAvisosOutputDTO>;
    buscarAviso(id: string): Promise<BuscarAvisoOutPutDTO | undefined>;
    editarAviso(id: string, tipo: string, assunto: string, descricao: string): Promise<void>;
    deletarAviso(id: string): Promise<void>;
}
