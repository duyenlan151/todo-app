import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-todolist-item',
  templateUrl: './todolist-item.component.html',
  styleUrls: ['./todolist-item.component.scss']
})
export class TodolistItemComponent{
  isHovered = false;
  isEditing = false;
  contentInput: string;
  @Input() todo: Todo;

  constructor(
    private _todoService: TodoService,
    private notification: NzNotificationService
    ) { }

  ngOnInit(): void {
    this.contentInput = this.todo.content;
  }
  submitEdit(event?: boolean){
    if(!this.todo.content.trim()){
      this.createBasicNotification('warning', `Your content not empty`);
      return;
    }
    
    this.createBasicNotification('success', 'Edit success');
    this.isEditing = this.isEditing ? !this.isEditing : this.isEditing;
    this._todoService.addTodo(this.todo.content, this.todo.id, this.todo.isComplete);
  }
  onDelete(todo: any){
    this.createBasicNotification('warning', `You has deleted ${todo.content}`);
    this._todoService.deleteTodo(todo.id);

  }
  createBasicNotification(type: string, content: string): void {
    this.notification.create(
      type,
      content,
      '',
      {
        nzDuration: 2500
      }
    );
  }
}
