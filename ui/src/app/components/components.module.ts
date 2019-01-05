import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameBoardComponent } from './game-board/game-board.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { ApiService } from '../services/api.service';
import { SocketService } from '../services/socket.service';

@NgModule({
  declarations: [GameBoardComponent, MainPageComponent],
  imports: [
    CommonModule,
    ComponentsRoutingModule
  ],
  exports: [
  ],
  providers: [
    ApiService,
    SocketService
  ]
})
export class ComponentsModule { }
