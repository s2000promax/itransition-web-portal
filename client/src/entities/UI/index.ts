export type { UISchemaI, ScrollSchemaT } from './model/types/ui.interface';

export { getUIScrollByPath } from './model/selectors/ui.selector';
export { uiReducer, uiActions } from './model/slices/ui.slice';

export type { SidebarItemI } from './Sidebar/model/types/SidebarItem.interface';
export { useSidebarItems } from './Sidebar/model/selectors/getSidebarItems';
