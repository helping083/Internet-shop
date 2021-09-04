import { Component, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {
  @Output() public showSideNav: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('sideNavButton', { read: ElementRef }) private sideNavButton: ElementRef<HTMLElement>;
  
  constructor() {
  }
  
  public onShowSideNav(): void {
    this.showSideNav.emit();
    this.sideNavButton.nativeElement.blur();
  }
}
