import { Handler } from "express";
import { GetLeadsRequestSchema } from "../schemas/LeadsRequestSchema";
import { AddLeadRequestSchema } from "../schemas/GroupsRequestSchema";
import { IGroupsRepository } from "../interfaces/IGroups";
import { ILeadsRepository, ILeadWhereParams } from "../interfaces/ILeads";

export class GroupLeadsController {
  constructor(
    private readonly groupsRepository: IGroupsRepository,
    private readonly leadsRepository: ILeadsRepository
  ) {}

  getLeads: Handler = async (req, res, next) => {
    try {
      const groupId = Number(req.params.groupId);
      const query = GetLeadsRequestSchema.parse(req.query);
      const {
        page = "1",
        pageSize = "10",
        name,
        status,
        sortBy = "name",
        order = "asc",
      } = query;

      const limit = Number(pageSize);
      const offset = (Number(page) - 1) * limit;

      const where: ILeadWhereParams = { groupId };

      if (name) where.name = { contains: name, mode: "insensitive" };
      if (status) where.status = status;

      const leads = await this.leadsRepository.find({
        where,
        sortBy,
        order,
        limit,
        offset,
        include: { groups: true },
      });

      const total = await this.leadsRepository.count(where);

      res.json({
        leads,
        meta: {
          page: Number(page),
          pageSize: limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  };

  addLead: Handler = async (req, res, next) => {
    try {
      const groupId = Number(req.params.groupId);
      const { leadId } = AddLeadRequestSchema.parse(req.body);
      const updatedGroup = await this.groupsRepository.addLead(groupId, leadId);
      res.status(201).json(updatedGroup);
    } catch (error) {
      next(error);
    }
  };

  removeLead: Handler = async (req, res, next) => {
    try {
      const groupId = Number(req.params.groupId);
      const leadId = Number(req.params.leadId);
      const updatedGroup = await this.groupsRepository.removeLead(
        groupId,
        leadId
      );
      res.json(updatedGroup);
    } catch (error) {
      next(error);
    }
  };
}
