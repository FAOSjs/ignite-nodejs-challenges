import {RateLimiterRedis} from "rate-limiter-flexible"
import { createClient } from "redis"
import { Request, Response, NextFunction } from "express"
import { AppError } from "../../../errors/AppError"

const redisClient = createClient({
   url: `redis://rentx:@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
})

const limiter = new RateLimiterRedis({
   storeClient: redisClient,
   keyPrefix: "rateLimiter",
   points: 5,
   duration: 10
})

export default async function rateLimiter(req: Request, res: Response, next: NextFunction){
   try{
      await limiter.consume(req.ip)

      return next()
   }catch(error){
      throw new AppError("Too many requests", 429)
   }
}
