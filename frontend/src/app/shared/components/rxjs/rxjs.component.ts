import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  concatMap,
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  from,
  map,
  mergeMap,
  of,
  shareReplay,
  tap,
  toArray,
} from 'rxjs';
import { RxjsService } from '../../services/rxjs-service/rxjs-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.scss',
  imports: [CommonModule, ReactiveFormsModule],
})
export class RxjsComponent {
  protected readonly rxjsService = inject(RxjsService);

  activeTab = signal<'topics' | 'quiz' | 'analogies'>('topics');
  expandedIndex: number | null = null;
  selectedAnswers: any = {};
  revealedQuizzes: any = {};

  searchTerm = signal('');

  filteredTopics = computed(() =>
    this.rxjsService.topics().filter((t) => t.title.toLowerCase().includes(this.searchTerm())),
  );

  ngOnInit(): void {
    this.rxjsService.loadTopics();
    this.rxjsService.loadQuizzes();
  }

  selectTab(tab: any): void {
    this.activeTab = tab;
  }

  updateSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  toggle(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  isExpanded(index: number): boolean {
    return this.expandedIndex === index;
  }

  selectAnswer(quizIndex: any, optionIndex: any): void {
    this.selectedAnswers[quizIndex] = optionIndex;
  }

  revealExplanation(quizIndex: any): void {
    this.revealedQuizzes[quizIndex] = true;
  }

  isAnswered(quizIndex: any): boolean {
    return this.selectedAnswers[quizIndex] !== undefined;
  }

  isCorrect(quizIndex: any): boolean {
    return this.selectedAnswers[quizIndex] === this.rxjsService.quizzes()[quizIndex].correctIndex;
  }
}
