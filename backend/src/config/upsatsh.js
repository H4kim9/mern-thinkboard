import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

import dotenv from 'dotenv'

dotenv.config()

// create a new rateLimiter tha allow 5 request in 10 seconds
export const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, '10 s')
});

export default ratelimit;