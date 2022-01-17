import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rest-web';
  displayedColumns: string[] = ['name', 'code', 'city', 'type', 'currency'];
  dataSource = [];
  isShown: boolean = false ;
  constructor(private httpClient: HttpClient, public dialog: MatDialog) {}

  ngOnInit() {
  }

  searchHotels() {
    let hotelRequest = {
      "city": "Athens",
      "hotelName": "Athenian Homes",
      "checkInDate": "2022-01-18"
    }
    //this.httpClient.get("http://localhost:8081/getHotelDetails/ATHENHOMES").subscribe((data: any[])=> {  
    this.httpClient.post("http://localhost:8081/searchHotels", hotelRequest).subscribe((data: any[])=> {
        console.log(data);
        this.dataSource = data;
        this.isShown = true ;
      })
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '250px',
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  fetchHotelDetails() {
    
    this.httpClient.get("http://localhost:8081/getHotelDetails/ATHENHOMES").subscribe((data: any[])=> {
        console.log("ATHENHOMES: ", data);
        this.openDialog(data);
      })
  }
}

export interface PeriodicElement {
  name: string;
  code: string;
  city: string;
  type: string;
  currency: string;
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {
  constructor( public dialogRef: MatDialogRef<DialogElementsExampleDialog>, @Inject(MAT_DIALOG_DATA) public data ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}