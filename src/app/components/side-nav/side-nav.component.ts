import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input()  public isOpened:  boolean  = false;
  @Input()  public routes:    string[] = [];
  @Output() public onChanged: EventEmitter<void> = new EventEmitter<void>()
  
  constructor() { }

  ngOnInit(): void {
  }
  public onSideNavClose(): void {
    this.onChanged.emit();
  }
}
