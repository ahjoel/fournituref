import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private errorMessage: string | null = null;

  setErrorMessage(message: string) {
    this.errorMessage = message;
  }

  getErrorMessage() {
    const message = this.errorMessage;
    this.errorMessage = null; // Clear the message after reading it
    return message;
  }
}
