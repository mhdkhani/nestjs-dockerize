import { Injectable, Logger,Inject,OnModuleDestroy,OnModuleInit,BadRequestException } from "@nestjs/common";
import { createClient, RedisClientType } from 'redis';
import { redisApiGetDto,redisApiSetDto } from "../../dto/redis/redisApi.dto";
@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy{
    protected readonly logger = new Logger(RedisService.name);
    private client: RedisClientType;
    async onModuleInit() {
        this.client = createClient({
            url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
            database: parseInt(process.env.POST_REDIS_DATABASE || '0'),
        });
        this.client.on('error', (err) => console.error('❌ Redis Client Error:', err));
        await this.client.connect();
        console.log('✅ Redis connected');
    }

    async set(body: redisApiSetDto) {
        try{
            await this.client.set(body.redis_key, JSON.stringify(body.body), { EX: body.ex });
        }catch (e){
            throw e
        }
    }

    async get(query: redisApiGetDto): Promise<any> {
        const data = await this.client.get(query.redis_key);
        if (!data) return null;
        try {
            return (data) ;
        } catch (e){
            throw e
        }
    }


    async del(key: string) {
        try{
            await this.client.del(key);
        }catch (e){
            throw e
        }
    }

    async onModuleDestroy() {
        try{
            if (this.client) {
                await this.client.quit();
            }
        }catch (e){
            throw e
        }
    }
}
