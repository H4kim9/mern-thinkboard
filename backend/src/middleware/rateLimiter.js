import ratelimit from '../config/upsatsh.js';

export const rateLimiter = async (req, res, next) => {
    try {
        const {success} = await ratelimit.limit("my-rate-limit")

        if(!success){
            return res.status(429).json({
                message: "Too Many Requests! Please try later "
            })
        }
        next();

    } catch (error) {
        console.error("Error in the middleware:", error)
        next(error)
    }
}

export default rateLimiter;