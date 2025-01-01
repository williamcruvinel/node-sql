import { Campaign } from "@prisma/client";

export type LeadCampaignStatus = "New" | "Engaged" | "FollowUp_Scheduled" | "Contacted" | "Qualified" | "Converted" | "Unresponsive" | "Disqualified" | "Re_Engaged" | "Opted_Out"

export interface ICreateCampaign {
  name: string
  description: string
  startDate: Date
  endDate?: Date
}

export interface IAddLeadToCampaign {
  campaignId: number
  leadId: number
  status: LeadCampaignStatus
}

export interface ICampaignsRepository {
  find: () => Promise<Campaign[]>
  findById: (id: number) => Promise<Campaign | null>
  create: (attributes: ICreateCampaign) => Promise<Campaign>
  updateById: (id: number, attributes: Partial<ICreateCampaign>) => Promise<Campaign | null>
  deleteById: (id: number) => Promise<Campaign | null>
  addLead: (attributes: IAddLeadToCampaign) => Promise<void>
  updateLeadStatus: (attributes: IAddLeadToCampaign) => Promise<void>
  removeLead: (campaignId: number, leadId: number) => Promise<void>
}
