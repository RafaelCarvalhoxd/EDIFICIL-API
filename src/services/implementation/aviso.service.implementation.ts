import { Aviso } from "../../entities/aviso.entity";
import { AvisoRepository } from "../../repositories/aviso.repository";
import { AvisoService, BuscarAvisoOutPutDTO, CriarAvisoOutputDTO, ListarAvisosOutputDTO } from "../aviso.services";

export class AvisoServiceImplementation implements AvisoService {
  private constructor(readonly repository: AvisoRepository) {}

  public static build(repository: AvisoRepository) {
    return new AvisoServiceImplementation(repository)
  }

  public async criarAviso(tipo: string, assunto: string, descricao: string): Promise<CriarAvisoOutputDTO> {
    const aviso = Aviso.create(tipo, assunto, descricao)

    await this.repository.save(aviso)

    const output: CriarAvisoOutputDTO = {
      id: aviso.id,
      tipo: aviso.tipo,
      assunto: aviso.assunto,
      descricao: aviso.descricao,
      data: aviso.data
    }

    return output
  }
  public async listarAvisos(): Promise<ListarAvisosOutputDTO> {
    const avisos = await this.repository.list()

    const output: ListarAvisosOutputDTO = {
      avisos: avisos.map(a => ({
        id: a.id,
        tipo: a.tipo,
        assunto: a.assunto,
        descricao: a.descricao,
        data: a.data
      }))
  }
  return output
}
public async buscarAviso(id: string): Promise<BuscarAvisoOutPutDTO | undefined> {
    const aviso = await this.repository.findById(id)

    if (!aviso) {
      return undefined
    }

    const output: BuscarAvisoOutPutDTO = {
      id: aviso.id,
      tipo: aviso.tipo,
      assunto: aviso.assunto,
      descricao: aviso.descricao,
      data: aviso.data
    }

    return output
  }
  public async editarAviso(id: string, tipo: string, assunto: string, descricao: string): Promise<void> {
    const avisoEdit = await this.repository.findById(id);

    if (!avisoEdit) {
        throw new Error('Product not found!');
    }

    avisoEdit.edit(tipo, assunto, descricao)

    await this.repository.update(avisoEdit)

    
  }
  public async deletarAviso(id: string): Promise<void> {
    const aviso = await this.repository.findById(id);

    if (!aviso) {
        throw new Error('Product not found!');
    }

    await this.repository.delete(id);
  }

}
