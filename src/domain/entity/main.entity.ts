import { v4 as uuidv4 } from 'uuid';

export class MainEntity {
  private id: string;

  constructor() {
    this.id = uuidv4();
  }

  getId() {
    return this.id;
  }
}
