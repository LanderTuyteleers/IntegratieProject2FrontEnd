import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  /*  _size: 800;

    @ViewChild('circleCanvas') circleCanvas;
    */
  @ViewChild('circleDiv') circleDiv: ElementRef;
  _amount = [0, 1, 2, 3, 4, 5];
  _pos = 400;
  _size = 350;
  _lineWidth = 40;
  _delta = 60;


  constructor() {
  }

  ngAfterViewInit() {
    /*
      // STUFF FOR CANVAS
      const ctx: CanvasRenderingContext2D = this.circleCanvas.nativeElement.getContext('2d');
      console.log(this.circleCanvas.nativeElement.width + ' ' + this.circleCanvas.nativeElement.height);
      ctx.beginPath();
      ctx.fillStyle = 'blue';
      ctx.strokeStyle = 'blue';
      // ctx.fillRect(0, 0, 800, 800);
      ctx.arc(150, 75, 50, 0, 2 * Math.PI);
      ctx.arc(150, 75, 40, 0, 2 * Math.PI);
      /!*ctx.arc(500, 500, 240, 0, 2 * Math.PI);
      ctx.arc(500, 500, 230, 0, 2 * Math.PI);
      ctx.arc(500, 500, 220, 0, 2 * Math.PI);
      ctx.arc(500, 500, 210, 0, 2 * Math.PI);*!/
      ctx.lineWidth = 5;
      ctx.stroke();*/
    console.log(this.circleDiv.nativeElement.width);
  }

}
