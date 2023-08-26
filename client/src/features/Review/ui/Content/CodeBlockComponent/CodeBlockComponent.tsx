import { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './CodeBlockComponent.module.scss';
import { Code } from '@/shared/UI-kit/Code';

import { ReviewCodeBlockI } from '@/entities/Review';

interface ReviewCodeBlockComponentProps {
    className?: string;
    block: ReviewCodeBlockI;
}

export const CodeBlockComponent = memo(
    (props: ReviewCodeBlockComponentProps) => {
        const { className, block } = props;

        return (
            <div
                className={classNames(cls.ReviewCodeBlockComponent, {}, [
                    className,
                ])}
            >
                <Code text={block.code} />
            </div>
        );
    },
);
