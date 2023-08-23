import cls from './popup.module.scss';

export type DropdownDirection =
    | 'top left'
    | 'top right'
    | 'bottom left'
    | 'bottom right';

export const mapDirectionClass: Record<DropdownDirection, string> = {
    'bottom left': cls.optionsBottomLeft,
    'bottom right': cls.optionsBottomRight,
    'top right': cls.optionsTopRight,
    'top left': cls.optionsTopLeft,
};
