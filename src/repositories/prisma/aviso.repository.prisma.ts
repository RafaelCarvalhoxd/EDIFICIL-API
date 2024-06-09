import { PrismaClient } from "@prisma/client";
import { AvisoRepository } from "../../repositories/aviso.repository";
import { Aviso } from "../../entities/aviso.entity";

export class AvisoRepositoryPrisma implements AvisoRepository {
  private constructor(private readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new AvisoRepositoryPrisma(prisma);
  }

  public async save(aviso: Aviso): Promise<void> {
    await this.prisma.aviso.create({
      data: {
        tipo: aviso.tipo,
        assunto: aviso.assunto,
        descricao: aviso.descricao,
        data: aviso.data,
      },
    });
  }

  public async list(): Promise<Aviso[]> {
    const avisos = await this.prisma.aviso.findMany();
    return avisos.map((a) => Aviso.with(a.id, a.tipo, a.assunto, a.descricao, a.data));
  }

  public async findById(id: string): Promise<Aviso | undefined> {
    const aviso = await this.prisma.aviso.findUnique({
      where: { id },
    });

    if (!aviso) {
      throw new Error("Aviso não encontrado");
    }

    return Aviso.with(aviso.id, aviso.tipo, aviso.assunto, aviso.descricao, aviso.data);
  }

  public async delete(id: string): Promise<void> {
    const aviso = await this.prisma.aviso.findUnique({
      where: { id },
    });

    if (!aviso) {
      throw new Error("Aviso não encontrado");
    }

    await this.prisma.aviso.delete({
      where: { id },
    });
  }

  public async update(aviso: Aviso): Promise<void> {
    await this.prisma.aviso.update({
      where: { id: aviso.id },
      data: {
        tipo: aviso.tipo,
        assunto: aviso.assunto,
        descricao: aviso.descricao,
        data: aviso.data,
      },
    });
  }
}
