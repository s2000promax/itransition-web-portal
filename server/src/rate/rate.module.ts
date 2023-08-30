import { Module } from '@nestjs/common';
import { RateService } from './rate.service';
import { RateController } from './rate.controller';

@Module({
    controllers: [RateController],
    providers: [RateService],
    exports: [RateService],
})
export class RateModule {}
