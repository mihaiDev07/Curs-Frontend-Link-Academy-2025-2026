import { Component, inject } from '@angular/core';
import { Article } from '../article/article';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Alerta } from '../alerta';

@Component({
  selector: 'app-home',
  imports: [FormsModule, Article, NgIf],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly alertService = inject(Alerta);

  public parentColor: string = 'green';
  public parentMessage: string = 'Mesajul din componenta Home';
  public hideParagraf: boolean = false;

  public myVar: string = 'Hello from Home component';
  protected myStyle: string = 'color: red;font-size: 20px;';
  public myFunction(): void {
    this.myVar = 'Am schimbat mesajul si stilul!';
    this.myStyle = 'color: blue;font-size: 30px;';
  }
  public handleMessageFromChild(message: string): void {
    this.myVar = message;
  }

  public myParagraf(): void {
    this.hideParagraf = !this.hideParagraf;
  }

  public showAlert(msg: string): void {
    this.alertService.showAlert(msg);
  }
}
