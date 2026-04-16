import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PracticesService {
  private http = inject(HttpClient);
  private readonly BASE_URL = 'http://localhost:3000/practices';

  categories = signal<PracticeCategorySummary[]>([]);
  categoryDetails = signal<Record<string, PracticeCategoryDetails>>({});
  loading = signal(false);
  errorMessage = signal('');

  private openedSlugs = new Set<string>();

  fetchCategories(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.http.get<PracticeCategorySummary[]>(`${this.BASE_URL}/categories`).subscribe({
      next: (categories) => {
        this.categories.set(categories.slice().sort((a, b) => a.orderIndex - b.orderIndex));
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Failed to load categories.');
        this.loading.set(false);
      },
    });
  }

  toggleCategory(slug: string): void {
    if (this.openedSlugs.has(slug)) {
      this.openedSlugs.delete(slug);
      return;
    }

    this.openedSlugs.add(slug);

    if (this.categoryDetails()[slug]) return;

    this.http.get<PracticeCategoryDetails>(`${this.BASE_URL}/categories/${slug}`).subscribe({
      next: (details) => {
        this.categoryDetails.update((prev) => ({ ...prev, [slug]: details }));
      },
    });
  }

  isOpen(slug: string): boolean {
    return this.openedSlugs.has(slug);
  }

  getDetails(slug: string): PracticeCategoryDetails | null {
    return this.categoryDetails()[slug] ?? null;
  }
}
