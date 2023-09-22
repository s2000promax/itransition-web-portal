import { RolesEnum, Settings as SettingsModel, User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { ExtendUserI } from '../../config/types/user/extendUser.interface';
import { RoleRelationI } from '../types/roleRelationI.interface';

export interface TransformUserI extends Omit<User, 'likesCounter'> {
    settings: SettingsModel[];
    roles: RoleRelationI[];
    likesCounter: string;
}
export class UserResponse
    implements Omit<TransformUserI, 'settings' | 'roles'>
{
    id: string;
    firstName: string;
    lastName: string;
    email: string;

    @Exclude()
    password: string;

    avatar: string;
    isBlocked: boolean;
    roles: RolesEnum[];
    createdAt: Date;
    updatedAt: Date;

    @Exclude()
    provider: string;

    settings: Omit<SettingsModel, 'userId'>;
    likesCounter: string;

    constructor(user: ExtendUserI) {
        Object.assign(this, user);
        this.likesCounter = user.likesCounter.toString();

        if (user.settings && user.settings.length > 0) {
            const [firstSetting] = user.settings;
            const { userId, ...restSettings } = firstSetting;
            this.settings = restSettings;
        } else {
            this.settings = {
                theme: '',
                language: '',
                isFirstVisit: true,
                isReviewsPageWasOpened: false,
            };
        }

        if (user.roles) {
            this.roles = user.roles.map((role) => role.role.name);
        }
    }
}
