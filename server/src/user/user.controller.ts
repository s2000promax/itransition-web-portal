import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Patch,
    Put,
    Res,
    UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from '../libs/decorators';
import { SettingsResponse, UserResponse } from './interceptors';
import { ApiTags } from '@nestjs/swagger';
import { JwtPayload } from '../config/types/auth/jwtPayload';
import { Settings, User } from '@prisma/client';
import { Response } from 'express';

interface BodyRequestInterface {
    ids: string[];
    status: boolean;
    delete: boolean;
}

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async getAllUsers() {
        return await this.userService.findAll();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('me')
    async me(@CurrentUser() user: UserResponse) {
        const foundedUser = await this.userService.findById(user.id);
        const foundedUserRoles = await this.userService.getUserRoles(user.id);
        const foundedSettings = await this.userService.findSettingsById(
            user.id,
        );

        const response = new UserResponse(foundedUser);
        Object.assign(
            response,
            {
                settings: new SettingsResponse(foundedSettings),
            },
            {
                roles: foundedUserRoles,
            },
        );

        return response;
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    async findOneUser(@Param('id') id: string) {
        const foundedUser = await this.userService.findById(id);

        return new UserResponse(foundedUser);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Put()
    async updateUser(@Body() body: Partial<User>) {
        const user = await this.userService.save(body);
        return new UserResponse(user);
    }

    @Delete(':id')
    async deleteUser(
        @Param('id', ParseUUIDPipe) id: string,
        @CurrentUser() user: JwtPayload,
    ) {
        return this.userService.delete(id, user);
    }

    @Patch(':id')
    async setUserSettings(
        @Param('id') userId: string,
        @Body() body: Settings,
        @Res() res: Response,
    ) {
        try {
            await this.userService.updateUserSettings(userId, body);
            res.status(HttpStatus.OK).send();
        } catch (e) {
            throw new BadRequestException(`Failed to update user settings`);
        }
    }
}
