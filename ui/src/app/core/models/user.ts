import { UserType } from './user-type.enum';

export class User {
  public id: string;
  public score: number;
  public type: UserType
  public name: string;

  constructor(name: string, score: number = 0) {
    this.name = name;
    this.score = score;
  }
}
