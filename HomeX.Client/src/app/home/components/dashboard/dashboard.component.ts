import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDevice } from '../../../devices/shared/device';
import { DeviceType } from '../../../devices/shared/device-type';
import { IRoom } from '../../../rooms/shared/room';
import { RoomsService } from '../../../rooms/shared/rooms.service';
import { Dictionary } from 'typescript-collections';
import { DevicesService } from 'src/app/devices/shared/devices.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  roomToRename: IRoom;
  rooms: IRoom[];
  roomColors: string[];
  roomsDict: Dictionary<string, IRoom>;
  devicesDict: Dictionary<string, any>;

  // devicesRoom1: IDevice[] = [
  //   { name: 'Outside Light', type: DeviceType.propertiesOf(DeviceType.Light) },
  //   { name: 'Power', type: DeviceType.propertiesOf(DeviceType.Power) },
  //   {
  //     name: 'Front Door',
  //     type: DeviceType.propertiesOf(DeviceType.Door),
  //     status: 'Open'
  //   },
  //   {
  //     name: 'Temperature',
  //     type: DeviceType.propertiesOf(DeviceType.Temperature)
  //   }
  // ];

  // devicesRoom2: IDevice[] = [
  //   { name: 'Outside Light', type: DeviceType.propertiesOf(DeviceType.Light) },
  //   {
  //     name: 'Front Door',
  //     type: DeviceType.propertiesOf(DeviceType.Door),
  //     status: 'Closed'
  //   },
  //   { name: 'Detection', type: DeviceType.propertiesOf(DeviceType.Occupancy) }
  // ];

  // devicesRoom3: IDevice[] = [
  //   { name: 'Outside Light', type: DeviceType.propertiesOf(DeviceType.Light) },
  //   {
  //     name: 'Outside Detection',
  //     type: DeviceType.propertiesOf(DeviceType.Occupancy)
  //   },
  //   {
  //     name: 'Back Door',
  //     type: DeviceType.propertiesOf(DeviceType.Door),
  //     status: 'Closed'
  //   },
  //   {
  //     name: 'Temperature',
  //     type: DeviceType.propertiesOf(DeviceType.Temperature)
  //   }
  // ];

  // devicesRoom4: IDevice[] = [
  //   { name: 'Outside Light', type: DeviceType.propertiesOf(DeviceType.Light) },
  //   {
  //     name: 'Outside Power',
  //     type: DeviceType.propertiesOf(DeviceType.Temperature)
  //   },
  //   {
  //     name: 'Back Door',
  //     type: DeviceType.propertiesOf(DeviceType.Door),
  //     status: 'Closed'
  //   },
  //   {
  //     name: 'Temperature',
  //     type: DeviceType.propertiesOf(DeviceType.Temperature)
  //   },
  //   { name: 'Outside Light', type: DeviceType.propertiesOf(DeviceType.Light) },
  //   {
  //     name: 'Side Door',
  //     type: DeviceType.propertiesOf(DeviceType.Door),
  //     status: 'Opened'
  //   },
  //   {
  //     name: 'Temperature',
  //     type: DeviceType.propertiesOf(DeviceType.Temperature)
  //   }
  // ];

  // roomsFixed: IRoom[] = [
  //   {
  //     name: 'Living Room',
  //     cols: 1,
  //     color: 'none',
  //     devices: this.devicesRoom1
  //   },
  //   {
  //     name: 'Mike\'s Bedroom',
  //     cols: 1,
  //     color: '#88EAD1',
  //     devices: this.devicesRoom2
  //   },
  //   {
  //     name: 'Restroom',
  //     cols: 1,
  //     color: '#A5E0F4',
  //     devices: this.devicesRoom3
  //   },
  //   {
  //     name: 'Kitchen',
  //     cols: 1,
  //     color: '#C1C0DD',
  //     devices: this.devicesRoom4
  //   },
  //   {
  //     name: 'Thor\'s Bedroom',
  //     cols: 1,
  //     color: '#E4CDD2',
  //     devices: this.devicesRoom1
  //   }
  // ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private roomsService: RoomsService,
    private devicesService: DevicesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // this.roomsService.getRooms.subscribe(data => {
    //   const rooms = this.roomsFixed.concat(data);
    //   this.rooms = rooms;
    // });

    this.roomsService.getRoomsDict.subscribe(data => {
      this.roomsDict = data;
      // const x = this.roomsDict.values();
      // if (x.length > 0) {
      //   console.log('vrau', x[0].devices);
      // }
    });

    this.devicesService.getDevices.subscribe(data => {
      this.devicesDict = data;
    });

    // TODO: retrieve the colors from the database
    this.roomColors = [
      'None',
      '#C1C0DD',
      '#A5E0F4',
      '#88EAD1',
      '#e59088',
      '#ffef87',
      '#f0ba5d',
      '#d3f199',
      '#b6f7ea',
      '#d1eff6',
      '#b2cdf6',
      '#d0b5f6',
      '#f1d1e6',
      '#e2c8ac',
      '#e8eaed'
    ];
  }

  // TODO: figure out how to force a focus on the input text field after call this method
  setRoomToRename(room) {
    this.roomToRename = room;
  }

  changeRoomName(room) {
    this.roomToRename = null;
    const hubId = this.authService.userHub;
    this.roomsService.updateRoomNameByUserHub(hubId, room);
  }

  changeRoomColor(color: string, room: IRoom) {
    room.color = color;
    const hubId = this.authService.userHub;
    this.roomsService.updateRoomColorByUserHub(hubId, room);
  }

  addDeviceToRoom(deviceId: any, roomId: any) {
    const device = this.devicesDict.getValue(deviceId);
    // let devicePreviousRoom = null;

    // console.log('TYPEEEE', typeof device.roomId);
    // if (typeof device.roomId !== 'undefined') {
    //   devicePreviousRoom = ;
    // }
    const hubId = this.authService.userHub;

    this.roomsService.addDeviceToRoomByUserHub(hubId, deviceId, roomId);
    this.devicesService.updateDeviceRoomIdByUserHub(hubId, deviceId, roomId);

    console.log('TYPEEEE', typeof device.roomId);
    if (typeof device.roomId !== 'undefined') {
      this.roomsService.removeDerviceFromRoomByUserHub(hubId, deviceId, device.roomId);
    }
  }

  deviceIsNotInRoom(deviceId: string, roomDevices: string[]) {
    return !roomDevices.includes(deviceId);
  }
}
