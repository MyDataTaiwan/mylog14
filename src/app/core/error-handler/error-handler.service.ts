import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

import { throwError } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '@shared/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(
    private readonly toastService: ToastService,
    private readonly translateService: TranslateService,
  ) { }

  handleError(error: any) {
    const isHttpError = error?.error?.message != null;
    const message = (isHttpError) ? error.error.message : error.message;
    const i18nMessage = this.translateService.instant(message);
    const debugMessage = `Code: ${error.status}\n` + `Message: ${i18nMessage}\n` + `Stack: ${error.stack}`;
    const userMessage = (isHttpError) ? '' : i18nMessage;
    console.error(debugMessage);
    if (userMessage.length > 0) {
      this.toastService.showToast(userMessage, 'danger').subscribe();
    }
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
