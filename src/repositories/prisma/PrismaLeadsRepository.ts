import { Lead, Prisma } from "@prisma/client";
import { CreateLeadAttributes, FindLeadsParams, LeadsRepository, LeadWhereParams } from "../LeadsRepository";
import { prisma } from "../../database";

export class PrismaLeadsRepository implements LeadsRepository {
  async find(params: FindLeadsParams): Promise<Lead[]> {
    let where: Prisma.LeadWhereInput = {
      name: {
        contains: params.where?.name?.contains,
        equals: params.where?.name?.equals,
        mode: params.where?.name?.mode
      },
      status: params.where?.status,
    }

    if (params.where?.groupId) {
      where.groups = { some: { id: params.where.groupId } }
    }

    if (params.where?.campaignId) {
      where.campaigns = { some: { campaignId: params.where.campaignId } }
    }

    return prisma.lead.findMany({
      where,
      orderBy: { [params.sortBy ?? "name"]: params.order },
      skip: params.offset,
      take: params.limit,
      include: {
        groups: params.include?.groups,
        campaigns: params.include?.campaigns
      }
    })
  }


  async findById(id: number): Promise<Lead | null> {
    return prisma.lead.findUnique({
      where: { id },
      include: {
        campaigns: true,
        groups: true
      }
    })
  }

  async count(where: LeadWhereParams): Promise<number> {
    let prismaWhere: Prisma.LeadWhereInput = {
      name: {
        contains: where?.name?.contains,
        equals: where?.name?.equals,
        mode: where?.name?.mode
      },
      status: where?.status,
    }

    if (where?.groupId) {
      prismaWhere.groups = { some: { id: where.groupId } }
    }

    if (where?.campaignId) {
      prismaWhere.campaigns = { some: { campaignId: where.campaignId } }
    }

    return prisma.lead.count({ where: prismaWhere })
  }

  async create(attributes: CreateLeadAttributes): Promise<Lead> {
    return prisma.lead.create({ data: attributes })
  }

  async updateById(id: number, attributes: Partial<CreateLeadAttributes>): Promise<Lead> {
    return prisma.lead.update({
      where: { id },
      data: attributes
    })
  }

  async deleteById(id: number): Promise<Lead> {
    return prisma.lead.delete({ where: { id }})
  }
}
