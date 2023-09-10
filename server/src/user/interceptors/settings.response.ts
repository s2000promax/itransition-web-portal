import { Settings } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class SettingsResponse implements Settings {
    @Exclude()
    userId: string;

    theme: string;
    language: string;
    isFirstVisit: boolean;

    constructor(settings: Settings) {
        Object.assign(this, settings);
    }
}
