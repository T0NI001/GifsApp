import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey     : string = 'PciOfmQeybml358sGnDPHSWaDpqYRqF6';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial : string[] = [];

  public resultados: Gif[] = [];
  //public ultRes    : string = '';

get historial(){
  //this._historial = this._historial.splice(0,10);
  return [...this._historial]
}

constructor( private http: HttpClient ) {

  this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

  // if ( localStorage.getItem('historial') ){
  //   this._historial = JSON.parse(localStorage.getItem('historial')!);
  // }

  this.resultados = JSON.parse(localStorage.getItem('ultRes')!) || [];

  // if (localStorage.getItem('ultRes')){
  //   this.ultRes = JSON.parse(localStorage.getItem('ultRes')!)
  //   this.buscarGifs(this.ultRes);
  // } 
  
   // if (this._historial.length>0){
  //   this.buscarGifs(this._historial[0]);
  // }
}

buscarGifs( query: string ){

  query = query.trim().toLocaleLowerCase();
  

  if( !this._historial.includes( query )){
    this._historial.unshift(query);
    this._historial = this._historial.splice(0,10);

localStorage.setItem('historial', JSON.stringify(this._historial));

  }
  
  const params = new HttpParams()
  .set('api_key', this.apiKey)
  .set('q',query)
  .set('limit', '10');


  this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, {params})
    .subscribe( ( resp )  => {
    this.resultados = resp.data;
    //localStorage.setItem('ultRes', JSON.stringify(query));
    localStorage.setItem('ultRes', JSON.stringify(this.resultados));
  })

}


}
