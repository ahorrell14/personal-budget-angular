import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private budgetData = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  fetchBudgetData(): void {
    if (this.budgetData.value.length === 0) {
      this.http.get('http://localhost:3000/budget')
        .subscribe((res: any) => {
          this.budgetData.next(res.myBudget);
        });
    }
  }
  getBudgetData(): Observable<any[]> {
    return this.budgetData.asObservable();
  }
}
