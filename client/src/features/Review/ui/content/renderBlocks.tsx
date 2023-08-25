import cls from '../review.module.scss';
import { ReviewBlockT, ReviewBlockTypeEnums } from '@/entities/Review';
import { CodeBlockComponent } from '@/features/Review/ui/content/codeBlockComponent/codeBlockComponent';
import { ImageBlockComponent } from '@/features/Review/ui/content/imageBlockComponent/imageBlockComponent';
import { TextBlockComponent } from '@/features/Review/ui/content/textBlockComponent/textBlockComponent';

export const renderBlocks = (block: ReviewBlockT) => {
    switch (block.type) {
        case ReviewBlockTypeEnums.CODE:
            return (
                <CodeBlockComponent
                    key={block.id}
                    block={block}
                    className={cls.block}
                />
            );
        case ReviewBlockTypeEnums.IMAGE:
            return (
                <ImageBlockComponent
                    key={block.id}
                    block={block}
                    className={cls.block}
                />
            );
        case ReviewBlockTypeEnums.TEXT:
            return (
                <TextBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            );
        default:
            return null;
    }
};
