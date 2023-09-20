import { ChangeEvent, useState } from 'react';
import { Combobox as HCombobox } from '@headlessui/react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './Combobox.module.scss';
import popupCls from '../../styles/popup.module.scss';
import { HStack } from '../../../Stack';
import { DropdownDirection } from '@/shared/UI-kit/Popups/styles/consts';

interface ComboboxProps<T extends string> {
    items?: T[];
    className?: string;
    value?: T;
    onAddValue: (value: string) => void;
    onChange?: (value: T) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
}

export function Combobox<T extends string>(props: ComboboxProps<T>) {
    const { className, items = [], readonly, onAddValue } = props;

    const [inputValue, setInputValue] = useState('');
    const [query, setQuery] = useState('');

    const filteredItems =
        query === ''
            ? items
            : items.filter((item) => {
                  return item.toLowerCase().includes(query.toLowerCase());
              });

    const handleAddFounded = (value: T) => {
        handleAddValue(value);
        setInputValue(() => '');
    };

    const handleAddValue = (value: T) => {
        onAddValue(value);
    };

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        setInputValue(event.target.value as T);
    };

    return (
        <HStack gap="4">
            <HCombobox
                disabled={readonly}
                as="div"
                className={classNames(cls.ComboboxWrapper, {}, [
                    className,
                    popupCls.popup,
                ])}
                value={query}
                onChange={handleAddFounded}
                onKeyUp={(event) => {
                    if (event.code === 'Enter' || event.code == 'NumpadEnter') {
                        handleAddValue(inputValue as T);
                        setInputValue('');
                    }
                }}
            >
                <HCombobox.Input
                    value={inputValue}
                    onChange={handleInput}
                    className={cls.trigger}
                />
                <HCombobox.Options className={cls.options}>
                    {filteredItems.map((item) => (
                        <HCombobox.Option
                            key={item}
                            value={item}
                            className={cls.item}
                        >
                            {item}
                        </HCombobox.Option>
                    ))}
                </HCombobox.Options>
            </HCombobox>
        </HStack>
    );
}
