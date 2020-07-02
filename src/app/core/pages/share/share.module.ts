import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharePageRoutingModule } from './share-routing.module';
import { SharePage } from './share.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharePageRoutingModule,
    TranslateModule,
  ],
  declarations: [SharePage],
  entryComponents: [SharePage],
})
export class SharePageModule { }
