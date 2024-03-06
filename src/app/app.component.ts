import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sign';
  signPad: any;
  @ViewChild('signPadCanvas', { static: false }) signaturePadElement: any;
  signImage: any;


  fontSize: number = 1;
  showPreview: boolean = false;
  bgColor: string = 'white';
  penColor: string = 'black'

  constructor() { }


  ngAfterViewInit() {
    if (this.signaturePadElement) {
      this.signPad = new SignaturePad(this.signaturePadElement.nativeElement);
      this.signPad.clear();
      this.signPad.backgroundColor = this.bgColor;
      this.signPad.penColor = this.penColor;
      this.updateSignaturePadProperties();
    }
  }

  private updateSignaturePadProperties() {
    this.signPad.minWidth = this.fontSize;
    this.signPad.maxWidth = this.fontSize * 1.5;
    this.signPad.dotSize = this.fontSize * 3;
  }

  updateFontSize() {
    this.updateSignaturePadProperties();
  }
  /*It's work in devices*/
  startSignPadDrawing(event: Event) {
    console.log(event);
  }
  /*It's work in devices*/
  movedFinger(event: Event) {
  }
  /*Undo last step from the signature*/
  undoSign() {
    const data = this.signPad.toData();
    if (data) {
      data.pop(); // remove the last step
      this.signPad.fromData(data);
    }
  }
  /*Clean whole the signature*/
  clearSignPad() {
    this.signPad.clear();
  }
  /*Inorder to Preview the Signature */
  saveSignPad() {
    this.showPreview = !this.showPreview;
    const base64ImageData = this.signPad.toDataURL();
    this.signImage = base64ImageData;
    //Here you can save your signature image using your API call.
  }

  downloadSign() {
    const base64ImageData = this.signPad.toDataURL();
    const a = document.createElement('a');
    a.href = base64ImageData;
    a.download = 'signature.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  updatePenColor() {
    this.signPad.penColor = this.penColor;
  }

  updateBackgroundColor() {
    this.signPad.backgroundColor = this.bgColor;
  }
}
