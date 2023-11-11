import { Request, Response, NextFunction } from "express";
import {
    ValidationChain,
    ValidationError,
    Result,
    validationResult,
} from "express-validator";

const validate = (validations: ValidationChain[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        (async (req: Request, res: Response, next: NextFunction) => {
            await Promise.all(
                validations.map((validation) => validation.run(req))
            );
            const error: Result<ValidationError> = validationResult(req);
            if (error.isEmpty()) return next();
            const errMessage = error.array().map((err: any) => err.msg);

            res.status(400).json({ status: "failure", message: errMessage });
        })(req, res, next);
    };
};

export default validate;