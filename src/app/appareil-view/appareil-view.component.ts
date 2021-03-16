import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppareilService} from '../services/appareil.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit , OnDestroy {

  isAuth = false;
  appareils: any[];
  appareilSubscription : Subscription;
  dateDeJour = new Promise((resolve,reject)=> {
        const date = new Date();
        setTimeout(()=>{
            resolve(date);
        }, 2000);
  });


  constructor(private appareilService: AppareilService,private router: Router) {} 

  ngOnInit() {
    
    //this.appareils = this.appareilService.appareils;
    this.appareilSubscription = this.appareilService.appreilsSubject.subscribe(
      (appareils :any[])=>{
        this.appareils = appareils;
      }
    );
    
   //this.appareilService.emitAppaeilSubject();
   //this.appareilService.getAppareilFromServer();
  }

  onAllumer(){
   this.appareilService.switchOnAll(); 
 
  }
  onEteindre (){
    if(confirm('êtes vous sûr de vouloir éteindre tous vous appareils ?')){
      this.appareilService.switchOffAll();
    }else{
      return null;
    }
    
  }
  onSave(){
    this.appareilService.saveAppareilsToServer();
  }
  ngOnDestroy () {
    this.appareilSubscription.unsubscribe();
    
  }

  onFetch(){
    this.appareilService.getAppareilFromServer();
  }

}
