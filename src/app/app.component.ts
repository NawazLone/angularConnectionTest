

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isConnected: Observable<boolean>;
  currentState: Boolean = true
  previousState: Boolean = true

  constructor(private _snackBar: MatSnackBar) {
    this.isConnected = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').map(() => true),
      Observable.fromEvent(window, 'offline').map(() => false));
    this.isConnected.subscribe((value) => {
      this.currentState = value
      this.checkNetwork()

    });
  }

  checkNetwork() {
    console.log('insode newtowrk fn')

    if (!this.currentState) {
      const msg = `You are offline. Please check your internet connection.`
      this._snackBar.open(msg, '', {
        duration: 10000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['network-error-snackbar'],
      });
    }
    if (this.currentState && !this.previousState) {
      this._snackBar.open('Connection has resumed. You can now proceed.', '', {
        duration: 10000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['network-success-snackbar'],
      });
    }
    this.previousState = this.currentState;
  }

  ngOnInit() {

  }
}
