import React, { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './AboutPageContent.module.scss';
import { HStack, VStack } from '@/shared/UI-kit/Stack';
import { Card } from '@/shared/UI-kit/Card';
import { useSelector } from 'react-redux';
import {
    getAboutContentErrorSelector,
    getAboutContentIsLoadingSelector,
    getAboutContentSelector,
} from '@/entities/AboutContent';
import { Skeleton } from '@/shared/UI-kit/Skeleton';
import { Text } from '@/shared/UI-kit/Text';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/shared/UI-kit/Icon';
import LogoIcon from '@/shared/assets/ui/icons/app-image.svg';
import { AppImage } from '@/shared/UI-kit/AppImage';

interface AboutPageContentProps {
    className?: string;
}

export const AboutPageContent = memo((props: AboutPageContentProps) => {
    const { className } = props;
    const { t } = useTranslation('aboutPage');
    const aboutContent = useSelector(getAboutContentSelector);
    const isLoading = useSelector(getAboutContentIsLoadingSelector);
    const error = useSelector(getAboutContentErrorSelector);

    if (isLoading) {
        return (
            <>
                <VStack>
                    <Skeleton
                        width="100%"
                        height={300}
                        border="24px"
                    />
                </VStack>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Text
                    align="center"
                    text={t('error')}
                />
            </>
        );
    }

    return (
        <Card
            padding="24"
            fullWidth
            className={classNames(cls.AboutPageContent, {}, [className])}
        >
            <VStack
                max
                gap="16"
                align="center"
            >
                <HStack
                    max
                    justify="center"
                >
                    <HStack gap="8">
                        <Text title={aboutContent?.header} />
                        <Icon
                            Svg={LogoIcon}
                            width={50}
                            height={25}
                        />
                        <Text title={aboutContent?.appName} />
                    </HStack>
                </HStack>
                <HStack>
                    <Text text={aboutContent?.headerDescription} />
                </HStack>
            </VStack>

            {aboutContent?.blocks.map((block, index) => (
                <VStack
                    key={`about-text-block-${index}`}
                    gap="16"
                    align="center"
                    className={cls.block}
                >
                    <VStack align="center">
                        <Text title={block.blockHeader} />
                    </VStack>
                    <HStack
                        gap="16"
                        justify="center"
                    >
                        {block.blockFirstSrc && (
                            <AppImage
                                src={block.blockFirstSrc}
                                alt={''}
                                className={cls.img}
                            />
                        )}

                        {block.blockSecondSrc && (
                            <AppImage
                                src={block.blockSecondSrc}
                                alt={''}
                                className={cls.img}
                            />
                        )}
                    </HStack>
                    <VStack>
                        <Text text={block.paragraph} />
                    </VStack>
                </VStack>
            ))}
        </Card>
    );
});
