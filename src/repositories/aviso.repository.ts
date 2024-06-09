import { Aviso } from "../entities/aviso.entity";


export interface AvisoRepository {
  save(aviso: Aviso): Promise<void>;
  list(): Promise<Aviso[]>;
  findById(id: string): Promise<Aviso | undefined>;
  delete(id: string): Promise<void>;
  update(aviso: Aviso): Promise<void>;
}
