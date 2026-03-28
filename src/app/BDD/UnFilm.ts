export class UnFilm {
  private _title!: string;
  private _release_date!: Date;
  private _poster_path!: string;

  constructor(obj: any) {
    Object.assign(this, obj);
  }

  public get title(): string { return this._title; }
  public set title(value: string) { this._title = value; }

  public get release_date(): Date{ return this._release_date; }
  public set release_date(value: Date) { this._release_date = value; }

  // Le getter construit l'URL complète pour l'image
  public get poster_path(): string {
    return "https://image.tmdb.org/t/p/w185/" + this._poster_path;
  }
  public set poster_path(value: string) { this._poster_path = value; }
}
