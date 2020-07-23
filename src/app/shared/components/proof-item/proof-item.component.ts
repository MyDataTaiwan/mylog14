import {
  Component, Input, OnChanges, OnInit, SimpleChanges,
} from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { ProofStatus } from '@core/enums/proof-status.enum';

@Component({
  selector: 'app-proof-item',
  templateUrl: './proof-item.component.html',
  styleUrls: ['./proof-item.component.scss'],
})
export class ProofItemComponent implements OnInit, OnChanges {
  @Input() status: ProofStatus;

  proofStatus = ProofStatus;
  private readonly display = new BehaviorSubject<ProofDisplay>(this.getProofDisplay(ProofStatus.LOADING));
  display$: Observable<ProofDisplay> = this.display;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    this.display.next(this.getProofDisplay(changes.status.currentValue as ProofStatus));
  }

  private getProofDisplay(status: ProofStatus): ProofDisplay {
    switch (status) {
      case ProofStatus.LOADING:
        return {
          icon: 'shield-outline',
          color: 'black',
        };
      case ProofStatus.COMPLETE:
        return {
          icon: 'shield-checkmark-outline',
          color: 'primary',
        };
      default:
        return {
          icon: 'alert-circle-outline',
          color: 'danger',
        };
    }
  }
}

interface ProofDisplay {
  icon: string;
  color: string;
}
