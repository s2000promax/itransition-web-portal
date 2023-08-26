import cls from '../Review.module.scss';
import { ReviewBlockT, ReviewBlockTypeEnums } from '@/entities/Review';
import { CodeBlockComponent } from '@/features/Review/ui/Content/CodeBlockComponent/CodeBlockComponent';
import { ImageBlockComponent } from '@/features/Review/ui/Content/ImageBlockComponent/ImageBlockComponent';
import { TextBlockComponent } from '@/features/Review/ui/Content/TextBlockComponent/TextBlockComponent';

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
