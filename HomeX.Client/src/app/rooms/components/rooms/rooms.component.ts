import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../shared/rooms.service';
import { IRoom } from '../../shared/room';
import { IDevice } from '../../../devices/shared/device';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  rooms: IRoom[];
  displayedColumns: string[] = ['rooms', 'devices'];
  dataSource: MatTableDataSource<IRoom>;

  constructor(private roomsService: RoomsService) {}

  ngOnInit() {
    this.roomsService.getRooms.subscribe(data => {
      this.rooms = data;

      this.dataSource = new MatTableDataSource(this.rooms);
    });
  }

  openDialog(): void {
    // bla
  }

  removeRoom(room: IRoom): void {
    this.roomsService.removeRoom(room);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
