import {
    BadRequestException,
    ClassSerializerInterceptor,
    Controller,
    Get,
    UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from '../libs/decorators';
import { ApiTags } from '@nestjs/swagger';
import { JwtPayload } from '../config/types/auth/jwtPayload';
import { RolesEnum } from '@prisma/client';
import { UserService } from '../user/user.service';
import { UserResponse } from './transformers';
import { ExtendUserI } from '../config/types/user/extendUser.interface';
import { classToPlain } from 'class-transformer';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly userService: UserService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('getAllUsers')
    async getAllUsers(@CurrentUser() user: JwtPayload) {
        try {
            const currentUserRole = await this.userService.getUserRoles(
                user.id,
            );
            if (
                currentUserRole.includes(RolesEnum.ADMIN) ||
                currentUserRole.includes(RolesEnum.SA)
            ) {
                const foundedUserList =
                    (await this.userService.findAll()) as ExtendUserI[];

                const userListResponse = foundedUserList.map((user) => {
                    return {
                        ...classToPlain(new UserResponse(user, user.roles)),
                    };
                });

                return userListResponse;
            } else {
                throw new BadRequestException('You do not have Admin roles');
            }
        } catch (e) {
            throw new BadRequestException('Failed to get user list');
        }
    }
}
