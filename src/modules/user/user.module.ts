import {Module} from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    controllers: UserModule.Controllers,
    providers:UserModule.Providers,
    imports:[]
})
export class UserModule {
    static Entities=[];
    static Controllers=[UserController];
    static Providers=[UserService];
}
