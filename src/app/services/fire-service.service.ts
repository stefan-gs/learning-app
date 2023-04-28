import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { User } from '@angular/fire/auth';
import { collection } from '@angular/fire/firestore';
import { Task } from '../interfaces/Task';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


@Injectable({
  providedIn: 'root',
})
export class FireServiceService {
  userCollection: AngularFirestoreCollection = {} as AngularFirestoreCollection;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {
    this.setCollection();
  }

  public setCollection(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.authService.authState.subscribe(async (user) => {
        if (user !== null) {
          const userEmail = user.email?.toLocaleLowerCase();
          this.userCollection = this.firestore.collection(
            `users/${userEmail}/tasks`
          );
          console.log(userEmail);
          resolve(true);
        }
      });
    });
  }

  addTask(task: Task) {
    const timestamp = firebase.firestore.Timestamp.now();
    this.userCollection.add({
      title: task.title,
      status: task.status,
      userAnswer: '',
      aiAnswer:'',
      grade: '',
      createdAt: timestamp
    });
  }

  updateTaskStatus(id: string, newStatus: boolean) {
    this.userCollection.doc(id).update({ status: !newStatus });
  }


  updateTask (id:string, aiMessage:string, userMessage:string, aiGrade:number) {
    this.userCollection.doc(id).update({
      userAnswer:userMessage,
      aiAnswer:aiMessage,
      grade:aiGrade
    })
  }

  deleteTask(id: string) {
    this.userCollection.doc(id).delete();
  }
}
