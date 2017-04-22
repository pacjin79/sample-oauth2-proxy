import { NextFunction, Request, Response } from 'express';

export function auth (req:Request, res:Response) {
    res.status(200).json({
        authenticated: true
    });
}

export function callback(req:Request, res:Response, next: NextFunction) {
    console.log('next func in call back = ', next);
    res.status(200).json({
        callback: true
    })
}