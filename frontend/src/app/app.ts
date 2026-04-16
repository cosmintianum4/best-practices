import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [CommonModule, SidebarComponent, RouterOutlet],
})
export class App {
  activeItem: string = 'practices';
}
