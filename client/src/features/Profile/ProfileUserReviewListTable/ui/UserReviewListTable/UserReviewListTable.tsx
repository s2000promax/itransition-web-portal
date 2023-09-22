import React, { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './UserReviewListTable.module.scss';
import { DateFormatter } from '@/shared/libs/dateFormetter/dateFormatter';
import { HStack, VStack } from '@/shared/UI-kit/Stack';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/UI-kit/Text';
import { ReviewI } from '@/entities/Review';
import { AppLink } from '@/shared/UI-kit/AppLink';
import {
    getRouteReviewDetails,
    getRouteWorkDetails,
} from '@/shared/routes/routes.patterns';

interface UserReviewListTableProps {
    className?: string;
    data: ReviewI[];
}

export const UserReviewListTable = memo((props: UserReviewListTableProps) => {
    const { className, data } = props;
    const { t } = useTranslation('profile');

    if (data?.length) {
        return (
            <VStack
                max
                gap="16"
            >
                <HStack
                    max
                    justify="center"
                >
                    <Text title={t('yourReviews')} />
                </HStack>
                <table
                    className={classNames(cls.UserReviewListTable, {}, [
                        className,
                    ])}
                >
                    <thead>
                        <tr className={cls.row}>
                            <th>{t('reviewCover')}</th>
                            <th>{t('reviewTitle')}</th>
                            <th>{t('workTitle')}</th>
                            <th>{t('reviewCategory')}</th>
                            <th>{t('reviewData')}</th>
                            <th>{t('reviewAssessment')}</th>
                            <th>{t('reviewViews')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((review) => (
                            <tr
                                key={review.id}
                                className={cls.row}
                            >
                                <td>
                                    <img
                                        src={review.cover}
                                        alt={`${review.title}`}
                                        width="50"
                                        height="50"
                                    />
                                </td>
                                <td>
                                    <AppLink
                                        to={getRouteReviewDetails(review.id)}
                                    >
                                        {`${review.title}`}
                                    </AppLink>
                                </td>
                                <td>
                                    <AppLink
                                        to={getRouteWorkDetails(review.workId)}
                                    >
                                        {review.workTitle}
                                    </AppLink>
                                </td>
                                <td>{review.type}</td>
                                <td>{DateFormatter(review.createdAt)}</td>
                                <td>{review.ownerRating}</td>
                                <td>{review.viewCounter}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </VStack>
        );
    } else {
        return (
            <HStack
                max
                justify="center"
            >
                <Text text={'You do not have Reviews yet'} />
            </HStack>
        );
    }
});
