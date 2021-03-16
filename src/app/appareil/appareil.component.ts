import { Component, Input, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {
  @Input() appareilName: string;
  @Input() appareilStatus: string;
  @Input() indexElement: number;
  @Input() id: number;
  
  

  constructor(private appareilService: AppareilService) { }

  ngOnInit(): void {
  }

  getStatus (){
    return this.appareilStatus;
  }
  
  getColor(){
    if(this.appareilStatus==="allume"){
      return "green";
    }else if (this.appareilStatus==="éteint"){
      return "red";
    }

  }
  
  onSwitch () {
    if(this.appareilStatus === 'allume'){
      this.appareilService.switchOffOne(this.indexElement);
    }else if (this.appareilStatus==='éteint'){
      this.appareilService.switchOnOne(this.indexElement);
    }
  }


}
