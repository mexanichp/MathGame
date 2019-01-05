import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { User } from '../core/models/user';
import { environment } from 'src/environments/environment';
import {map, count} from 'rxjs/operators';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersUrl: string = `${environment.backendUrl}/users`;

  // public users$: Observable<User[]>;

  constructor(
    private httpClient: HttpClient,
    private socketService: SocketService
  ) { 
    // this.socketService.initSocket();
    // this.socketService.onMessage()
    //   .subscribe(() => {
    //     this.refreshData();
    //   });
  }

  // private refreshData() {
  //   this.users$ = this.httpClient.get<User[]>(this.usersUrl);
  // }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.usersUrl);
  }

  // getUsersCount(): Observable<number> {
  //   return this.getUsers().pipe(
  //     count()
  //   );
  // }
}
