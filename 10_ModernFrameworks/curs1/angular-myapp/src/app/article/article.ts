import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  imports: [],
  templateUrl: './article.html',
  styleUrl: './article.css',
})
export class Article implements OnInit {
  @Input() public parentColor: string = '';
  @Input() public parentMessage: string = '';
  @Output() public messageFromChild = new EventEmitter<string>();

  public myColor: string = 'red';

  ngOnInit(): void {
    // Initialization logic if needed
    console.log('Article component initialized with parentColor:', this.parentColor);
    console.log('Article component initialized with parentMessage:', this.parentMessage);
    if (this.parentColor) {
      this.myColor = this.parentColor; // Use the provided color
    }
    if (!this.parentMessage) {
      this.parentMessage = 'No message provided'; // Default message if not provided
    }
  }
  public sendMessageParrent(): void {
    this.messageFromChild.emit('Mesajul trimis de la componenta Article!!!!!!');
  }
}
