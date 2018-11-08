import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DeviceType } from "../../shared/device-type";

@Component({
  selector: "app-device-dialog-fab",
  templateUrl: "./device-dialog-fab.component.html",
  styleUrls: ["./device-dialog-fab.component.scss"]
})
export class DeviceDialogFabComponent implements OnInit {
  deviceName = "";
  selectedDeviceOption = "";
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  deviceTypeNames: string[];

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required]
    });

    this.deviceTypeNames = DeviceType.typeNames();
  }

  selectDeviceOption(allOptions, selectedOption) {
    this.selectedDeviceOption = selectedOption;
    allOptions.deselectAll();

    console.log(this.selectedDeviceOption);
  }
}
