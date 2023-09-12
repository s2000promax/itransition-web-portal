import { RolesEnum, Settings as SettingsModel, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

interface RoleRelation {
    roleId: string;
    userId: string;
    role: {
        id: string;
        name: RolesEnum;
    };
}

export interface TransformUserI extends User {
    settings: SettingsModel[];
    roles: RoleRelation[];
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

    constructor(user: TransformUserI) {
        Object.assign(this, user);

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
