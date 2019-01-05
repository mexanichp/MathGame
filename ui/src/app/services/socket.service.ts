import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { Event } from '../model/event';

import * as socketIo from 'socket.io-client';
import { Message } from '../core/models/message';
import { environment } from 'src/environments/environment';
import { Actions } from '../core/models/actions.enum';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socket;

  constructor() {
    console.log('socket service is injected');
  }

  public initSocket(): void {
    this.socket = socketIo(environment.backendUrl);
    console.log(this.socket);
  }

  public destroySocket(): void {
    this.socket.disconnect();
  }

  public send(action: Actions, data: any): void {
    this.socket.emit(action, data);
  }

  public onEvent(action: string): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(action, () => observer.next());
    });
  }
}