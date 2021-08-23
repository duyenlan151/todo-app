import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todolist-list',
  templateUrl: './todolist-list.component.html',
  styleUrls: ['./todolist-list.component.scss']
})
export class TodolistListComponent implements OnInit {

  todos$: Observable<Todo[]>;
  filterTodos$: Observable<Todo[]>;
  constructor(private _todoService: TodoService) { }
  
  ngOnInit(): void {
    this._todoService.fetchFromLocalStorage();
    this.todos$ = this._todoService.todos$;
    this.filterTodos$ = this._todoService.filterTodos$;

  }
  ngOnDestroy(){
  }

}
