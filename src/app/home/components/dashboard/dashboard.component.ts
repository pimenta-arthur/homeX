import { Component, OnInit } from "@angular/core";
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
  rooms: IRoom[];

  devicesRoom1: IDevice[] = [
    { name: "Outside Light", type: DeviceType.propertiesOf(DeviceType.Light) },
    { name: "Outside Light", type: DeviceType.propertiesOf(DeviceType.Light) },
    { name: "Front Door", type: DeviceType.propertiesOf(DeviceType.Door), status: 'Open'},
    { name: "Temperature", type: DeviceType.propertiesOf(DeviceType.Temperature) }
  ];

  devicesRoom2: IDevice[] = [
    { name: "Outside Light", type: DeviceType.propertiesOf(DeviceType.Light) },
    { name: "Front Door", type: DeviceType.propertiesOf(DeviceType.Door), status: 'Closed' },
    { name: "Temperature", type: DeviceType.propertiesOf(DeviceType.Temperature) }
  ];

  devicesRoom3: IDevice[] = [
    { name: "Outside Light", type: DeviceType.propertiesOf(DeviceType.Light) },
    { name: "Outside Light", type: DeviceType.propertiesOf(DeviceType.Light) },
    { name: "Back Door", type: DeviceType.propertiesOf(DeviceType.Door), status: 'Closed' },
    { name: "Temperature", type: DeviceType.propertiesOf(DeviceType.Temperature) }
  ];

  devicesRoom4: IDevice[] = [
    { name: "Outside Light", type: DeviceType.propertiesOf(DeviceType.Light) },
    { name: "Outside Light", type: DeviceType.propertiesOf(DeviceType.Light) },
    { name: "Back Door", type: DeviceType.propertiesOf(DeviceType.Door), status: 'Closed' },
    { name: "Temperature", type: DeviceType.propertiesOf(DeviceType.Temperature) },
    { name: "Outside Light", type: DeviceType.propertiesOf(DeviceType.Light) },
    { name: "Side Door", type: DeviceType.propertiesOf(DeviceType.Door), status: 'Opened' },
    { name: "Temperature", type: DeviceType.propertiesOf(DeviceType.Temperature) }
  ];

  roomsFixed: IRoom[] = [
    {
      name: "Living Room",
      cols: 1,
      color: "lightblue",
      devices: this.devicesRoom1
    },
    {
      name: "Mika's Badroom",
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
      name: "Thor's Badroom",
      cols: 1,
      color: "#dec7ce",
      devices: this.devicesRoom1
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
    this.roomsService.getRooms.subscribe(data => {
      let rooms = this.roomsFixed.concat(data);
      this.rooms = rooms;
    });
  }
}
