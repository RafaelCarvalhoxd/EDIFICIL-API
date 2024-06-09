import { Reserva } from "../../entities/reserva.entity";
import { ReservaRepository } from "../../repositories/reserva.repository";
import { UsuarioRepository } from "../../repositories/user.repository";
import { 
    ReservaService, 
    CriarReservaOutputDTO, 
    ListarReservasOutputDTO, 
    BuscarReservaOutputDTO 
} from "../../services/reserva.services"

export class ReservaServiceImplementation implements ReservaService {
    private constructor(
        private readonly reservaRepository: ReservaRepository,
        private readonly usuarioRepository: UsuarioRepository
    ) {}

    public static build(reservaRepository: ReservaRepository, usuarioRepository: UsuarioRepository) {
        return new ReservaServiceImplementation(reservaRepository, usuarioRepository);
    }

    public async criarReserva(area: string, data: Date, usuarioId: string): Promise<CriarReservaOutputDTO> {
        const usuario = await this.usuarioRepository.findById(usuarioId);
        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }
        const reserva = Reserva.create(area, data, usuario);
        await this.reservaRepository.save(reserva);
        return {
            id: reserva.id,
            area: reserva.area,
            data: reserva.data,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                apartamento: usuario.apartamento
            }
        };
    }

    public async listarReservas(): Promise<ListarReservasOutputDTO> {
        const reservas = await this.reservaRepository.list();
        return {
            reservas: reservas.map(r => ({
                id: r.id,
                area: r.area,
                data: r.data,
                usuario: {
                    id: r.usuario.id,
                    nome: r.usuario.nome,
                    apartamento: r.usuario.apartamento
                }
            }))
        };
    }

    public async buscarReserva(id: string): Promise<BuscarReservaOutputDTO | undefined> {
        const reserva = await this.reservaRepository.findById(id);
        if (!reserva) return undefined;
        return {
            id: reserva.id,
            area: reserva.area,
            data: reserva.data,
            usuario: {
                id: reserva.usuario.id,
                nome: reserva.usuario.nome,
                apartamento: reserva.usuario.apartamento
            }
        };
    }

    public async editarReserva(id: string, area: string, data: Date): Promise<void> {
        const reserva = await this.reservaRepository.findById(id);
        if (!reserva) throw new Error("Reserva não encontrada");
        reserva.edit(area, data);
        await this.reservaRepository.update(reserva);
    }

    public async cancelarReserva(id: string): Promise<void> {
      const reserva = await this.reservaRepository.findById(id);
      if (!reserva) throw new Error("Reserva não encontrada");  
      
      await this.reservaRepository.delete(id);
    }
}
