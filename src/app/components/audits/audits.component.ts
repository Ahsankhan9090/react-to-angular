import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api-service.service';

interface Audit {
  id: number;
  event: string;
  status: string;
  message: string;
  user_id: number;
  created_at: string;
}

@Component({
  selector: 'app-audits',
  templateUrl: './audits.component.html',
  styleUrls: ['./audits.component.scss']
})
export class AuditsComponent {
  audits: Audit[] = [];
  pagination = {
    currentPage: 1,
    perPage: 10,
  };
  filters = {
    message: '',
  };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchAudits();
  }

  handleChangePage(newPage: number): void {
    this.pagination.currentPage = newPage;
  }

  handleFilterMessageChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.filters.message = target.value;
  }

  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.audits.length / this.pagination.perPage);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  getVisibleAudits(): any[] {
    const startIndex = (this.pagination.currentPage - 1) * this.pagination.perPage;
    const endIndex = this.pagination.currentPage * this.pagination.perPage;
    return this.audits.slice(startIndex, endIndex);
  }

  fetchAudits(): void {
    this.apiService.post('/api/audits', {
      q: {
        filters: this.filters
      }
    }).subscribe(
      (res: any) => {
        this.audits = res;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
