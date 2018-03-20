import {Injectable} from '@angular/core';

@Injectable()
export class ColorService {
  saturationValue: number;
  lightnessValue: number;
  saturationString: string;
  lightnessString: string;
  hueValue: number;

  constructor() {
    this.saturationValue = 100;
    this.lightnessValue = 50;
    this.saturationString = this.saturationValue + '%';
    this.lightnessString = this.lightnessValue + '%';
    this.hueValue = 0;
  }

  createRandomColors(): string {
    return 'rgb(' + this.randomizeColor() + ',' + this.randomizeColor() + ','
      + this.randomizeColor() + ')';
  }

  createFixedMainColors(i: number): string {
    return 'hsl(' + 15 * i + ',' + this.saturationString + ',' + this.lightnessString + ')';
  }

  createFixedMainColors2(i: number, numberOfCards: number): string {
    this.hueValue = 360 / numberOfCards;
    return 'hsl(' + this.hueValue * i + ',' + this.saturationString + ',' + this.lightnessString + ')';
  }

  private randomizeColor(): number {
    return Math.floor(Math.random() * 255);
  }
}
