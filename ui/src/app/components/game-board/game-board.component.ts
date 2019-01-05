import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { SocketService } from 'src/app/services/socket.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { Question } from './models/question';
import { of } from 'rxjs'
import { Actions } from 'src/app/core/models/actions.enum';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit, OnDestroy {

  question: Question = new Question();

  userName: string;
  users$: Observable<User[]> = of([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private socketService: SocketService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.userName = p.userName;

      if(!this.userName) {
        this.router.navigate(['/main-page']);
        return;
      }
  
      this.socketService.initSocket();
  
      this.socketService.onEvent(Actions.REFRESH)
        .subscribe(() => {
          console.log('on refresh')
          this.users$ = this.usersService.getUsers();
          // this.users$.subscribe(users => {
          //   users.forEach(u => console.log(u));
          // })
      });

      this.socketService.send(Actions.NEW_USER, new User(this.userName));
    });
  }

  ngOnDestroy(): void {
    console.log('on destroy')
    this.socketService.destroySocket();
  }
}
