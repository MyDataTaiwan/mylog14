import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PopoverController } from '@ionic/angular';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import {
  PopoverButtonSet, PopoverIcon,
} from '@shared/services/popover.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  @Input() i18nTitle: string;
  @Input() icon?: PopoverIcon;
  @Input() i18nMessage?: string;
  @Input() i18nExtraMessage?: string;
  @Input() buttonSet?: PopoverButtonSet;
  @Input() dataOnConfirm?: {};
  @Input() dataOnCancel?: {};
  public iconPath: string;
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  @Input() formModel?: {};
  @Input() formFields?: FormlyFieldConfig[];

  constructor(
    private readonly popoverCtrl: PopoverController,
  ) { }

  ngOnInit() {
    this.iconPath = this.getIconPath(this.icon);
  }

  confirm(): void {
    this.popoverCtrl.dismiss(this.dataOnConfirm);
  }

  cancel(): void {
    this.popoverCtrl.dismiss(this.dataOnCancel);
  }

  submit(): void {
    if (this.form.valid) {
      this.popoverCtrl.dismiss(this.formModel);
    }
  }

  getIconPath(icon: PopoverIcon): string {
    return `../../../../assets/alert/Alert_icon_${icon}.svg`;
  }

}
