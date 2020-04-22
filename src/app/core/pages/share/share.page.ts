import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit {
  linkUrl = 'https://docs.google.com/presentation/d/1rb92zKi6Xj-yZD0EbGGZMvHmOMXcJtlKuUHiETl7VBI/edit#slide=id.g732c3a6fd5_9_87';
  constructor() { }

  ngOnInit() {
  }

  cancel() {

  }

  confirm() {

  }

}
