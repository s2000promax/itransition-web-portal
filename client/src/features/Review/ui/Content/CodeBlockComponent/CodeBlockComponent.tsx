import { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './CodeBlockComponent.module.scss';
import { Code } from '@/shared/UI-kit/Code';

import { ReviewCodeBlockI } from '@/entities/Review';
import { VStack } from '@/shared/UI-kit/Stack';

interface ReviewCodeBlockComponentProps {
    className?: string;
    block: ReviewCodeBlockI;
}

export const CodeBlockComponent = memo(
    (props: ReviewCodeBlockComponentProps) => {
        const { className, block } = props;

        return (
            <VStack
                max
                className={classNames(cls.ReviewCodeBlockComponent, {}, [
                    className,
                ])}
            >
                <Code text={block.code} />
            </VStack>
        );
    },
);
