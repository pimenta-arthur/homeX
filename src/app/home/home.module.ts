import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./components/home/home.component";
import { HomeDialogFabComponent } from "./components/home-dialog-fab/home-dialog-fab.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import {
  MatListModule,
  MatCardModule,
  MatGridListModule,
  MatDividerModule,
  MatSlideToggleModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule
} from "@angular/material";
import { LayoutModule } from "@angular/cdk/layout";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule
  ],
  declarations: [HomeComponent, HomeDialogFabComponent, DashboardComponent],
  entryComponents: [HomeDialogFabComponent],
  providers: []
})
export class HomeModule {}
