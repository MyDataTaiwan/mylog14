import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

import { throwError } from 'rxjs';

import { ToastService } from '@shared/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(
    private readonly toastService: ToastService,
  ) { }

  handleError(error: any) {
    let debugMessage = '';
    let userMessage = '';
    if (error?.status) {
      debugMessage += `Error code: ${error.status}\n`;
      userMessage += `${error.status}: `;
    }
    if (error?.error?.message) {
      debugMessage += `Error message: ${error.error.message}\n`;
      userMessage += `Error: ${error.error.message}\n`;
    } else {
      debugMessage += `Error message: ${error.message}\n`;
      userMessage += `Error: ${error.message}\n`;
    }
    debugMessage += `Stack: ${error.stack}`;
    console.error(debugMessage);
    this.toastService.showToast(userMessage, 'danger').subscribe();
    return throwError(userMessage);
  }

  getClientMessage(error: Error): string {
    if (!navigator.onLine) {
      return 'No Internet Connection';
    }
    return error.message ? error.message : error.toString();
  }

  getClientStack(error: Error): string {
    return error.stack;
  }

  getServerMessage(error: HttpErrorResponse): string {
    return error.message;
  }

  getServerStack(error: HttpErrorResponse): string {
    // handle stack trace
    return 'stack';
  }
}
