import { FC, lazy } from 'react';
import { RegisterFormProps } from './RegisterForm';

export const RegisterFormAsync = lazy<FC<RegisterFormProps>>(
    () => import('./RegisterForm'),
);
