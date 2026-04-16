import { Component, inject, OnInit } from '@angular/core';
import { PracticesService } from '../../services/practices-service/practices-service';

@Component({
  selector: 'app-practices',
  templateUrl: './practices.component.html',
  styleUrl: './practices.component.scss',
  imports: [],
})
export class PracticesComponent implements OnInit {
  protected practicesService = inject(PracticesService);

  ngOnInit(): void {
    this.practicesService.fetchCategories();
  }

  toggleCategory(slug: string): void {
    this.practicesService.toggleCategory(slug);
  }

  isOpen(slug: string): boolean {
    return this.practicesService.isOpen(slug);
  }

  getDetails(slug: string): PracticeCategoryDetails | null {
    return this.practicesService.getDetails(slug);
  }
}
