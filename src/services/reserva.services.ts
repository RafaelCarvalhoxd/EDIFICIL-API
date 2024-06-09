import { Reserva } from "../entities/reserva.entity";

export type CriarReservaOutputDTO = {
    id: string;
    area: string;
    data: Date;
    usuario: {
        id: string;
        nome: string;
        apartamento: string;
    };
};

export type ListarReservasOutputDTO = {
  reservas: {
    id: string;
    area: string;
    data: Date;
    usuario: {
        id: string;
        nome: string;
        apartamento: string;
    }
  }[]
};

export type BuscarReservaOutputDTO = {
    id: string;
    area: string;
    data: Date;
    usuario: {
        id: string;
        nome: string;
        apartamento: string;
    };
};

export interface ReservaService {
    criarReserva(area: string, data: Date, usuarioId: string): Promise<CriarReservaOutputDTO>;
    listarReservas(): Promise<ListarReservasOutputDTO>;
    cancelarReserva(id: string): Promise<void>;
    editarReserva(id: string, area: string, data: Date): Promise<void>;
    buscarReserva(id: string): Promise<BuscarReservaOutputDTO | undefined>;
}
