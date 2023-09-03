import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Put,
    UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from '../libs/decorators';
import { UserResponse } from './responses';
import { ApiTags } from '@nestjs/swagger';
import { JwtPayload } from '../config/types/auth/jwtPayload';
import { User } from '@prisma/client';

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

    @Get('me')
    async me(@CurrentUser() user: UserResponse) {
        const response = await this.userService.findById(user.id);
        const { password, ...me } = response;
        return me;
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    async findOneUser(@Param('id') id: string) {
        const user = await this.userService.findById(id);

        return new UserResponse(user);
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
}
