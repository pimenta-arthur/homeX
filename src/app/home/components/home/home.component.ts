import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { HomeDialogFabComponent } from "../home-dialog-fab/home-dialog-fab.component";
import { RoomsService } from "../../../rooms/shared/rooms.service";
import { Room } from "../../../rooms/shared/room";
import { Device } from "../../../devices/shared/device";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  roomName: string;
  userName: string;

  constructor(public dialog: MatDialog, private roomsService: RoomsService) {}

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(HomeDialogFabComponent, {
      width: "250px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      if (result) {
        this.roomName = result;

        let room: Room = {
          color: "white",
          cols: 1,
          name: this.roomName,
          devices: new Array<Device>()
        };

        this.roomsService.addRoom(room);
      }
    });
  }
}
