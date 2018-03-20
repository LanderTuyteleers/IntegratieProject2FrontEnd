import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {Circle, ShapeOptions, Surface} from '@progress/kendo-drawing';
import {Point, Circle as GeomCircle} from '@progress/kendo-drawing/geometry';
import {Card} from '../../model/Card';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements AfterViewInit, OnDestroy {
  @Input() parentDivWidth: number;
  @Input() parentDivHeight: number;

  @ViewChild('surface')
  private surfaceElement: ElementRef;
  private surface: Surface;
  private geometry;
  private defaultStrokeWidth = 10;
  private defaultCircleRadiusSize = 300;
  private defaultCardRadiusSize = 20;
  // Key = card; Value = number of votes on that card
  cards = new Map<Circle, number>();
  private circles: Circle[] = [];
  numberOfCircles = 8;
  private numberOfCards = 12;
  private MAX_NUMBER_OF_WINNERS = 2;
  private circleOptions: ShapeOptions;
  private cardOptions: ShapeOptions;
  private angleForPlacingCardsOnCircle: number;
  cardCircleArray: Array<Circle>;
  cardIdArray: Array<Card>;

  constructor() {
    this.circleOptions = {stroke: {color: '#00a8ff', width: this.defaultStrokeWidth}};
    this.cardOptions = {fill: {color: 'blue'}};
  }

  ngAfterViewInit(): void {
    this.drawScene(this.createSurface());
  }

  ngOnDestroy(): void {
    this.surface.destroy();
  }

  private drawScene(surface: Surface) {
    this.geometry = new GeomCircle([this.parentDivWidth / 2, this.defaultCircleRadiusSize + this.defaultCircleRadiusSize / 10],
      this.defaultCircleRadiusSize);
    this.createCirclesForGame();
    this.createCards();
  }

  private createSurface(): Surface {
    const element = this.surfaceElement.nativeElement;
    this.surface = Surface.create(element);
    return this.surface;
  }

  Click() {
  }

  createCirclesForGame() {
    for (let i = 0; i < this.numberOfCircles; i++) {
      const circle = new Circle(new GeomCircle(this.geometry.center,
        this.defaultCircleRadiusSize - (this.defaultCircleRadiusSize / this.numberOfCircles) * i),
        this.circleOptions);
      this.circles.push(circle);
    }

    this.circles.forEach(c => {
      this.surface.draw(c);
    });
  }

  createCards() {
    this.angleForPlacingCardsOnCircle = 360 / this.numberOfCards;
    for (let i = 0; i < this.numberOfCards; i++) {
      this.drawCardOnCircle(this.circles[0].geometry().getRadius(), this.angleForPlacingCardsOnCircle * i);
    }
    this.cardCircleArray = Array.from(this.cards.keys());
  }

  drawCardOnCircle(radiusOfDestinationCircle: number, angle: number) {
    // angle o = right & angle -90 = top
    const point = this.createNewPointForCard(radiusOfDestinationCircle, angle);

    const randomColor = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ','
      + Math.floor(Math.random() * 255) + ')';

    this.cardOptions.fill.color = randomColor;
    const c = new Circle(new GeomCircle(point, this.defaultCardRadiusSize), this.cardOptions);
    this.cards.set(c, 0);
    this.surface.draw(c);
  }

  createNewPointForCard(radiusOfDestinationCircle: number, angle: number): Point {
    const x = this.geometry.getCenter().getX() + radiusOfDestinationCircle * Math.cos(angle * Math.PI / 180);
    const y = this.geometry.getCenter().getY() + radiusOfDestinationCircle * Math.sin(angle * Math.PI / 180);
    return new Point(x, y);
  }

  updateCard(event) {
    this.cards.set(event.card, event.value);
    this.moveCard(event.card);
    this.checkForWinners();

  }

  moveCard(circleCard: Circle) {
    let cardToMoveByIndex = 0;

    this.cards.forEach((value, key) => {
      if (key === circleCard && value < this.numberOfCircles) {
        const point = this.createNewPointForCard(this.circles[value].geometry().getRadius(),
          cardToMoveByIndex * this.angleForPlacingCardsOnCircle);
        key.geometry().setCenter(point);
      } else {
        cardToMoveByIndex++;
      }
    });
  }

  checkForWinners() {
    let winners = 0;
    this.cards.forEach((value) => {
      if (value === this.numberOfCircles - 1) {
        winners++;
      }
    });
    if (winners === this.MAX_NUMBER_OF_WINNERS) {
      console.log('MAX WINNERS ' + winners);
    }
  }
}
