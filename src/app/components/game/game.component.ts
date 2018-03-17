import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {Circle, ShapeOptions, Surface} from '@progress/kendo-drawing';
import {Point, Circle as GeomCircle} from '@progress/kendo-drawing/geometry';

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
  private numberOfCircles = 8;
  private numberOfCards = 10;
  private circleOptions: ShapeOptions;
  private cardOptions: ShapeOptions;
  cardArray: Array<Circle>;

  constructor() {
    this.circleOptions = {stroke: {color: 'red', width: this.defaultStrokeWidth}};
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
    /*
    this.moveCardToCircle(this.bolleke0, this.circle1, 'y', 'pos');
    this.moveCardToCircle(this.bolleke1, this.circle1, 'y', 'neg');
    this.moveCardToCircle(this.bolleke2, this.circle1, 'x', 'pos');
    this.moveCardToCircle(this.bolleke3, this.circle1, 'x', 'neg');
    this.moveCardToCircle(this.cards[0], this.circles[1], 'y', 'pos');
    */

    /*if (this.currentCircle < this.numberOfCircles - 1) {
      this.surface.destroy();
      this.cards = [];
      this.circles = [];
      this.currentCircle++;
      this.drawScene(this.createSurface());
    }*/
  }

  /*moveCardToCircle(cardToMove: Circle, circleToMoveTo: Circle, axis: string, direction: string) {
    let point: Point;
    if (axis.toLowerCase() === 'y') {
      if (direction.toLowerCase() === 'pos') {
        point = new Point(
          circleToMoveTo.geometry().getCenter().getX(),
          (circleToMoveTo.geometry().getCenter().getY() - (circleToMoveTo.bbox().height() / 2) + (this.defaultStrokeWidth / 2)));
      } else {
        point = new Point(
          circleToMoveTo.geometry().getCenter().getX(),
          (circleToMoveTo.geometry().getCenter().getY() + (circleToMoveTo.bbox().height() / 2) - (this.defaultStrokeWidth / 2)));
      }
    } else {
      if (direction.toLowerCase() === 'pos') {
        point = new Point(
          circleToMoveTo.geometry().getCenter().getX() - (circleToMoveTo.bbox().width() / 2) + (this.defaultStrokeWidth / 2),
          circleToMoveTo.geometry().getCenter().getY());
      } else {
        point = new Point(
          circleToMoveTo.geometry().getCenter().getX() + (circleToMoveTo.bbox().width() / 2) - (this.defaultStrokeWidth / 2),
          circleToMoveTo.geometry().getCenter().getY());
      }
    }
    cardToMove.geometry().setCenter(point);
  }*/

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
    /*
    let bolleke0 = new Circle(new GeomCircle([
        this.circle0.geometry().getCenter().getX(),
        (this.circle0.geometry().getCenter().getY() - this.circle0.bbox().height() / 2) + (this.defaultStrokeWidth / 2)],
      20), {fill: {color: 'blue'}});
    for (let i = 0; i < this.numberOfCards; i++) {
      const cardCircle = new Circle(new GeomCircle(this.geometry.center,
        this.defaultCardRadiusSize), this.cardOptions);
      this.cards.push(cardCircle);
    }

    this.cards.forEach(c => {
      this.surface.draw(c);
    });
    */
    for (let i = 0; i < this.numberOfCards; i++) {
      this.drawCardOnCircle(this.circles[0].geometry().getRadius(), (360 / this.numberOfCards * i));
    }
    this.cardArray = Array.from(this.cards.keys());
  }

  drawCardOnCircle(radiusOfDestinationCircle: number, angle: number) {
    // angle o = right & angle -90 = top
    const point = this.createNewPointForCard(radiusOfDestinationCircle, angle);
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
    const angle = 360 / this.numberOfCards;
    let cardToMoveByIndex = 0;
    this.cards.forEach((value, key) => {
      if (key === event.card) {
        const point = this.createNewPointForCard(this.circles[value].geometry().getRadius(), cardToMoveByIndex * angle);
        key.geometry().setCenter(point);
      } else {
        cardToMoveByIndex++;
      }
    });
  }
}
