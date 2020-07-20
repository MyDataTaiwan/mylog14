import { Component, OnInit } from '@angular/core';

import { UploadService } from '@core/services/upload.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit {

  constructor(
    private readonly uploadService: UploadService,
  ) { }

  ngOnInit() {
  }

  onUploadButtonClicked() {
    this.uploadService.upload().subscribe();
  }

}
