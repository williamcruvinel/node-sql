import { Campaign } from "@prisma/client";
import {
  IAddLeadToCampaign,
  ICampaignsRepository,
  ICreateCampaign,
} from "../interfaces/ICampaigns";
import { prisma } from "../database";

export class PrismaCampaignsRepository implements ICampaignsRepository {
  find(): Promise<Campaign[]> {
    return prisma.campaign.findMany();
  }

  findById(id: number): Promise<Campaign | null> {
    return prisma.campaign.findUnique({
      where: { id },
      include: {
        leads: {
          include: {
            lead: true,
          },
        },
      },
    });
  }

  create(attributes: ICreateCampaign): Promise<Campaign> {
    return prisma.campaign.create({ data: attributes });
  }

  async updateById(
    id: number,
    attributes: Partial<ICreateCampaign>
  ): Promise<Campaign | null> {
    const campaignExists = await prisma.campaign.findUnique({ where: { id } });
    if (!campaignExists) return null;
    return prisma.campaign.update({
      where: { id },
      data: attributes,
    });
  }

  async deleteById(id: number): Promise<Campaign | null> {
    const campaignExists = await prisma.campaign.findUnique({ where: { id } });
    if (!campaignExists) return null;
    return prisma.campaign.delete({ where: { id } });
  }

  async addLead(attributes: IAddLeadToCampaign): Promise<void> {
    await prisma.leadCampaign.create({ data: attributes });
  }

  async updateLeadStatus(
    attributes: IAddLeadToCampaign
  ): Promise<void> {
    await prisma.leadCampaign.update({
      data: { status: attributes.status },
      where: {
        leadId_campaignId: {
          campaignId: attributes.campaignId,
          leadId: attributes.leadId,
        },
      },
    });
  }

  async removeLead(campaignId: number, leadId: number): Promise<void> {
    await prisma.leadCampaign.delete({
      where: {
        leadId_campaignId: { campaignId, leadId },
      },
    });
  }
}
