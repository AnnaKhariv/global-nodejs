import { Request, Response, NextFunction } from 'express';

const users = [];


const saveUser = (req: Request, res: Response) => {
    console.log(req.body);
    res.status(201).json("req.body");
};


export {
    saveUser
}