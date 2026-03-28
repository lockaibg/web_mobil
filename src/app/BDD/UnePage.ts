import {UnFilm} from './UnFilm';
import {UneSerie} from "./UneSerie";

export interface UnePage<T = any> {
  page : number;
  total_pages : number;
  results : T[];
  total_results : number;
}
