import { Request, Response, NextFunction } from "express";
import {  CustomError } from "../errors";

export const errorHandler = (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
) => {

    if (error instanceof CustomError) {
        return response.status(error.statusCode).send({ errors: error.serializeErrors() });
    }

    console.error(error);
    response.status(400).send({
        errors:[{message:'Something went wrong'}]
    }) 
}
