import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    ForbiddenException,
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
import { UserResponse } from './interceptors';
import { ApiTags } from '@nestjs/swagger';
import { JwtPayload } from '../config/types/auth/jwtPayload';
import { RolesEnum, Settings, User } from '@prisma/client';
import { Response } from 'express';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('me')
    async me(@CurrentUser() user: JwtPayload) {
        try {
            const foundedUser = await this.userService.findById(user.id);

            return new UserResponse(foundedUser);
        } catch (e) {
            throw new BadRequestException('Failed to get user');
        }
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    async findOneUser(@Param('id') userId: string) {
        try {
            const foundedUser = await this.userService.findById(userId);

            return new UserResponse(foundedUser);
        } catch (e) {
            throw new BadRequestException('Failed to get user');
        }
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Put()
    async updateUser(@Body() body: User) {
        try {
            const updatedUser = await this.userService.save(body);

            const foundedUser = await this.userService.findById(updatedUser.id);

            return new UserResponse(foundedUser);
        } catch (e) {
            throw new BadRequestException('Failed to get user');
        }
    }

    @Delete(':id')
    async deleteUser(
        @Param('id', ParseUUIDPipe) userId: string,
        @CurrentUser() user: JwtPayload,
        @Res() res: Response,
    ) {
        const userRoles = await this.userService.getUserRoles(user.id);

        if (
            !userRoles.includes(RolesEnum.ADMIN) &&
            !userRoles.includes(RolesEnum.SA)
        ) {
            throw new ForbiddenException('No permissions to delete');
        }

        if (userId === user.id) {
            throw new ForbiddenException('Cannot delete yourself');
        }

        try {
            await this.userService.delete(userId);

            res.status(HttpStatus.OK).send();
        } catch (e) {
            throw new BadRequestException('Failed to delete user');
        }
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
            throw new BadRequestException('Failed to update user settings');
        }
    }

    @Patch('addRole')
    async addNewRole(
        @Body() body: { userId: string; role: RolesEnum },
        @Res() res: Response,
    ) {
        if (
            await this.userService.isRoleAlreadyIncluded(body.userId, body.role)
        ) {
            throw new BadRequestException('Role already included');
        }

        try {
            await this.userService.addRoleToUser(body.userId, body.role);

            res.status(HttpStatus.OK).send();
        } catch (e) {
            throw new BadRequestException('Failed to add user role');
        }
    }

    @Patch('removeRole')
    async removeRole(
        @Body() body: { userId: string; role: RolesEnum },
        @Res() res: Response,
    ) {
        if (
            !(await this.userService.isRoleAlreadyIncluded(
                body.userId,
                body.role,
            ))
        ) {
            throw new BadRequestException(
                'The user does not have the requested role',
            );
        }

        try {
            await this.userService.removeRoleFromUser(body.userId, body.role);

            res.status(HttpStatus.OK).send();
        } catch (e) {
            throw new BadRequestException('Failed to remove user role');
        }
    }
}
