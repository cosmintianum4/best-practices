import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { SignalsTopic } from '../../models/signals/signals-topic.model';
import { SignalsQuiz } from '../../models/signals/signals-quiz.model';

@Injectable({
  providedIn: 'root',
})
export class SignalsService {
  private http = inject(HttpClient);
  private readonly BASE_URL = 'http://localhost:3000/signals';

  topics = signal<SignalsTopic[]>([]);
  quizzes = signal<SignalsQuiz[]>([]);
  loading = signal(false);

  loadTopics() {
    this.loading.set(true);
    this.http.get<SignalsTopic[]>(`${this.BASE_URL}/topics`).subscribe({
      next: (topics) => {
        this.topics.set(topics);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  loadQuizzes() {
    this.http.get<SignalsQuiz[]>(`${this.BASE_URL}/quizzes`).subscribe({
      next: (quizzes) => this.quizzes.set(quizzes),
    });
  }
}
