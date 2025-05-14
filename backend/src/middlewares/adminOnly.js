import {ApiError, apiError} from "../utils/apiError.js"

export const adminOnly = (req,res,next) => {
    if (!req.user || req.user.role !== "admin") {
        throw new ApiError(403,"access denied admins only")
    }
    next();
};