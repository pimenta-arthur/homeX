import { Injectable } from "@angular/core";
import { Room } from "./room";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class RoomsService {
  constructor() {}

  private _rooms: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>([]);

  addRoom(room: Room): void {
    this._rooms.next(this._rooms.getValue().concat(room));
  }

  removeRoom(room: Room): void {
    var index = this._rooms.getValue().indexOf(room);
    if (index != -1) {
      this._rooms.getValue().splice(index, 1);
    }
  }

  get getRooms(): BehaviorSubject<Room[]> {
    return this._rooms;
  }
}
