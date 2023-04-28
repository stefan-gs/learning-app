import { Component } from '@angular/core';
import { FireServiceService } from 'src/app/services/fire-service.service';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.css']
})
export class QuestionModalComponent {

  constructor(private fireService: FireServiceService) {}

  onClick(inputval:string){
    if(inputval){
      this.fireService.addTask({
        title: inputval,
        status: false
      })
    }
  }

}
