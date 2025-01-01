// Instacia as classes para as rotas
import { LeadsController } from "./controllers/LeadsController";
import { GroupsController } from "./controllers/GroupsController";
import { CampaignsController } from "./controllers/CampaignsController";
import { CampaignLeadsController } from "./controllers/CampaignLeadsController";
import { GroupLeadsController } from "./controllers/GroupLeadsController";
import { PrismaLeadsRepository } from "./repositories/LeadsRepository";
import { PrismaGroupsRepository } from "./repositories/GroupsRepository";
import { PrismaCampaignsRepository } from "./repositories/CampaignsRepository";
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
