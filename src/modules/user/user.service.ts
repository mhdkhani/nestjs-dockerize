import { Injectable, Logger } from "@nestjs/common";
@Injectable()
export class UserService {
    protected readonly logger = new Logger(UserService.name);
    constructor() {}
}
