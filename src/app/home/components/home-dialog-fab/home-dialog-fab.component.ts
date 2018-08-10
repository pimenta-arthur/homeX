import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-home-dialog-fab",
  templateUrl: "./home-dialog-fab.component.html",
  styleUrls: ["./home-dialog-fab.component.scss"]
})
export class HomeDialogFabComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<HomeDialogFabComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
