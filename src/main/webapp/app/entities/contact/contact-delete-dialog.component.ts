import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContact } from 'app/shared/model/contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'jhi-contact-delete-dialog',
  templateUrl: './contact-delete-dialog.component.html'
})
export class ContactDeleteDialogComponent {
  contact: IContact;

  constructor(protected contactService: ContactService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.contactService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'contactListModification',
        content: 'Deleted an contact'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-contact-delete-popup',
  template: ''
})
export class ContactDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ contact }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ContactDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.contact = contact;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/contact', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/contact', { outlets: { popup: null } }]);
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
