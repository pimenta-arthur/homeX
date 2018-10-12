import { NgModule } from "@angular/core";
import { DevicesComponent } from "./components/devices/devices.component";
import { DevicesService } from "./shared/devices.service";
import { DeviceDialogFabComponent } from "./components/device-dialog-fab/device-dialog-fab.component";
import {
  MatButtonModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule
} from "@angular/material";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatListModule
  ],
  declarations: [DevicesComponent, DeviceDialogFabComponent],
  entryComponents: [DeviceDialogFabComponent],
  providers: [DevicesService]
})
export class DevicesModule {}
