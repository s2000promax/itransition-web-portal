import { StateSchemaI } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/libs/store';

export const [useWorkItemByIdSelector] = buildSelector(
    (state: StateSchemaI, id: string) => state.workListPage?.entities[id],
);
