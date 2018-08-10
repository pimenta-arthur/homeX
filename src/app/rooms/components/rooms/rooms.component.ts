import { Component, OnInit } from "@angular/core";
import { RoomsService } from "../../shared/rooms.service";
import { Room } from "../../shared/room";
import { Device } from "../../../devices/shared/device";
import { MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-rooms",
  templateUrl: "./rooms.component.html",
  styleUrls: ["./rooms.component.scss"]
})
export class RoomsComponent implements OnInit {
  rooms: Room[];
  displayedColumns: string[] = ["rooms", "devices"];
  dataSource: MatTableDataSource<Room>;

  constructor(private roomsService: RoomsService) {}

  ngOnInit() {
    this.rooms = this.roomsService.getRooms();

    this.dataSource = new MatTableDataSource(this.rooms);
  }

  removeRoom(room: Room): void {
    this.roomsService.removeRoom(room);
  }
}
