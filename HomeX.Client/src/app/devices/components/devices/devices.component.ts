import { Component, OnInit } from '@angular/core';
import { IRoom } from '../../../rooms/shared/room';
import { RoomsService } from '../../../rooms/shared/rooms.service';
import { DeviceDialogFabComponent } from '../device-dialog-fab/device-dialog-fab.component';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { DevicesService } from '../../shared/devices.service';
import { IDevice } from '../../shared/device';
import { DeviceType } from '../../shared/device-type';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  rooms: IRoom[];
  devices: IDevice[];
  displayedColumns: string[] = ['devices'];
  dataSource: MatTableDataSource<IDevice>;


  constructor(
    private roomsService: RoomsService,
    public dialog: MatDialog,
    private devicesService: DevicesService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.roomsService.getRooms.subscribe(data => {
      this.rooms = data;
    });

    this.devicesService.getDevices.subscribe(dict => {
      this.devices = dict.values();

      this.dataSource = new MatTableDataSource(this.devices);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeviceDialogFabComponent, {
      // width: "250px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      const device: IDevice = result;
      if (device) {
        // get user hub before add device to database
        const hubId: string = this.auth.userHub;
        this.devicesService.addDevice(device, hubId);
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
