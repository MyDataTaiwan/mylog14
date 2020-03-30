import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-symptom-detail',
  templateUrl: './symptom-detail.page.html',
  styleUrls: ['./symptom-detail.page.scss'],
})
export class SymptomDetailPage implements OnInit {
  days = [5, 4, 3, 2, 1];
  constructor() { }

  ngOnInit() {
  }

}
