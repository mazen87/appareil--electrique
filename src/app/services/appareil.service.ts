import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()

export class AppareilService {
  constructor(private httpClient : HttpClient){}

  appreilsSubject = new Subject <any[]>();
  private  appareils = [];

      emitAppaeilSubject(){
        this.appreilsSubject.next(this.appareils.slice());
      }

      switchOnAll (){
          for(let appareil of this.appareils){
              appareil.status = 'allume';
              this.emitAppaeilSubject();
          }
      }
      switchOffAll (){
        for(let appareil of this.appareils){
            appareil.status = 'éteint';
            this.emitAppaeilSubject();
        }
      }

      switchOnOne(i:number){
          this.appareils[i].status = 'allume';
          this.emitAppaeilSubject();
      }
      switchOffOne(i:number){
          this.appareils[i].status = 'éteint';
          this.emitAppaeilSubject();
      }

      getAppareilById(id: number){
        const appreil = this.appareils.find(
          (s)=>{
            return s.id ===id;
          }
        );
        return appreil;
      }

      addAppareil(name: string, status : string ){
            const appareilObject = {
              id:0,
              name:'',
              status:''
            };

            appareilObject.name = name;
            appareilObject.status = status;
            appareilObject.id = this.appareils[this.appareils.length -1].id+1;  
            this.appareils.push(appareilObject);  
            //this.emitAppaeilSubject();
            this.saveAppareilsToServer();
             
          }

          saveAppareilsToServer ( ) {
            this.httpClient.put('https://appareils-angular-567b9-default-rtdb.firebaseio.com/appareils.json', this.appareils)
            .subscribe(
              ()=>{
                console.log('enregistrement réussi !');
                //this.emitAppaeilSubject(); 
              },
              (error) => {
                console.log('Erreur ! : ' + error );
              }
            )
          }


          getAppareilFromServer(){
            this.httpClient.get<any[]>('https://appareils-angular-567b9-default-rtdb.firebaseio.com/appareils.json')
            .subscribe(
              (response) =>{
                this.appareils = response;
                this.emitAppaeilSubject();
              },
              (error)=>{
                console.log('erreur ! '+ error);
              }
            )
          }
    
}