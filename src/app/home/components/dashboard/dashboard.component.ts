import { Component, OnInit } from "@angular/core";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Device } from "../../../devices/shared/device";
import { Room } from "../../../rooms/shared/room";
import { RoomsService } from "../../../rooms/shared/rooms.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  // rooms: Room[];

  devicesRoom1: Device[] = [
    { name: "Outside Light", type: "light" },
    { name: "Outside Light", type: "light" },
    { name: "Garage", type: "door" },
    { name: "Living Room Temperature", type: "temperature" }
  ];

  devicesRoom2: Device[] = [
    { name: "Outside Light", type: "light" },
    { name: "Garage", type: "door" },
    { name: "Living Room Temperature", type: "temperature" }
  ];

  devicesRoom3: Device[] = [
    { name: "Outside Light", type: "light" },
    { name: "Outside Light", type: "light" },
    { name: "Garage", type: "door" },
    { name: "Living Room Temperature", type: "temperature" }
  ];

  devicesRoom4: Device[] = [
    { name: "Outside Light", type: "light" },
    { name: "Outside Light", type: "light" },
    { name: "Outside Light", type: "light" },
    { name: "Garage", type: "door" },
    { name: "Living Room Temperature", type: "temperature" },
    { name: "Outside Light", type: "light" },
    { name: "Garage", type: "door" },
    { name: "Living Room Temperature", type: "temperature" }
  ];

  rooms: Room[] = [
    {
      name: "Living Room",
      cols: 1,
      color: "lightblue",
      devices: this.devicesRoom1
    },
    {
      name: "Badroom",
      cols: 1,
      color: "lightgreen",
      devices: this.devicesRoom2
    },
    {
      name: "Restroom",
      cols: 1,
      color: "lightpink",
      devices: this.devicesRoom3
    },
    {
      name: "Kitchen",
      cols: 1,
      color: "#DDBDF1",
      devices: this.devicesRoom4
    },
    {
      name: "Kitchen",
      cols: 1,
      color: "#DDBDF1",
      devices: this.devicesRoom4
    }
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private roomsService: RoomsService
  ) {}

  ngOnInit() {
    let rooms: Room[] = this.roomsService.getRooms();

    for (let room of rooms) {
      this.rooms.push(room);
    }
  }
}
