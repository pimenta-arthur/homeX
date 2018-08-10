import { Component, OnInit } from "@angular/core";
import { Room } from "../../../rooms/shared/room";
import { RoomsService } from "../../../rooms/shared/rooms.service";

@Component({
  selector: "app-devices",
  templateUrl: "./devices.component.html",
  styleUrls: ["./devices.component.scss"]
})
export class DevicesComponent implements OnInit {
  rooms: Room[];

  constructor(private roomsService: RoomsService) {}

  ngOnInit() {
    // this.rooms = this.roomsService.getRooms();
    this.roomsService.getRooms.subscribe(data => {
      this.rooms = data;
    });
  }
}
