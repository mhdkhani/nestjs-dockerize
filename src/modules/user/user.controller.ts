import { Controller, Get } from "@nestjs/common";
import {UserService} from "./user.service";

@Controller('public/v1')
export class UserController {
    constructor(
        public userService: UserService
    ) {

    }
    @Get('/checkout/addresses')
    async getAddressList(){

    }
}
