import { Catch, ExceptionFilter, HttpException, ArgumentsHost, Logger } from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest();
    const response = context.getResponse();
    
    const status = exception.name == 'QueryFailedError' ? 400 : exception.getStatus();
  
    const errorResponse = {
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message: exception.message
    }

    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
      'ExceptionFilter'
    )

    response.status(400).json(errorResponse);
  }
}