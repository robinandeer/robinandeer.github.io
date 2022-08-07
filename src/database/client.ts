import Redis from 'ioredis';

if (process.env.REDIS_CONNECTION_STRING === undefined) {
	throw new Error('REDIS_CONNECTION_STRING is not defined');
}

const client = new Redis(process.env.REDIS_CONNECTION_STRING);

export default client;
