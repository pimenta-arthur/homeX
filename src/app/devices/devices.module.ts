import { NgModule } from "@angular/core";
import { DevicesComponent } from "./components/devices/devices.component";
import { DevicesService } from "./shared/devices.service";

@NgModule({
  imports: [],
  declarations: [DevicesComponent],
  providers: [DevicesService]
})
export class DevicesModule {}
