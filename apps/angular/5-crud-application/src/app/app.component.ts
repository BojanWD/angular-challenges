import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from './model/todo';

@Component({
  imports: [],
  selector: 'app-root',
  template: `
    @for (todo of todos; track todo.id) {
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);

  todos!: Todo[];

  ngOnInit(): void {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => {
        console.log(todos);
        this.todos = todos;
      });
  }

  update(todo: Todo) {
    this.http
      .put<any>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .subscribe((todoUpdated: Todo) => {
        this.todos[todoUpdated.id - 1] = todoUpdated;
      });
  }
}
