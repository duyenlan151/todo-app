import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // isCollapsed: boolean = false;

  @Input() isCollapsed: boolean;
  @Output() onCollapsedEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  handleCollapsed(): void{
    this.onCollapsedEvent.emit();
    // console.log('click icon');
    
  }
}
