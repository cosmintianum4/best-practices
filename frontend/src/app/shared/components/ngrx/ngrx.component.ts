import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadTopics } from '../../stores/ngrx/ngrx.actions';
import { selectAllTopics, selectLoading } from '../../stores/ngrx/ngrx.selectors';
import { NgrxService } from '../../services/ngrx-service/ngrx-service';

@Component({
  selector: 'app-ngrx',
  templateUrl: './ngrx.component.html',
  styleUrl: './ngrx.component.scss',
  imports: [CommonModule],
})
export class NgrxComponent implements OnInit {
  private store = inject(Store);
  protected ngrxService = inject(NgrxService);

  topics = this.store.selectSignal(selectAllTopics);
  loading = this.store.selectSignal(selectLoading);

  activeTab = signal<'concepts' | 'flow' | 'quiz' | 'analogies'>('concepts');
  expandedIndex = signal<number | null>(null);
  selectedAnswers = signal<Record<number, number>>({});
  revealedQuizzes = signal<Record<number, boolean>>({});

  ngOnInit(): void {
    this.store.dispatch(loadTopics());
    this.ngrxService.loadQuizzes();
  }

  selectTab(tab: 'concepts' | 'flow' | 'quiz' | 'analogies'): void {
    this.activeTab.set(tab);
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
      this.selectedAnswers()[quizIndex] === this.ngrxService.quizzes()[quizIndex]?.correctIndex
    );
  }
}
