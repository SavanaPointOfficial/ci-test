import {Component, Inject,  ViewEncapsulation, ViewChild,  LOCALE_ID, DoCheck, OnInit, ElementRef} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CallDialogComponent } from '../call-dialog/call-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('days')
  days!: ElementRef;
  @ViewChild('hours')
  hours!: ElementRef;
  @ViewChild('minutes')
  minutes!: ElementRef;
  @ViewChild('seconds')
  seconds!: ElementRef;
  @ViewChild('headline')
  headline!: ElementRef;
  @ViewChild('countdown')
  countdown!: ElementRef;
  @ViewChild('content')
  content!: ElementRef;


  animal!: string;
  name!: string;
  public newsLetter!: FormGroup;
  constructor(
    public dialog: MatDialog,
    private forB: FormBuilder,
    private http: HttpClient,
    private afs: AngularFirestore,
    private toastr: ToastrService
  ) { }
  ngOnInit() {
    this.countDown()
    throw new Error('Method not implemented.');

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CallDialogComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

 
  countDown() {

    const second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24;

    let birthday = "May 14, 2021 00:00:00",
        countDown = new Date(birthday).getTime(),
        x = setInterval(() => {

          let now = new Date().getTime(),
              distance = countDown - now;

              this.days.nativeElement.innerText = Math.floor(distance / (day)),
          this.hours.nativeElement.innerText = Math.floor((distance % (day)) / (hour)),
            this.minutes.nativeElement.innerText = Math.floor((distance % (hour)) / (minute)),
            this.seconds.nativeElement.innerText = Math.floor((distance % (minute)) / second);

          //do something later when date is reached
          if (distance < 0) {
            let headline = this.headline,
                countdown = this.countdown,
                content = this.content;

            headline.nativeElement.innerText = "It's my birthday!";
            countdown.nativeElement.style.display = "none";
            content.nativeElement.style.display = "block";

            clearInterval(x);
          }
          //seconds
        }, 0)

}
}
