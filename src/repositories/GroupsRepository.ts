import { Group } from "@prisma/client";
import { ICreateGroup, IGroupsRepository } from "../interfaces/IGroups";
import { prisma } from "../database";

export class GroupsRepository implements IGroupsRepository {
  find(): Promise<Group[]> {
    return prisma.group.findMany();
  }

  findById(id: number): Promise<Group | null> {
    return prisma.group.findUnique({
      where: { id },
      include: {
        leads: true,
      },
    });
  }

  create(attributes: ICreateGroup): Promise<Group> {
    return prisma.group.create({ data: attributes });
  }

  updateById(
    id: number,
    attributes: Partial<ICreateGroup>
  ): Promise<Group | null> {
    return prisma.group.update({
      where: { id },
      data: attributes,
    });
  }

  deleteById(id: number): Promise<Group | null> {
    return prisma.group.delete({ where: { id } });
  }

  addLead(groupId: number, leadId: number): Promise<Group> {
    return prisma.group.update({
      where: { id: groupId },
      data: {
        leads: { connect: { id: leadId } },
      },
      include: { leads: true },
    });
  }

  removeLead(groupId: number, leadId: number): Promise<Group> {
    return prisma.group.update({
      where: { id: groupId },
      data: {
        leads: { disconnect: { id: leadId } },
      },
      include: { leads: true },
    });
  }
}
