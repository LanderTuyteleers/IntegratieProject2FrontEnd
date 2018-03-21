import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MainThema} from '../../model/MainThema';
import {DomSanitizer} from '@angular/platform-browser';
import {User} from '../../model/User';
import {CompleterData, CompleterService} from 'ng2-completer';
import {AppDataService} from '../../services/app-data.service';
import {applyRedirects} from '@angular/router/src/apply_redirects';

@Component({
  selector: 'app-main-themes',
  templateUrl: './main-themes.component.html',
  styleUrls: ['./main-themes.component.css']
})
export class MainThemesComponent implements OnInit {
  @Input() type;
  @Output() pageChanged: EventEmitter<String> = new EventEmitter<String>();
  @Output() activeThemeChanged: EventEmitter<MainThema> = new EventEmitter<MainThema>();
  @Output() chosenThemeId: EventEmitter<Number> = new EventEmitter<Number>();
  themes: MainThema[] = [];
  domSanitizerService;
  activeIndex;
  searchString;
  searchData = [];
  dataService: CompleterData;
  completerService;

  http;

  constructor(private domSanitizer: DomSanitizer, completerService: CompleterService, http: AppDataService) {
    this.domSanitizerService = domSanitizer;
    this.completerService = completerService;
    this.http = http;
  }

  ngOnInit() {

    // this.themes.push(new MainThema("Bier", "Dit is een game sessie dat probeert te bepalen wat het beste bier van Belgie is.", [], "https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640"));
    // this.themes.push(new MainThema("OS", "Dit is een game sessie dat probeert te bepalen wat het operating system is.", [], "https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640"));
    // this.themes.push(new MainThema("Pc merk", "Dit is een game sessie dat probeert te bepalen wat het beste pc merk is.", [], "https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640"));
    // this.themes.push(new MainThema("Dummy", "Dit is een game sessie dummy lorum ipsum lorum ipsum lorum ipsum lorum ipsum .", [], "https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640"));
    // this.themes.push(new MainThema("Dummy 2", "Dit is een game sessie dummy lorum ipsum lorum ipsum lorum ipsum lorum ipsum .", [], "https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640"));
    // this.themes.push(new MainThema("Dummy 3", "Dit is een game sessie dummy lorum ipsum lorum ipsum lorum ipsum lorum ipsum .", [], "https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640"));
    // this.themes.push(new MainThema("Dummy 4", "Dit is een game sessie dummy lorum ipsum lorum ipsum lorum ipsum lorum ipsum .", [], "https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640"));
    // this.themes.push(new MainThema("Dummy 5", "Dit is een game sessie dummy lorum ipsum lorum ipsum lorum ipsum lorum ipsum .", [], "https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640"));
    // this.themes.push(new MainThema("Dummy 6", "Dit is een game sessie dummy lorum ipsum lorum ipsum lorum ipsum lorum ipsum .", [], "https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640"));
    this.getMainThemes();
    this.initialiseSearchDataSets();
  }

  getMainThemes() {
    this.http.getAllConnectedMainThemes().subscribe(
      (data) => this.themes = data,
      //todo 404 opvangen?
      (error) => console.log(error)
    );
  }

  onSelectPressed(event) {
    this.activeIndex = event.target.attributes.index.value;
    this.activeThemeChanged.emit(this.themes[this.activeIndex]);
    this.scrollToTop(300);
  }

  onDeselectPressed() {
    this.activeIndex = -1;
    this.activeThemeChanged.emit(null);
    this.scrollToTop(300);
  }

  scrollToTop(scrollDuration) {
    var scrollStep = -window.scrollY / (scrollDuration / 15),
      scrollInterval = setInterval(function () {
        if (window.scrollY != 0) {
          window.scrollBy(0, scrollStep);
        }
        else clearInterval(scrollInterval);
      }, 15);
  }

  initialiseSearchDataSets() {
    this.searchData = this.themes;
    this.dataService = this.completerService.local(this.searchData, 'name', 'name');
  }

  onItemSelected(selectedItem) {
    this.activeIndex = this.themes.indexOf(selectedItem.originalObject);
    this.activeThemeChanged.emit(this.themes[this.activeIndex]);
    this.scrollToTop(300);
  }

  onDetailsClick(event) {
    this.chosenThemeId.emit(event.target.attributes.chosenThemeId);
  }

  onMainThemeDetailsReceived(event){
    console.log(event);
    this.themes.push()
  }
}
