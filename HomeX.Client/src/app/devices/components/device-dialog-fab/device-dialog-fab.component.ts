import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-device-dialog-fab",
  templateUrl: "./device-dialog-fab.component.html",
  styleUrls: ["./device-dialog-fab.component.scss"]
})
export class DeviceDialogFabComponent implements OnInit {
  deviceName: string = "";
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required]
    });

    console.log("hsuahusah", this.firstFormGroup);

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required]
    });
  }
}
