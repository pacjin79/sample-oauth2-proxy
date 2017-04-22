import { NextFunction, Request, Response } from 'express';

export function workers (req:Request, res:Response, next: NextFunction){
    console.log('req ', req.param('authcode'));
    res.status(200).json({
        success: true
    });
}