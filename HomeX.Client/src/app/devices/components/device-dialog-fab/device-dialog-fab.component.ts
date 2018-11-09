import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DeviceType } from "../../shared/device-type";

@Component({
  selector: "app-device-dialog-fab",
  templateUrl: "./device-dialog-fab.component.html",
  styleUrls: ["./device-dialog-fab.component.scss"]
})
export class DeviceDialogFabComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  newDeviceName = "";
  newDeviceType = "";
  deviceOptionNames: string[];

  color = "primary";
  mode = "determinate";
  value = 50;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required]
    });

    this.deviceOptionNames = DeviceType.typeNames();
  }

  selectDeviceOption(options, selectedOption) {
    this.newDeviceType = selectedOption;
    options.deselectAll();
    console.log(this.newDeviceType);
  }

  startCountdown(seconds) {
    let counter = seconds;

    const interval = setInterval(() => {
      console.log(counter);
      this.value = counter;
      counter--;

      if (counter < 0 ) {
        // The code here will run when
        // the timer has reached zero.
        clearInterval(interval);
        console.log("Ding!");
      }
    }, 1000);
  }
}
