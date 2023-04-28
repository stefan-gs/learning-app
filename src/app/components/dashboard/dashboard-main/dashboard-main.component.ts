import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from 'src/app/services/chat.service';
import { FireServiceService } from 'src/app/services/fire-service.service';
import { map} from 'rxjs/operators';
@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css']
})
export class DashboardMainComponent implements OnInit {
  tasks: any[] = [];
  gptMessage: string = '';
  userMessages: string[] = [];
  grade: number = 0;
  searchText:string = '';
  progressBarCheck:boolean;
  
 

  chatReplies:any = {};


  constructor(private fireService: FireServiceService, private chatService:ChatServiceService) {
    this.progressBarCheck = false;

  }

  ngOnInit(): void {
    this.fireService.setCollection()
      .then(res => {
        if (res) {
          this.fireService.userCollection.valueChanges({ idField: 'id' })
            .pipe(
              map(items => {
                console.log(items)
                return items.sort((a, b) => b['createdAt'].toDate() - a['createdAt'].toDate());
              })
            )
            .subscribe(sortedItems => {
              this.tasks = sortedItems;
              console.log(sortedItems)
            });
        }
      })
      .catch(error => {
        console.log(error)
      });
  }

  onDeleteTask(id:string) {
    this.fireService.deleteTask(id);
  }

  onMarkCompleted (id:string, status:boolean) {
    this.fireService.updateTaskStatus(id, status)
  }

  
  async onCheckAnswer(question:string,answer:string,id:string): Promise<void> {
    this.progressBarCheck = true;
    let prompt = `You are an experienced software engineer and a professor at a university. One of your student has been tasked to explain a programming question like they would explain to a 12 year old. The student is trying to learn programming using the Feynman technique. Your task is to check if the student understood the concept and if they have explained it correctly. Here's the response from the student: question = {${question}}, answer= {${answer}}. Please provide feedback to the student. Answer like you are speaking directly with the student. Your answer should start with a grade from 1 to 10, followed by a colon, followed by your feedback. For example: 5: {your feedback goes here}. Be as strict as possible when grading and provide detailed feedback. Do not give high grades unless the student has completely understood the whole topic and has given a proper explanation of the topic. The student can pass only if he receives a score of 7 or higher. Message from the dean of the university: only the best students should pass. If a 12 year old can't understand the explanation, don't give a pass grade. `
    this.gptMessage = await this.chatService.chatWithGPT(prompt)
    this.progressBarCheck = false; // todo --set progressBarCheck as a task property so it only shows for individual li
    const str = this.gptMessage.substring(2);
    console.log(this.gptMessage);
    this.grade = parseInt(this.gptMessage.split(':')[0]);
    console.log(this.grade)
    this.fireService.updateTask(id,str, answer, this.grade)
    
  }



}
