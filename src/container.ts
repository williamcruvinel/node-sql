import { LeadsController } from "./controllers/LeadsController";
import { GroupsController } from "./controllers/GroupsController";
import { CampaignsController } from "./controllers/CampaignsController";
import { CampaignLeadsController } from "./controllers/CampaignLeadsController";
import { GroupLeadsController } from "./controllers/GroupLeadsController";
import { PrismaLeadsRepository } from "./repositories/PrismaLeadsRepository";
import { PrismaGroupsRepository } from "./repositories/PrismaGroupsRepository";
import { PrismaCampaignsRepository } from "./repositories/PrismaCampaignsRepository";
import { LeadsService } from "./services/LeadsServices";

export const leadsRepository = new PrismaLeadsRepository();
export const groupsRepository = new PrismaGroupsRepository();
export const campaignsRepository = new PrismaCampaignsRepository();

export const leadsService = new LeadsService(leadsRepository);

export const leadsController = new LeadsController(leadsService);
export const groupsController = new GroupsController(groupsRepository);
export const groupLeadsController = new GroupLeadsController(
  groupsRepository,
  leadsRepository
);
export const campaignsController = new CampaignsController(campaignsRepository);
export const campaignLeadsController = new CampaignLeadsController(
  campaignsRepository,
  leadsRepository
);
