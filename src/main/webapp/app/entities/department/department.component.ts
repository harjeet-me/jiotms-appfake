import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IDepartment } from 'app/shared/model/department.model';
import { DepartmentService } from './department.service';

@Component({
  selector: 'jhi-department',
  templateUrl: './department.component.html'
})
export class DepartmentComponent implements OnInit, OnDestroy {
  departments: IDepartment[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected departmentService: DepartmentService,
    protected eventManager: JhiEventManager,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.departmentService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IDepartment[]>) => (this.departments = res.body));
      return;
    }
    this.departmentService.query().subscribe((res: HttpResponse<IDepartment[]>) => {
      this.departments = res.body;
      this.currentSearch = '';
    });
  }

  search(query) {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.loadAll();
  }

  clear() {
    this.currentSearch = '';
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInDepartments();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDepartment) {
    return item.id;
  }

  registerChangeInDepartments() {
    this.eventSubscriber = this.eventManager.subscribe('departmentListModification', () => this.loadAll());
  }
}
