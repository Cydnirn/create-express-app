import { Response } from "express";

type dataType = any[] | object | object[] | null;

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
}
