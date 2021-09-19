import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //todo: change favicon
  //87 pacakges are looking for fundin, run npm fund
  //aliases fro components
  //todo trackbyfn
  // add global styles like gloal media
  // add media query scss functions
  //add logo to header
  //error handling in services
  //restart app handle http params
  // functions descriptions (comments)
  // routing modules description(like function descriptions, look in new_pfa)
  // padding cards on media
  // max-width of cards on media
  title = 'devcom-internet-shop';
  public isSideNavOpened: boolean = false;
  public sideNavRoutes: string[] = ['', 'cart'];
  
  constructor() {

  };

  public onCloseDrawer(): void {
    this.isSideNavOpened = false;
    console.log('drawer closed !')
  };
  public onOpenDrawer(): void {
    this.isSideNavOpened =  true;
    console.log('drawer opened');
  }
}
