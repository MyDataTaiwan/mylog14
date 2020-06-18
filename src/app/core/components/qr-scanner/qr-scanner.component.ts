import jsQR from 'jsqr';
import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Platform } from '@ionic/angular';
import { defer, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() scanResult = new EventEmitter<string>();
  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  @ViewChild('fileinput', { static: false }) fileinput: ElementRef;

  cameraStreamReady = false;
  canvasContext: any;
  canvasElement: any;
  videoElement: any;

  destroy$ = new Subject();

  constructor(
    private platform: Platform
  ) {
    const isInStandaloneMode = () =>
      'standalone' in window.navigator && window.navigator['standalone'];
    if (this.platform.is('ios') && isInStandaloneMode()) {
      console.log('I am a an iOS PWA!');
      // TODO (If we will release the App as PWA) ? Implement alternative for iOS PWA : Remove this platform check
    }
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
    this.videoElement = this.video.nativeElement;
    this.startScan();
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
        this.scanResult.emit(code.data);
      }
    }
    requestAnimationFrame(this.scan.bind(this));
  }
}
