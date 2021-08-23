import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistInputComponent } from './todolist-input.component';

describe('TodolistInputComponent', () => {
  let component: TodolistInputComponent;
  let fixture: ComponentFixture<TodolistInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodolistInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
