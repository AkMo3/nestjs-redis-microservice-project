import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserRequest } from "./dto/create-user.request";
import { UserService } from "./users.service";


@Controller('auth/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() request: CreateUserRequest) {
        return this.userService.createUser(request);
    }
}
