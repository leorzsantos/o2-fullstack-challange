import { Response } from 'express';
import { response_status_codes } from './common.model';

export function successResponse(message: string, DATA: any, res: Response) {
  res.status(response_status_codes.success).json({
    STATUS: 'SUCCESS',
    MESSAGE: message,
    DATA
  });
}

export function failureResponse(message: string, DATA: any, res: Response) {
  res.status(response_status_codes.internal_server_error).json({
    STATUS: 'FAILURE',
    MESSAGE: message,
    DATA
  });
}

export function insufficientParameters(res: Response) {
  res.status(response_status_codes.bad_request).json({
    STATUS: 'FAILURE',
    MESSAGE: 'Insufficient parameters',
    DATA: {}
  });
}

export function unauthorized(message: string, DATA: any, res: Response) {
  res.status(response_status_codes.unauthorized).json({
    STATUS: 'UNAUTHORIZED',
    MESSAGE: message,
    DATA: DATA
  });
}