import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Injectable } from "@nestjs/common";
import { Request, Response } from 'express';

//created exception filter to catch the errors and return appropriate error format.
@Catch()
export class AllExceptionFilter implements ExceptionFilter{
    constructor(){}

    catch(exception: HttpException| any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status: number = exception instanceof HttpException ? exception.getStatus() : 500
        let exceptionMessage = exception.response?.message ?? exception.message;
        let message = Array.isArray(exceptionMessage) ? exceptionMessage : this.getMessage(exceptionMessage);
        const responseObject = {
            statusCode: status,
            message,
            timestamp: new Date().toISOString(),
            path: request.url,
            details: exception.details,
        };
        response.status(status).json(responseObject)
    }

    getMessage(exceptionMessage: string): string {
        if (!exceptionMessage) {
          console.log('The server encountered an error processing the request.');
          return 'The server encountered an error processing the request.';
        }
        const messages = exceptionMessage?.split(':');
        return messages?.length > 0 ? messages[0] : exceptionMessage;
      }
} 