import { Group } from "@prisma/client";

export interface ICreateGroup {
  name: string
  description: string
}

export interface IGroupsRepository {
  find: () => Promise<Group[]>
  findById: (id: number) => Promise<Group | null>
  create: (attributes: ICreateGroup) => Promise<Group>
  updateById: (id: number, attributes: Partial<ICreateGroup>) => Promise<Group | null>
  deleteById: (id: number) => Promise<Group | null>
  addLead: (groupId: number, leadId: number) => Promise<Group>
  removeLead: (groupId: number, leadId: number) => Promise<Group>
}
