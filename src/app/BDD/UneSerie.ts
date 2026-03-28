export class UneSerie {
  private _id!:number;
  private _title!: string;
  private _release_date!: string;
  private _poster_path!: string;
  private _realisateur!: string;
  private _acteur!: string;
  private _genre!: string;
  private _synopsis!: string;
  private _nbSaisons!: number;
  private _nbEpisodes!: number;
  private _listed!: boolean;
  private _status!: string;

  constructor(obj:any){
    Object.assign(this,obj);
    this._title = obj.name;
    this._release_date = obj.first_air_date;
    this._synopsis = obj.overview;
    this._poster_path = obj.poster_path;

    this._nbSaisons = obj.number_of_seasons;
    this._nbEpisodes = obj.number_of_episodes;

    if(obj.created_by){
      this._realisateur = obj.created_by.map((c: any)=> c.name).join(', ');
    }
    if(obj.credits?.cast){
      this._acteur = obj.credits.cast.slice(0,5).map((a: any) => a.name).join(', ');
    }

  }

  public get poster_path(): string {
    return "https://image.tmdb.org/t/p/w185/" + this._poster_path;
  }


  public get id(): number {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get release_date(): string {
    return this._release_date;
  }

  public get realisateur(): string {
    return this._realisateur;
  }

  public get acteur(): string {
    return this._acteur;
  }

  public get genre(): string {
    return this._genre;
  }

  public get synopsis(): string {
    return this._synopsis;
  }

  public get nbSaisons(): number {
    return this._nbSaisons;
  }

  public get nbEpisodes(): number {
    return this._nbEpisodes;
  }

  public get listed(): boolean {
    return this._listed;
  }

  public get status(): string {
    return this._status;
  }


  set id(value: number) {
    this._id = value;
  }

  set title(value: string) {
    this._title = value;
  }

  set release_date(value: string) {
    this._release_date = value;
  }

  set poster_path(value: string) {
    this._poster_path = value;
  }

  set realisateur(value: string) {
    this._realisateur = value;
  }

  set acteur(value: string) {
    this._acteur = value;
  }

  set genre(value: string) {
    this._genre = value;
  }

  set synopsis(value: string) {
    this._synopsis = value;
  }

  set nbSaisons(value: number) {
    this._nbSaisons = value;
  }

  set nbEpisodes(value: number) {
    this._nbEpisodes = value;
  }

  set listed(value: boolean) {
    this._listed = value;
  }

  set status(value: string) {
    this._status = value;
  }
}
