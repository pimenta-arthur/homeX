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
  isEditable = true;
  secondsToPermitJoining = 4;
  firstFormGroup: FormGroup;
  newDeviceName = "";
  newDeviceType = "";
  deviceOptionNames: string[];
  value = 0;

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
  }

  completeFirstStep(firstStep, stepper) {
    firstStep.completed = true;
    stepper.next();
  }

  completeSecondStep(secondStep, thirdStep, fourthStep, stepper) {
    secondStep.completed = true;
    this.isEditable = false;
    stepper.next();

    const seconds = this.secondsToPermitJoining * 200;
    let counter = 1;


    const interval = setInterval(() => {
      this.value = (counter / seconds) * 100;

      counter++;

      if (counter > seconds) {
        // The code here will run when
        // the timer has reached seconds.
        clearInterval(interval);

        thirdStep.completed = true;
        stepper.next();

        // fourthStep.errorMessage = "bad";
        // fourthStep.hasError = true;

        console.log("Ding!");
      }
    }, 5);
  }
}
