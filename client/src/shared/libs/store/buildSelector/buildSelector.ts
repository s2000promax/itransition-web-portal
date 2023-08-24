import { useSelector } from 'react-redux';
import { StateSchemaI } from '@/app/providers/StoreProvider';

type Selector<T, Args extends any[]> = (
    state: StateSchemaI,
    ...args: Args
) => T;
type Hook<T, Args extends any[]> = (...args: Args) => T;
type Result<T, Args extends any[]> = [Hook<T, Args>, Selector<T, Args>];

export function buildSelector<T, Args extends any[]>(
    selector: Selector<T, Args>,
): Result<T, Args> {
    const useSelectorHook: Hook<T, Args> = (...args: Args) => {
        return useSelector((state: StateSchemaI) => selector(state, ...args));
    };

    return [useSelectorHook, selector];
}
