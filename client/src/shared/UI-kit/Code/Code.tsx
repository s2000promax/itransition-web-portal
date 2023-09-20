import { memo, useCallback } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import CopyIcon from '@/shared/assets/ui/icons/copy.svg';
import cls from './Code.module.scss';
import { Icon } from '../Icon';

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = memo((props: CodeProps) => {
    const { className, text } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <div className={classNames(cls.Code, {}, [className])}>
            <Icon
                clickable
                onClick={onCopy}
                className={cls.copyBtn}
                Svg={CopyIcon}
            />
            <code>{text}</code>
        </div>
    );
});
