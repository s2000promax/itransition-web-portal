import { Settings, User } from '@prisma/client';
import { RoleRelationI } from '../../../user/types/roleRelationI.interface';

export interface ExtendUserI extends User {
    settings: Settings[];
    roles: RoleRelationI[];
}
