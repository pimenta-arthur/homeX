import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HomeDialogFabComponent } from '../home-dialog-fab/home-dialog-fab.component';
import { RoomsService } from '../../../rooms/shared/rooms.service';
import { IRoom } from '../../../rooms/shared/room';
import { IDevice } from '../../../devices/shared/device';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  roomName: string;
  userName: string;

  constructor(
    public dialog: MatDialog,
    private roomsService: RoomsService,
    private auth: AuthService
  ) {}

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(HomeDialogFabComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.roomName = result;

        const room: IRoom = {
          color: 'None',
          // cols: 1,
          name: this.roomName,
          devices: new Array<any>()
        };

        // get user hub before add device to database
        const hubId: string = this.auth.userHub;
        this.roomsService.addRoom(room, hubId);
      }
    });
  }
}
