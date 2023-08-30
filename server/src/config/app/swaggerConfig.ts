import { DocumentBuilder } from '@nestjs/swagger';

export default () =>
    new DocumentBuilder()
        .setTitle('itransition-webportal')
        .setDescription('The itransition-webportal API description')
        .setVersion('0.1.0')
        .build();
