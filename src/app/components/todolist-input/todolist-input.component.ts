import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-todolist-input',
  templateUrl: './todolist-input.component.html',
  styleUrls: ['./todolist-input.component.scss']
})
export class TodolistInputComponent implements OnInit {

  todoContent = '';

  constructor(
    private todoService: TodoService,
    private notification: NzNotificationService
    ) { }

  ngOnInit(): void {
    this.todoContent = '';
  }
  changeContent(value: string): void{
    this.todoContent = value;
  }
  onSubmit(){
    if(!this.todoContent.trim()){
      return false;
    }
    this.createBasicNotification('success', `You has added ${this.todoContent}`);
    this.todoService.addTodo(this.todoContent);
    this.todoContent = '';
  }
  createBasicNotification(type: string, content: string): void {
    this.notification.create(
      type,
      content,
      '',
      {
        nzDuration: 1000
      }
    );
  }
}
