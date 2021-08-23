import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../models/filtering.model';
import { Todo } from '../models/todo.model';
import { LocalStorageService } from './local-storage.service';
import lodash from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private static readonly TodoStorageKey = 'todos';

  private todos: Todo[] = [];
  private filterTodos: Todo[];

  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);// bắt dầu giá trị 0
  private displayTodoSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]); // bất đầu là 1 mảng rỗng, theo dỡi filter todo
  private displayFilterTodo: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]); // bất đầu là 1 mảng rỗng, theo dỡi filter todo

  private currentFilter: Filter = Filter.All;

  todos$: Observable<Todo[]> = this.displayTodoSubject.asObservable();
  length$: Observable<number> = this.lengthSubject.asObservable();
  filterTodos$: Observable<Todo[]> = this.displayFilterTodo.asObservable();

  constructor(private storageService: LocalStorageService) { }

  fetchFromLocalStorage(){
    this.todos = this.storageService.getObject(TodoService.TodoStorageKey);
    // this.filterTodos = [...this.todos.map(todo => ({...todo}))];
    this.filterTodos = [...this.todos];
    this.updateTodosData();
  }

  updateLocalStorage(): void{
    this.storageService.setObject(TodoService.TodoStorageKey, this.todos);
  }

  filterTodo(filter: Filter, isFiltering: boolean){
    this.currentFilter = filter;
    // console.log(filter);

    switch (filter) {
      case Filter.Active:
        this.filterTodos = this.todos.filter(todo => !todo.isComplete);
        break;
      case Filter.Completed:
        this.filterTodos = this.todos.filter(todo => todo.isComplete);
        break;
      case Filter.All:
        this.filterTodos = [...this.todos.map(todo => ({...todo}))];
        break;
    }
    // if(isFiltering){
      this.updateTodosData(this.filterTodos);
    // }
  }

  private updateTodosData(data? : any){
    // console.log('update data');

    if(data){
      this.displayTodoSubject.next(data);
      this.lengthSubject.next(data.length);
    }else{
      this.displayTodoSubject.next(this.todos);
      this.lengthSubject.next(this.todos.length);
    }
    this.updateLocalStorage();
  }
  getTodos(){
    return this.todos$;
  }

  addTodo(content: string, id?: any, isComplete?: boolean){
    if(id){
      let index = lodash.findIndex(this.todos, {id: id});
      this.todos[index].content = content;
      this.todos[index].isComplete = isComplete;
    }else{
      const date = new Date(Date.now()).getTime();
      const newTodo = new Todo(date, content);
      this.todos.unshift(newTodo);
    }
    this.updateTodosData();
    //this.updateLocalStorage();
  }
  deleteTodo(id: number){
    let index = lodash.findIndex(this.todos, {id: id});
    this.todos.splice(index, 1);
    this.updateTodosData();
  }
}
