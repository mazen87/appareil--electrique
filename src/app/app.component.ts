import { Component, OnDestroy, OnInit } from '@angular/core';
import { rejects } from 'assert';
import { AppareilService } from './services/appareil.service';
import { Observable, Subscription } from 'rxjs';
import { interval } from 'rxjs';  


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit , OnDestroy  {
  
  secondes : Number;
  counterSubscription : Subscription;
  ngOnInit(){
    const counter = interval(1000);
    this.counterSubscription = counter.subscribe(
      (value)=>{
        this.secondes = value;
      },

      (error)=>{
        console.log("une erreur est suvenu ! "+ error );
      },
      ()=>{
        console.log("obsevable complete!");
      }
    )
  }

  ngOnDestroy(){
    this.counterSubscription.unsubscribe();
  }
  
}
