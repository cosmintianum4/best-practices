import { inject, Injectable, signal } from '@angular/core';
import { NgrxTopic } from '../../models/ngrx/ngrx-topic.model';
import { NgrxQuiz } from '../../models/ngrx/ngrx-quiz.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NgrxService {
  private http = inject(HttpClient);
  private readonly BASE_URL = 'http://localhost:3000/ngrx';

  quizzes = signal<NgrxQuiz[]>([]);

  loadQuizzes() {
    this.http.get<NgrxQuiz[]>(`${this.BASE_URL}/quizzes`).subscribe({
      next: (quizzes) => this.quizzes.set(quizzes),
    });
  }
}
