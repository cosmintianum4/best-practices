import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RxjsService {
  private http = inject(HttpClient);

  topics = signal<RxjsTopic[]>([]);
  quizzes = signal<RxjsQuiz[]>([]);
  loading = signal(false);

  private readonly BASE_URL = 'http://localhost:3000/rxjs';

  loadTopics() {
    this.loading.set(true);
    this.http.get<RxjsTopic[]>(`${this.BASE_URL}/topics`).subscribe({
      next: (topics) => {
        this.topics.set(topics);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  loadQuizzes() {
    this.http.get<RxjsQuiz[]>(`${this.BASE_URL}/quizzes`).subscribe({
      next: (quizzes) => this.quizzes.set(quizzes),
    });
  }
}
