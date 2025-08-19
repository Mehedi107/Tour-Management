import { Response } from "express"

interface IMeta {
    page?: number,
    total?: number,
    limit?: number
}

interface TResponse<T> {
    success: boolean,
    statusCode: number,
    message: string,
    data: T
    meta?: IMeta
}

export const sendResponse = <T>(res:Response, data: TResponse<T>) => {
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
        meta: data.meta
    })
}