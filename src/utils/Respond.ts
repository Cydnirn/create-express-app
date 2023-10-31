import { Response } from "express";

type dataType = any[] | object | object[] | null;

export default class Respond {
    private HTTPStatus = {
        OK: 200,
    };

    private ResponseInstance = Response;

    public getResponse() {
        if (!this.ResponseInstance) {
            return new Respond();
        }
        return new Respond();
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
        const response = new Respond().getResponse();
        console.log("Here");
        return response.ResponseString(
            res,
            response.HTTPStatus.OK,
            true,
            message,
            data
        );
    }
}
