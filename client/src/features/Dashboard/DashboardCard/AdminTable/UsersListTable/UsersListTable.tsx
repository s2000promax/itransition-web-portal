import React, { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './UsersListTable.module.scss';
import { UserI } from '@/entities/User';
import LockIcon from '@/shared/assets/ui/icons/lock.svg';
import UnLockIcon from '@/shared/assets/ui/icons/unlock.svg';
import { DateFormatter } from '@/shared/libs/dateFormetter/dateFormatter';
import { Icon } from '@/shared/UI-kit/Icon';
import { HStack } from '@/shared/UI-kit/Stack';
import { useTranslation } from 'react-i18next';

interface UsersListTableProps {
    className?: string;
    data: UserI[];
}

export const UsersListTable = memo((props: UsersListTableProps) => {
    const { className, data } = props;
    const { t } = useTranslation('adminPage');

    if (data?.length) {
        return (
            <table className={classNames(cls.UsersListTable, {}, [className])}>
                <thead>
                    <tr className={cls.row}>
                        <th>
                            <input type="checkbox" />
                        </th>
                        <th>{t('avatar')}</th>
                        <th>{t('fullName')}</th>
                        <th>{t('email')}</th>
                        <th>{t('created_at')}</th>
                        <th>{t('roles')}</th>
                        <th>{t('provider')}</th>
                        <th>{t('status')}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <tr
                            key={user.id}
                            className={cls.row}
                        >
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>
                                <img
                                    src={user.avatar}
                                    alt={`${user.firstName} ${user.lastName}`}
                                    width="50"
                                    height="50"
                                />
                            </td>
                            <td>{`${user.firstName} ${user.lastName}`}</td>
                            <td>{user.email}</td>
                            <td>{DateFormatter(user.createdAt)}</td>
                            <td>{user.roles.join(', ')}</td>
                            <td>{user.provider}</td>
                            <td>
                                {user.isBlocked ? (
                                    <Icon Svg={LockIcon} />
                                ) : (
                                    <Icon Svg={UnLockIcon} />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    } else {
        return null;
    }
});
