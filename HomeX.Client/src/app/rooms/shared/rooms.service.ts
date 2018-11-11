import { Injectable } from '@angular/core';
import { IRoom } from './room';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RoomsService {
  constructor() {}

  private _rooms: BehaviorSubject<IRoom[]> = new BehaviorSubject<IRoom[]>([]);

  addRoom(room: IRoom): void {
    this._rooms.next(this._rooms.getValue().concat(room));
  }

  removeRoom(room: IRoom): void {
    const index = this._rooms.getValue().indexOf(room);
    if (index != -1) {
      this._rooms.getValue().splice(index, 1);
    }
  }

  get getRooms(): BehaviorSubject<IRoom[]> {
    return this._rooms;
  }
}
