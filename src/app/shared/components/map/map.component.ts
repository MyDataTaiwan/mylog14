import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';

import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { latLng, Map, marker, tileLayer } from 'leaflet';
import { Subject, timer } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { Proof } from '@core/interfaces/proof';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  @Input() proofs: Proof[];
  @Input() styles: any = {};

  destroy$ = new Subject();

  options = null;
  layers = [];

  constructor() { }

  ngOnInit() {
    this.proofs = this.proofs.filter(proof => proof);
    if (this.proofs.length > 0 && this.proofs[0]) {
      this.initMap();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initMap() {
    if (this.proofs.filter(proof => proof != null).filter(proof => proof.location)) {
      this.options = this.createMapOptions();
      this.layers = this.createMapLayersWithLocationMarkers();
    }
  }

  onMapReady(map: Map) {
    timer(50).pipe(
      tap(() => map.invalidateSize()),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  private createMapOptions() {
    return {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 })
      ],
      zoom: 15,
      center: latLng(this.proofs[0].location.latitude, this.proofs[0].location.longitude),
      attributionControl: false,
    };
  }

  private createMapLayersWithLocationMarkers() {
    return this.proofs
      .filter(proof => (proof.location.latitude && proof.location.longitude))
      .map(proof => marker([proof.location.latitude, proof.location.longitude]));
  }

}
