import {
  AfterViewInit, Component, ElementRef, OnDestroy, OnInit,
  ViewChild,
} from '@angular/core';

import jsQR from 'jsqr';
import { defer, Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('video') video: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('fileinput') fileinput: ElementRef;

  cameraStreamReady = false;
  canvasContext: any;
  canvasElement: any;
  videoElement: any;
  scanOn = true;

  dismissHandler$ = new Subject<string>();
  destroy$ = new Subject();

  constructor(
    private readonly modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.dismissHandler$
      .pipe(
        debounceTime(50),
        takeUntil(this.destroy$),
      ).subscribe(data => this.modalCtrl.dismiss(data));
  }

  ngOnDestroy() {
    this.scanOn = false;
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
    this.videoElement = this.video.nativeElement;
    this.scanOn = true;
    if (this.scanOn) {
      this.startScan();
    }
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  startScan() {
    defer(() => navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    }))
      .pipe(
        tap(cameraStream => {
          this.setVideoSource(cameraStream);
          this.videoElement.play();
          this.cameraStreamReady = true;
          requestAnimationFrame(this.scan.bind(this));
        }),
        takeUntil(this.destroy$),
      ).subscribe();
  }

  private setVideoSource(source: MediaStream): void {
    this.videoElement.srcObject = source;
    // Required for Safari
    this.videoElement.setAttribute('playsinline', true);
  }

  private scan() {
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;

      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });

      if (code) {
        this.dismissHandler$.next(code.data);
      }
    }
    if (this.scanOn) {
      requestAnimationFrame(this.scan.bind(this));
    }
  }
}
