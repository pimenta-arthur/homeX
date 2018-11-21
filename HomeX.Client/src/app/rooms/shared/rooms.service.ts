import { Injectable } from '@angular/core';
import { IRoom } from './room';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dictionary } from 'typescript-collections';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class RoomsService {
  constructor(private db: AngularFireDatabase) {}

  private _rooms: BehaviorSubject<IRoom[]> = new BehaviorSubject<IRoom[]>([]);

  private _roomsDict: BehaviorSubject<
    Dictionary<string, IRoom>
  > = new BehaviorSubject<Dictionary<string, IRoom>>(
    new Dictionary<string, IRoom>()
  );

  addRoom(room: IRoom): void {
    this._rooms.next(this._rooms.getValue().concat(room));
  }

  removeRoom(room: IRoom): void {
    const index = this._rooms.getValue().indexOf(room);
    if (index !== -1) {
      this._rooms.getValue().splice(index, 1);
    }
  }

  get getRooms(): BehaviorSubject<IRoom[]> {
    return this._rooms;
  }

  get getRoomsDict(): Observable<Dictionary<string, IRoom>> {
    return this._roomsDict;
  }

  listenRoomsByUserHub(hubId: string): void {
    console.log('Listening hub rooms');
    const hubRoomsRef = this.db.list(`hubs/${hubId}/rooms`);

    hubRoomsRef.stateChanges(['child_changed']).subscribe(result => {
      let room: IRoom;
      room = <IRoom>result.payload.val();
      room.id = result.key;

      // this.updateDevice(device);
      if (this._roomsDict.getValue().containsKey(room.id)) {
        const dict: Dictionary<string, IRoom> = this._roomsDict.getValue();
        dict.setValue(room.id, room);

        this._roomsDict.next(dict);
      }

      console.log('Room updated successfully');
      console.log(this._roomsDict.getValue());
    });

    hubRoomsRef.stateChanges(['child_added']).subscribe(result => {
      let room: IRoom;
      room = <IRoom>result.payload.val();
      room.id = result.key;

      // this._devicesDict.getValue().setValue(device.id, device);
      // this.addDevice(device);
      const dict: Dictionary<string, IRoom> = this._roomsDict.getValue();
      dict.setValue(room.id, room);

      this._roomsDict.next(dict);

      console.log('Room added successfully');
      console.log(this._roomsDict.getValue());
    });

    hubRoomsRef.stateChanges(['child_removed']).subscribe(result => {
      let room: IRoom;
      room = <IRoom>result.payload.val();
      room.id = result.key;

      // this._devicesDict.getValue().remove(result.key);
      // this.removeDevice(device);
      if (this._roomsDict.getValue().containsKey(room.id)) {
        const dict: Dictionary<string, IRoom> = this._roomsDict.getValue();
        dict.remove(room.id);

        this._roomsDict.next(dict);
      }

      console.log('Room removed successfully');

      console.log(this._roomsDict.getValue());
    });
  }
}
