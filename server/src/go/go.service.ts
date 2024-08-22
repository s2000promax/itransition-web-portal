import { Injectable } from '@nestjs/common';

@Injectable()
export class GoService {
    private tempData: any;
    constructor() {}

    saveData(data: any) {
        this.tempData = data;
    }

    getData() {
        return this.tempData;
    }
}
