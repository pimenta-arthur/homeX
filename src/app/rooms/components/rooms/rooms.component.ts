import { Component, OnInit } from "@angular/core";
import { RoomsService } from "../../shared/rooms.service";
import { Room } from "../../shared/room";
import { Device } from "../../../devices/shared/device";

@Component({
  selector: "app-rooms",
  templateUrl: "./rooms.component.html",
  styleUrls: ["./rooms.component.scss"]
})
export class RoomsComponent implements OnInit {
  rooms: Room[];

  constructor(private roomsService: RoomsService) {}

  ngOnInit() {
    this.rooms = this.roomsService.getRooms();
  }

  createRoom(): void {
    let room: Room = {
      name: "Living Room",
      cols: 1,
      rows: 2,
      color: "lightblue",
      devices: new Array<Device>()
    };

    this.roomsService.addRoom(room);

    console.log(this.roomsService.getRooms().length);
  }

  removeRoom(room: Room): void {
    this.roomsService.removeRoom(room);
  }
}
