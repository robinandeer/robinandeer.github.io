import Redis from 'ioredis'

const client = new Redis(process.env.REDIS_CONNECTION_STRING)

export default client
