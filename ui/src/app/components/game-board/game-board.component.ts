import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SocketService } from 'src/app/services/socket.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { Question } from './models/question';
import { of } from 'rxjs'
import { Actions } from 'src/app/core/models/actions.enum';
import { UserType } from 'src/app/core/models/user-type.enum';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit, OnDestroy {

  userName: string;
  isUserCanVote$: Observable<boolean>;

  question$: Observable<Question> = of();

  users$: Observable<User[]> = of([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: ApiService,
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
          this.users$ = this.usersService.getUsers();
          this.users$.subscribe(usrs => {
            this.isUserCanVote$ = of(usrs.some(u => u.id === this.socketService.socket.id && u.type === UserType.ACTIVE));
          })
      });

      this.socketService.onEvent(Actions.NEW_ROUND)
        .subscribe(() => {
          this.question$ = this.usersService.getQuestion();
        })

      this.socketService.send(Actions.NEW_USER, new User(this.userName));
    });
  }

  answer(data: string) {
    this.socketService.send(Actions.ANSWER, data);
  }

  ngOnDestroy(): void {
    this.socketService.destroySocket();
  }
}
