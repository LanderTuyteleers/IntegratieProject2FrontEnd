export class SubTheme {
  public theme;
  public subThemeName: String;
  public subThemeDescription: String;
  public image;

  constructor(theme, subThemeName, subThemeDescription) {
    this.theme = theme;
    this.subThemeName = subThemeName;
    this.subThemeDescription = subThemeDescription;
  }

  fromJSON(obj: any){
    this.theme = obj.theme;
    this.subThemeName = obj.subThemeName;
    this.subThemeDescription = obj.subThemeDescription;
    return this;
  }

}
