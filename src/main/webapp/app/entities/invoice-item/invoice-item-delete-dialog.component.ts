import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInvoiceItem } from 'app/shared/model/invoice-item.model';
import { InvoiceItemService } from './invoice-item.service';

@Component({
  selector: 'jhi-invoice-item-delete-dialog',
  templateUrl: './invoice-item-delete-dialog.component.html'
})
export class InvoiceItemDeleteDialogComponent {
  invoiceItem: IInvoiceItem;

  constructor(
    protected invoiceItemService: InvoiceItemService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.invoiceItemService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'invoiceItemListModification',
        content: 'Deleted an invoiceItem'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-invoice-item-delete-popup',
  template: ''
})
export class InvoiceItemDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ invoiceItem }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(InvoiceItemDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.invoiceItem = invoiceItem;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/invoice-item', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/invoice-item', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
