import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';

import { HStack, VStack } from '@/shared/UI-kit/Stack';

import { Text } from '@/shared/UI-kit/Text';
import { StarRate } from '@/shared/UI-kit/StarRate';
import { Modal } from '@/shared/UI-kit/Modal';

import { Drawer } from '@/shared/UI-kit/Drawer';

import { Input } from '@/shared/UI-kit/Input';
import { Button } from '@/shared/UI-kit/Button';
import { Card } from '@/shared/UI-kit/Card';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
    rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        onAccept,
        feedbackTitle,
        hasFeedback,
        onCancel,
        title,
        rate = 0,
    } = props;
    const { t } = useTranslation('ratingCard');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount);
            if (hasFeedback) {
                setIsModalOpen(true);
            } else {
                onAccept?.(selectedStarsCount);
            }
        },
        [hasFeedback, onAccept],
    );

    const acceptHandle = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandle = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <>
            <Text title={feedbackTitle} />
            <Input
                data-testid="RatingCard.Input"
                value={feedback}
                onChange={setFeedback}
                placeholder={t('you feedback')}
            />
        </>
    );

    const content = (
        <>
            <VStack
                align="center"
                gap="8"
                max
            >
                <Text title={starsCount ? t('Thanks for rate') : title} />
                <StarRate
                    selectedStars={starsCount}
                    size={40}
                    onSelect={onSelectStars}
                />
            </VStack>
            <BrowserView>
                <Modal
                    isOpen={isModalOpen}
                    lazy
                >
                    <VStack
                        max
                        gap="32"
                    >
                        {modalContent}
                        <HStack
                            max
                            gap="16"
                            justify="end"
                        >
                            <Button
                                data-testid="RatingCard.Close"
                                onClick={cancelHandle}
                            >
                                {t('close')}
                            </Button>
                            <Button
                                data-testid="RatingCard.Send"
                                onClick={acceptHandle}
                            >
                                {t('send')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer
                    isOpen={isModalOpen}
                    lazy
                    onClose={cancelHandle}
                >
                    <VStack gap="32">
                        {modalContent}
                        <Button
                            fullWidth
                            onClick={acceptHandle}
                            size="l"
                        >
                            {t('send')}
                        </Button>
                    </VStack>
                </Drawer>
            </MobileView>
        </>
    );

    return (
        <Card
            fullWidth
            border="partial"
            padding="24"
        >
            {content}
        </Card>
    );
});
