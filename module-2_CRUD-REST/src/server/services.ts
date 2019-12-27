import { Request, Response, NextFunction } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { userSchema } from './validation';
import express from 'express';
import { errorHandlerMiddleware } from './error-handling';
const users = [];

const saveUser = (req: Request, res: Response, next: NextFunction) => {
   // errorHandlerMiddleware(userValidationSchema, req.body);
    console.log(req.body)
    //res.status(201).json(req.body);
    throw new Error('Error');
};

const updateUser = (req: Request, res: Response) => {
    console.log(req.body);
    res.status(201).json("req.body");
};

const getUser = (req: Request, res: Response) => {
    console.log(req.body);
    res.status(201).json("req.body");
};

// sorted by login property and filtered by loginSubstringin the login property

const getAutoSuggestUsers = (req, res) => {
    console.log(req.body);
    res.status(201).json("req.body");
};

const removeUser = (req:  express.Request, res:  express.Request) => {
    console.log(req.body);
    //res.status(201).json("req.body");
};

export {
    saveUser,
    updateUser,
    getUser,
    getAutoSuggestUsers,
    removeUser
}