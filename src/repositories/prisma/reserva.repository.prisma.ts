import { PrismaClient } from "@prisma/client";
import { ReservaRepository } from "../../repositories/reserva.repository";
import { Reserva } from "../../entities/reserva.entity";
import { Usuario } from "../../entities/usuario.entity";

export class ReservaRepositoryPrisma implements ReservaRepository {
  private constructor(private readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new ReservaRepositoryPrisma(prisma);
  }

  public async save(reserva: Reserva): Promise<void> {
    await this.prisma.reserva.create({
      data: {
        area: reserva.area,
        data: reserva.data,
        usuario: {
          connect: {
            id: reserva.usuario.id,
          },
        },
      },
    });
  }

  public async list(): Promise<Reserva[]> {
    const reservas = await this.prisma.reserva.findMany({
      include: { usuario: true },
    });

    return reservas.map((r) =>
      Reserva.with(r.id, r.area, r.data, Usuario.with(r.usuario.id, r.usuario.nome, r.usuario.cpf, r.usuario.senha, r.usuario.apartamento))
    );
  }

  public async findById(id: string): Promise<Reserva | undefined> {
    const reserva = await this.prisma.reserva.findUnique({
      where: { id },
      include: { usuario: true },
    });

    if (!reserva) {
      throw new Error("Reserva não encontrada");
    }

    return Reserva.with(reserva.id, reserva.area, reserva.data, Usuario.with(reserva.usuario.id, reserva.usuario.nome, reserva.usuario.cpf, reserva.usuario.senha, reserva.usuario.apartamento));
  }

  public async delete(id: string): Promise<void> {
    const reserva = await this.prisma.reserva.findUnique({
      where: { id },
    });

    if (!reserva) {
      throw new Error("Reserva não encontrada");
    }

    await this.prisma.reserva.delete({
      where: { id },
    });
  }

  public async update(reserva: Reserva): Promise<void> {
    await this.prisma.reserva.update({
      where: { id: reserva.id },
      data: {
        area: reserva.area,
        data: reserva.data,
        usuario: {
          connect: {
            id: reserva.usuario.id,
          },
        },
      },
    });
  }
}
