import { StateSchemaI } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/libs/store';

export const [useReviewItemByIdSelector] = buildSelector(
    (state: StateSchemaI, id: string) => state.reviewListPage?.entities[id],
);
