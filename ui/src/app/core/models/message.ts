import { User } from './user';

export class Message {
  data: User;
  constructor(data:User) { 
    this.data = data;
  }
}
