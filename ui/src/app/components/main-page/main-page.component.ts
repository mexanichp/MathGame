import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
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
    private usersService: ApiService,
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
