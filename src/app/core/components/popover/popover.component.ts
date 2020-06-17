import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverButtonSet, PopoverIcon } from '../../services/popover.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  @Input() i18nTitle: string;
  @Input() icon: PopoverIcon;
  @Input() i18nMessage?: string;
  @Input() i18nExtraMessage?: string;
  @Input() buttonSet?: PopoverButtonSet;
  @Input() onConfirm?: () => {};
  @Input() onCancel?: () => {};
  public iconPath: string;

  constructor(
    private popoverCtrl: PopoverController,
  ) { }

  ngOnInit() {
    this.iconPath = this.getIconPath(this.icon);
  }

  confirm(): void {
    if (this.onConfirm) {
      this.onConfirm();
    }
    this.popoverCtrl.dismiss();
  }

  cancel(): void {
    if (this.onCancel) {
      this.onCancel();
    }
    this.popoverCtrl.dismiss();
  }

  getIconPath(icon: PopoverIcon): string {
    return `../../../../assets/alert/Alert_icon_${icon}.svg`;
  }

}
