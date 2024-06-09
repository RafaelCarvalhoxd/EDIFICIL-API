import crypto from "crypto";
import { Usuario } from "./usuario.entity";

export type ReservaType = {
    id: string;
    area: string;
    data: Date;
    usuario: Usuario;
}

export class Reserva {
    private constructor(readonly type: ReservaType) {}

    public static create(area: string, data: Date, usuario: Usuario) {
        return new Reserva({
            id: crypto.randomUUID().toString(),
            area,
            data,
            usuario
        });
    }

    public static with(id: string, area: string, data: Date, usuario: Usuario) {
        return new Reserva({ id, area, data, usuario });
    }

    public get id() {
        return this.type.id;
    }

    public get area() {
        return this.type.area;
    }

    public get data() {
        return this.type.data;
    }

    public get usuario() {
        return this.type.usuario;
    }

    public edit (area: string, data: Date) {
        this.type.area = area;
        this.type.data = data;
    }
}
