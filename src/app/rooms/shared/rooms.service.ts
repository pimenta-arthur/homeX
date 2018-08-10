import { Injectable } from "@angular/core";
import { Room } from "./room";

@Injectable()
export class RoomsService {
  constructor() {}

  private _rooms: Room[] = new Array<Room>();

  addRoom(room: Room): void {
    this._rooms.push(room);
  }

  removeRoom(room: Room): void {
    var index = this._rooms.indexOf(room);
    if (index != -1) {
      this._rooms.splice(index, 1);
    }
  }

  getRooms(): Room[] {
    return this._rooms;
  }
}
