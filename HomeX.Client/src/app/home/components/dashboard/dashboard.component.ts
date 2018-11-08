import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IDevice } from "../../../devices/shared/device";
import { DeviceType } from "../../../devices/shared/device-type";
import { IRoom } from "../../../rooms/shared/room";
import { RoomsService } from "../../../rooms/shared/rooms.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  roomToRename: IRoom;
  rooms: IRoom[];

  devicesRoom1: IDevice[] = [
    { name: "Outside Light", type: DeviceType.propertiesOf(DeviceType.Light) },
    { name: "Power", type: DeviceType.propertiesOf(DeviceType.Power) },
    { name: "Front Door", type: DeviceType.propertiesOf(DeviceType.Door), status: "Open"},
    { name: "Temperature", type: DeviceType.propertiesOf(DeviceType.Temperature) }
  ];

  devicesRoom2: IDevice[] = [
    { name: "Outside Light", type: DeviceType.propertiesOf(DeviceType.Light) },
    { name: "Front Door", type: DeviceType.propertiesOf(DeviceType.Door), status: "Closed" },
    { name: "Detection", type: DeviceType.propertiesOf(DeviceType.Occupancy) }
  ];

  devicesRoom3: IDevice[] = [
    { name: "Outside Light", type: DeviceType.propertiesOf(DeviceType.Light) },
    { name: "Outside Detection", type: DeviceType.propertiesOf(DeviceType.Occupancy) },
    { name: "Back Door", type: DeviceType.propertiesOf(DeviceType.Door), status: "Closed" },
    { name: "Temperature", type: DeviceType.propertiesOf(DeviceType.Temperature) }
  ];

  devicesRoom4: IDevice[] = [
    { name: "Outside Light", type: DeviceType.propertiesOf(DeviceType.Light) },
    { name: "Outside Power", type: DeviceType.propertiesOf(DeviceType.Temperature) },
    { name: "Back Door", type: DeviceType.propertiesOf(DeviceType.Door), status: "Closed" },
    { name: "Temperature", type: DeviceType.propertiesOf(DeviceType.Temperature) },
    { name: "Outside Light", type: DeviceType.propertiesOf(DeviceType.Light) },
    { name: "Side Door", type: DeviceType.propertiesOf(DeviceType.Door), status: "Opened" },
    { name: "Temperature", type: DeviceType.propertiesOf(DeviceType.Temperature) }
  ];

  roomsFixed: IRoom[] = [
    {
      name: "Living Room",
      cols: 1,
      color: "none",
      devices: this.devicesRoom1
    },
    {
      name: "Mike's Bedroom",
      cols: 1,
      color: "#88EAD1",
      devices: this.devicesRoom2
    },
    {
      name: "Restroom",
      cols: 1,
      color: "#A5E0F4",
      devices: this.devicesRoom3
    },
    {
      name: "Kitchen",
      cols: 1,
      color: "#C1C0DD",
      devices: this.devicesRoom4
    },
    {
      name: "Thor's Bedroom",
      cols: 1,
      color: "#E4CDD2",
      devices: this.devicesRoom1
    }
  ];

  // TODO: figure out how to force a focus on the input text field after call this method
  editRoomName (room?) {
    this.roomToRename = room;
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private roomsService: RoomsService,
  ) {}

  ngOnInit() {
    this.roomsService.getRooms.subscribe(data => {
      const rooms = this.roomsFixed.concat(data);
      this.rooms = rooms;
    });
  }
}
