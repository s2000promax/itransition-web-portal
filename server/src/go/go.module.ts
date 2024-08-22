import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GoController } from './go.controller';
import { GoService } from './go.service';

@Module({
    imports: [HttpModule],
    controllers: [GoController],
    providers: [GoService],
})
export class GoModule {}
