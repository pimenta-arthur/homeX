import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DeviceType, IDeviceType } from "../../shared/device-type";
import { IDevice } from "../../shared/device";

@Component({
  selector: "app-device-dialog-fab",
  templateUrl: "./device-dialog-fab.component.html",
  styleUrls: ["./device-dialog-fab.component.scss"]
})
export class DeviceDialogFabComponent implements OnInit {
  isLinear = true;
  isEditable = true;
  isDeviceFound = true;
  secondsToPermitJoining = 1;
  firstFormGroup: FormGroup;
  newDeviceName = "";
  newDeviceType: IDeviceType = {name: "", icon: ""};
  newDevice: IDevice = {name: this.newDeviceName, type: this.newDeviceType};
  deviceOptions: IDeviceType[];
  value = 0;
  labelFourthStep = "Done";

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required]
    });

    this.deviceOptions = DeviceType.getTypes();
  }

  selectDeviceOption(selectedOption, options) {
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

        // check if device was found
        this.checkIfWasFound();

        // move to fourth step
        stepper.next();

        console.log("Ding!");
      }
    }, 5);
  }

  checkIfWasFound() {
    if (true) {
      this.newDevice = {
        name: this.newDeviceName,
        type: this.newDeviceType
      };

      this.labelFourthStep = "Congratulations";
      this.isDeviceFound = true;
    } else {
      this.labelFourthStep = "Ops!";
      this.newDevice = null;
      this.isDeviceFound = false;
    }
  }
}
