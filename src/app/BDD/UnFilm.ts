export class UnFilm {
  _id !: number;
  _title!: string;
  _release_date!: Date;
  _poster_path!: string;
  _realisateur!: string;
  _acteur!: string;
  _genre!: string;
  _synopsis!: string;
  _duree!: number;
  _status!: string;
  _listed!: boolean;

  constructor(obj: any) {
    Object.assign(this, obj);

    this._title = obj.title;
    this._synopsis = obj.overview;

    this.duree = obj.runtime;
    if (obj.genres)
    {this._genre = obj.genres.map((g:any) => g.name).join(', ');}

    if (obj.credits){
      this._acteur = obj.credits.cast.slice(0,5) // on garde que 5 acteurs
        .map((a:any) => a.name).join(', '); // et on les stocke

      const director = obj.credits.crew.find((member:any) => member.job === 'Director');
      if (director) this._realisateur = director.name;
      else this._realisateur = 'Inconnu';
    }
    this._status = "NOT";
    this._listed = false;
  }

  public get id(): number {return this._id;}
  public set id(id: number) {this._id = id;}

  public get title(): string { return this._title; }
  public set title(value: string) { this._title = value; }

  public get release_date(): Date{ return this._release_date; }
  public set release_date(value: Date) { this._release_date = value; }

  // Le getter construit l'URL complète pour l'image
  public get poster_path(): string {
    return "https://image.tmdb.org/t/p/w185/" + this._poster_path;
  }
  public set poster_path(value: string) { this._poster_path = value; }

  public get realisateur(): string { return this._realisateur; }
  public set realisateur(value: string) { this._realisateur = value; }

  public get acteur(): string { return this._acteur; }
  public set acteur(value: string) { this._acteur = value; }

  public get genre(): string { return this._genre; }
  public set genre(value: string) { this._genre = value; }

  public get synopsis(): string { return this._synopsis; }
  public set synopsis(value: string) { this._synopsis = value; }

  public get duree(): number { return this._duree; }
  public set duree(value: number) { this._duree = value; }

  public get status(): string { return this._status; }
  public set status(value: string) { this._status = value; }

  public get listed(): boolean { return this._listed; }
  public set listed(value: boolean) { this._listed = value; }

}
