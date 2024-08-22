import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GoService {
    private tempData: any;
    constructor(private readonly prismaService: PrismaService) {}

    saveData(data: any) {
        this.tempData = data;
    }

    getData() {
        return this.tempData;
    }
}
