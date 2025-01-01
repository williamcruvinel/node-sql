// Instacia as classes para as rotas
import { LeadsController } from "./controllers/LeadsController";
import { GroupsController } from "./controllers/GroupsController";
import { CampaignsController } from "./controllers/CampaignsController";
import { CampaignLeadsController } from "./controllers/CampaignLeadsController";
import { GroupLeadsController } from "./controllers/GroupLeadsController";
import { LeadsRepository } from "./repositories/LeadsRepository";
import { GroupsRepository } from "./repositories/GroupsRepository";
import { CampaignsRepository } from "./repositories/CampaignsRepository";
import { LeadsService } from "./services/LeadsServices";

export const leadsRepository = new LeadsRepository();
export const groupsRepository = new GroupsRepository();
export const campaignsRepository = new CampaignsRepository();

export const leadsService = new LeadsService(leadsRepository);

export const leadsController = new LeadsController(leadsService);
export const groupsController = new GroupsController(groupsRepository);
export const groupLeadsController = new GroupLeadsController(groupsRepository, leadsRepository);
export const campaignsController = new CampaignsController(campaignsRepository);
export const campaignLeadsController = new CampaignLeadsController(campaignsRepository, leadsRepository);
