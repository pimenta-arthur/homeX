import { Component, OnInit } from "@angular/core";
import { IRoom } from "../../../rooms/shared/room";
import { RoomsService } from "../../../rooms/shared/rooms.service";
import { DeviceDialogFabComponent } from "../device-dialog-fab/device-dialog-fab.component";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-devices",
  templateUrl: "./devices.component.html",
  styleUrls: ["./devices.component.scss"]
})
export class DevicesComponent implements OnInit {
  rooms: IRoom[];

  constructor(private roomsService: RoomsService, public dialog: MatDialog) {}

  ngOnInit() {
    // this.rooms = this.roomsService.getRooms();
    this.roomsService.getRooms.subscribe(data => {
      this.rooms = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeviceDialogFabComponent, {
      // width: "250px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}
