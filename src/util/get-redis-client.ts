import * as redis from 'redis';
import * as bluebird from 'bluebird';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const redisClient = redis.createClient();

redisClient.on('error',( err ):void => {
    console.error(err);
});

export default redisClient;