import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RoomsService } from "./shared/rooms.service";
import { RoomsComponent } from "./components/rooms/rooms.component";

@NgModule({
  imports: [CommonModule],
  declarations: [RoomsComponent],
  providers: [RoomsService]
})
export class RoomsModule {}
