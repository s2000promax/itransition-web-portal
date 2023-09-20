import { ReviewBlockT, ReviewBlockTypeEnums } from '@/entities/Review';
import { EditableCodeBlock } from './EditableCodeBlock/EditableCodeBlock';
import { EditableImageBlock } from './EditableImageBlock/EditableImageBlock';
import { EditableTextBlock } from './EditableTextBlock/EditableTextBlock';

export const renderEditableBlocks = (block: ReviewBlockT) => {
    switch (block.type) {
        case ReviewBlockTypeEnums.CODE:
            return (
                <EditableCodeBlock
                    key={block.id}
                    block={block}
                />
            );
        case ReviewBlockTypeEnums.IMAGE:
            return (
                <EditableImageBlock
                    key={block.id}
                    block={block}
                />
            );
        case ReviewBlockTypeEnums.TEXT:
            return (
                <EditableTextBlock
                    key={block.id}
                    block={block}
                />
            );
        default:
            return null;
    }
};
