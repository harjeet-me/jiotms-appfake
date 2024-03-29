import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEquipment } from 'app/shared/model/equipment.model';
import { EquipmentService } from './equipment.service';

@Component({
  selector: 'jhi-equipment-delete-dialog',
  templateUrl: './equipment-delete-dialog.component.html'
})
export class EquipmentDeleteDialogComponent {
  equipment: IEquipment;

  constructor(protected equipmentService: EquipmentService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.equipmentService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'equipmentListModification',
        content: 'Deleted an equipment'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-equipment-delete-popup',
  template: ''
})
export class EquipmentDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ equipment }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EquipmentDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.equipment = equipment;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/equipment', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/equipment', { outlets: { popup: null } }]);
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
