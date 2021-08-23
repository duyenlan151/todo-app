import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Filter, FilterButton } from 'src/app/models/filtering.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  Filterbuttons: FilterButton[] = [
    {type: Filter.All, label: 'filter-btn.all', isAtive: true},
    {type: Filter.Active, label: 'filter-btn.active', isAtive: false},
    {type: Filter.Completed, label: 'filter-btn.completed', isAtive: false},
  ]

  length = 0;
  destroy$: Subject<null> = new Subject<null>();
  constructor(private _todoService: TodoService) { }

  ngOnInit(): void {
    this._todoService.length$.pipe(takeUntil(this.destroy$)).subscribe(length => {
      this.length = length;
    })
  }

  filterTodos(type: Filter){
    this.setActiveFilterBtn(type);
    this._todoService.filterTodo(type, true);
  }
  private setActiveFilterBtn(type: Filter){
    this.Filterbuttons.forEach(btn => {
      btn.isAtive = btn.type === type;
    });
  }
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
