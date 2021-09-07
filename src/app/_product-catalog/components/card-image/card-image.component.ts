import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.scss']
})
export class CardImageComponent implements OnInit {
  @Input() public imageUrl: string;
  @Input() public alt_text: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
