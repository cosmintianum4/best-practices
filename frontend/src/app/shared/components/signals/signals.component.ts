import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { SignalsService } from '../../services/signals-service/signals-service';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.scss',
  imports: [CommonModule],
})
export class SignalsComponent {
  protected readonly signalsService = inject(SignalsService);

  activeTab = signal<'topics' | 'quiz' | 'analogies'>('topics');
  searchTerm = signal('');
  expandedIndex = signal<number | null>(null);
  selectedAnswers = signal<Record<number, number>>({});
  revealedQuizzes = signal<Record<number, boolean>>({});

  filteredTopics = computed(() =>
    this.signalsService
      .topics()
      .filter((t) => t.title.toLowerCase().includes(this.searchTerm().toLowerCase())),
  );

  constructor() {
    effect(() => {
      console.log('[Signals] active tab:', this.activeTab());
    });
  }

  ngOnInit(): void {
    this.signalsService.loadTopics();
    this.signalsService.loadQuizzes();
  }

  selectTab(tab: 'topics' | 'quiz' | 'analogies'): void {
    this.activeTab.set(tab);
  }

  updateSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  toggle(index: number): void {
    this.expandedIndex.set(this.expandedIndex() === index ? null : index);
  }

  isExpanded(index: number): boolean {
    return this.expandedIndex() === index;
  }

  selectAnswer(quizIndex: number, optionIndex: number): void {
    this.selectedAnswers.update((prev) => ({ ...prev, [quizIndex]: optionIndex }));
  }

  revealExplanation(quizIndex: number): void {
    this.revealedQuizzes.update((prev) => ({ ...prev, [quizIndex]: true }));
  }

  isAnswered(quizIndex: number): boolean {
    return this.selectedAnswers()[quizIndex] !== undefined;
  }

  isCorrect(quizIndex: number): boolean {
    return (
      this.selectedAnswers()[quizIndex] === this.signalsService.quizzes()[quizIndex]?.correctIndex
    );
  }
}
