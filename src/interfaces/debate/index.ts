import { OrganizationInterface } from 'interfaces/organization';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface DebateInterface {
  id?: string;
  topic: string;
  organization_id: string;
  debater_id: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  user?: UserInterface;
  _count?: {};
}

export interface DebateGetQueryInterface extends GetQueryInterface {
  id?: string;
  topic?: string;
  organization_id?: string;
  debater_id?: string;
}
