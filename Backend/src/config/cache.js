import ioredis from 'ioredis';
import {appConfig} from './config.js';



const redisClient = new ioredis({
    host : appConfig.redisHost ,
    port : appConfig.redisPort ,
    password : appConfig.redisPassword,
    keyPrefix: appConfig.redisKeyPrefix,
})


redisClient.on('connect' , () => {
    console.log('Connected to Redis');
})

redisClient.on('error' , (err) => {
    console.error('Redis error : ' , err);
})  



const TOKEN_BLACKLIST_PREFIX = "bl-token:";

// key : redisKeyPrefix + "bl:token:" + token

export const blacklistToken = async (token, expiresInSec) => {
  if (!token || typeof expiresInSec !== "number" || expiresInSec <= 0) {
    throw new Error("[Redis] blacklistToken: invalid token or TTL");
  }
  const key = `${TOKEN_BLACKLIST_PREFIX}${token}`;
  await redisClient.set(key, "1", "EX", expiresInSec);
  console.info(`[Redis] Token blacklisted for ${expiresInSec}s`);
};



export const isTokenBlacklisted = async (token) => {
  const key = `${TOKEN_BLACKLIST_PREFIX}${token}`;
  const val = await redisClient.get(key);
  return val !== null;
};




export default redisClient