import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Observable } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  userName: string;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private socketService: SocketService
  ) { }

  ngOnInit() {
  }

  joinGame(userName: string) {
    this.userName = userName;
    console.log(this.userName);
    this.router.navigate(['/game-board', {userName: this.userName}]);
  }
}
