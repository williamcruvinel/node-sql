import { HttpError } from "../errors/HttpError";
import {
  ICreateLead,
  ILeadsRepository,
  LeadStatus,
  ILeadWhereParams,
} from "../interfaces/ILeads";

interface IGetLeadsWithPaginationParams {
  page?: number;
  pageSize?: number;
  name?:  string,
  status?: LeadStatus;
  sortBy?: "name" | "status" | "createdAt";
  order?: "asc" | "desc";
}

export class LeadsService {
  constructor(private readonly leadsRepository: ILeadsRepository) {}

  async getAllLeadsPaginated(params: IGetLeadsWithPaginationParams) {
    const { name, status, page = 1, pageSize = 10, sortBy, order } = params;

    const limit = pageSize;
    const offset = (page - 1) * limit;

    const where: ILeadWhereParams = {};

    if (name) where.name = { contains: name, mode: "insensitive" };
    if (status) where.status = status;

    const leads = await this.leadsRepository.find({
      where,
      sortBy,
      order,
      limit,
      offset,
    });
    const total = await this.leadsRepository.count(where);

    return {
      leads,
      meta: {
        page: Number(page),
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getLeadById(id: number) {
    const lead = await this.leadsRepository.findById(id);
    if (!lead) throw new HttpError(404, "lead não encontrado");
    return lead;
  }

  async createLead(params: ICreateLead) {
    if (!params.status) params.status = "New";
    const newLead = await this.leadsRepository.create(params);
    return newLead;
  }

  async updateLead(leadId: number, params: Partial<ICreateLead>) {
    const lead = await this.leadsRepository.findById(leadId);
    if (!lead) throw new HttpError(404, "lead não encontrado");

    if (
      lead.status === "New" &&
      params.status !== undefined &&
      params.status !== "Contacted"
    ) {
      throw new HttpError(
        400,
        "um novo lead deve ser contatado antes de ter seu status atualizado para outros valores"
      );
    }

    if (params.status && params.status === "Archived") {
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - lead.updatedAt.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays < 180)
        throw new HttpError(
          400,
          "um lead só pode ser arquivado após 6 meses de inatividade"
        );
    }

    const updatedLead = await this.leadsRepository.updateById(leadId, params);

    return updatedLead;
  }

  async deleteLead(leadId: number) {
    const leadExists = await this.leadsRepository.findById(leadId);
    if (!leadExists) throw new HttpError(404, "lead não encontrado");
    const deletedLead = await this.leadsRepository.deleteById(leadId);
    return deletedLead;
  }
}
