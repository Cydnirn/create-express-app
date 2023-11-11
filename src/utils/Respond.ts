import { Response } from "express";

type dataType = any[] | object | object[] | null;

type falseMessage = string | null;

export default class Respond {
    private static instance: Respond;
    private HTTPStatus = {
        OK: 200,
        CREATED: 201,
        ACCEPTED: 202,
        BAD_REQ: 400,
        UNAUTH: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        INTERNAL_ERR: 500,
    };

    private HTTPMessage = {
        FORBIDDEN: "Forbidden",
        BAD_REQ: "Bad Request",
        UNAUTH: "Unauthorized",
        NOT_FOUND: "Resource not found",
        INTERNAL_ERR: "Something went wrong, try again later",
    };

    public static getResponse() {
        if (!Respond.instance) {
            Respond.instance = new Respond();
        }
        return Respond.instance;
    }

    private dataConsumer(data: dataType) {
        if ((Array.isArray(data) && !data.length) || !data) {
            return null;
        }
        return data;
    }

    private ResponseString(
        res: Response,
        status: number,
        messageStatus: boolean,
        message: string,
        data: dataType
    ) {
        return res.status(status).json({
            status: messageStatus ? "success" : "failed",
            message: message,
            data: this.dataConsumer(data),
        });
    }

    public static OK(res: Response, message: string, data: dataType) {
        const response = Respond.getResponse();
        return response.ResponseString(
            res,
            response.HTTPStatus.OK,
            true,
            message,
            data
        );
    }

    public static CREATED(res: Response, message: string, data: dataType) {
        const response = Respond.getResponse();
        return response.ResponseString(
            res,
            response.HTTPStatus.CREATED,
            true,
            message,
            data
        );
    }

    public static BAD_REQ(
        res: Response,
        message: falseMessage,
        data: dataType
    ) {
        const response = Respond.getResponse();
        return response.ResponseString(
            res,
            response.HTTPStatus.BAD_REQ,
            false,
            message ?? response.HTTPMessage.BAD_REQ,
            data
        );
    }

    public static UNAUTH(res: Response, message: falseMessage, data: dataType) {
        const response = Respond.getResponse();
        return response.ResponseString(
            res,
            response.HTTPStatus.UNAUTH,
            false,
            message ?? response.HTTPMessage.UNAUTH,
            data
        );
    }

    public static FORBIDDEN(
        res: Response,
        message: falseMessage,
        data: dataType
    ) {
        const response = Respond.getResponse();
        return response.ResponseString(
            res,
            response.HTTPStatus.FORBIDDEN,
            false,
            message ?? response.HTTPMessage.FORBIDDEN,
            data
        );
    }

    public static NOT_FOUND(
        res: Response,
        message: falseMessage,
        data: dataType
    ) {
        const response = Respond.getResponse();
        return response.ResponseString(
            res,
            response.HTTPStatus.NOT_FOUND,
            false,
            message ?? response.HTTPMessage.FORBIDDEN,
            data
        );
    }

    public static INTERNAL_ERR(
        res: Response,
        message: falseMessage,
        data: dataType
    ) {
        const response = Respond.getResponse();
        return response.ResponseString(
            res,
            response.HTTPStatus.INTERNAL_ERR,
            false,
            message ?? response.HTTPMessage.INTERNAL_ERR,
            data
        );
    }
}
