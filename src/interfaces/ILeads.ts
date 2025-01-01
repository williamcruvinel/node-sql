import { Lead } from "@prisma/client"; //Pode tbem fazer a interface do "Lead" para não ter que importar
import { LeadCampaignStatus } from "./ICampaigns";

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Converted"
  | "Unresponsive"
  | "Disqualified"
  | "Archived";

export interface ILeadWhereParams {
  name?: {
    contains?: string;
    equals?: string;
    mode?: "default" | "insensitive";
  };
  status?: LeadStatus;
  campaignStatus?: LeadCampaignStatus;
  groupId?: number;
  campaignId?: number;
}

export interface IFindLeadsParams {
  where?: ILeadWhereParams;
  sortBy?: "name" | "status" | "createdAt";
  order?: "asc" | "desc";
  limit?: number;
  offset?: number;
  include?: {
    groups?: boolean;
    campaigns?: boolean;
  };
}

export interface ICreateLead {
  name: string;
  email: string;
  phone: string;
  status?: LeadStatus;
}

export interface ILeadsRepository {
  find: (params: IFindLeadsParams) => Promise<Lead[]>;
  findById: (id: number) => Promise<Lead | null>;
  count: (where: ILeadWhereParams) => Promise<number>;
  create: (attributes: ICreateLead) => Promise<Lead>;
  updateById: (
    id: number,
    attributes: Partial<ICreateLead>
  ) => Promise<Lead | null>;
  deleteById: (id: number) => Promise<Lead | null>;
}
