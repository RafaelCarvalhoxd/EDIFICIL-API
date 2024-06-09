import { Reserva } from "../entities/reserva.entity";


export interface ReservaRepository {
  save(reserva: Reserva): Promise<void>;
  list(): Promise<Reserva[]>;
  findById(id: string): Promise<Reserva | undefined>;
  delete(id: string): Promise<void>;
  update(reserva: Reserva): Promise<void>;
}
