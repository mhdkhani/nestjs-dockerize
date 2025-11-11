import { Controller, Get,Query,UsePipes, ValidationPipe,Post,Body } from "@nestjs/common";
import { RedisService } from "./redis.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { redisApiGetDto,redisApiSetDto } from "../../dto/redis/redisApi.dto";
@Controller("public/v1/redis")
export class RedisController {
    constructor(private readonly redisService: RedisService) {}

    @Get('get')
    @ApiOperation({summary: 'get From redis'})
    @UsePipes(new ValidationPipe())
    @UsePipes(new ValidationPipe({ transform: true }))
    async getKey(
        @Query() query: redisApiGetDto
    ) {
        const user = await this.redisService.get(query);
        return {cache_data: user || 'No user found'};
    }


    @Post('set')
    @ApiOperation({summary: 'set to redis'})
    @UsePipes(new ValidationPipe())
    @UsePipes(new ValidationPipe({ transform: true }))
    async setKey(
        @Body() body: redisApiSetDto
    ): Promise<{message:string}> {
        await this.redisService.set(body);
        return {message: 'Key set!'};
    }

}
