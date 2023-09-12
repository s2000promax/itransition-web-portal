import { Settings, User } from '@prisma/client';
import { RoleRelationI } from './roleRelationI.interface';

export interface ExtendUserI extends User {
    settings: Settings[];
    roles: RoleRelationI[];
}
