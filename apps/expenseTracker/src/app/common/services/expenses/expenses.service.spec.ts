import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ExpensesService } from './expenses.service';

describe('ExpensesService', () => {
  let service: ExpensesService;

  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ExpensesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should map and paginate expenses list', () => {
    const sample = [
      { category: 'a', amount: 1, date: '2025-09-02', receipt: null },
      { category: 'b', amount: 1, date: '2025-09-01', receipt: null },
    ] as any[];
    let resp: any;
    service.getExpenses(1, 1).subscribe((r) => (resp = r));
    const req = httpMock.expectOne(() => true);
    req.flush(sample);
    expect(resp.data.length).toBe(1);
    expect(resp.meta.total).toBe(2);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
