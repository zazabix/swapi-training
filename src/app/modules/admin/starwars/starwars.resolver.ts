import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { StarwarsService } from './starwars.service';
import {
    Films, People, Planets, Species, StarShips, Vehicles
} from 'app/modules/admin/starwars/starwars.types';


@Injectable({
  providedIn: 'root'
})

export class StarwarsResolverPeople implements Resolve<People[]> {

    constructor(private _starwarsService: StarwarsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<People[]> {

        return this._starwarsService.getPeopleList();

  }

}


export class StarwarsResolverFilm implements Resolve<Films[]> {

    constructor(private _starwarsService: StarwarsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Films[]> {

        return this._starwarsService.getFilmList();

    }

}


export class StarwarsResolverPlanet implements Resolve<Planets[]> {

    constructor(private _starwarsService: StarwarsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Planets[]> {

        return this._starwarsService.getPlanetList();

    }

}

export class StarwarsResolverStarships implements Resolve<StarShips[]> {

    constructor(private _starwarsService: StarwarsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StarShips[]> {

        return this._starwarsService.getStarshipsList();

    }

}

export class StarwarsResolverVehicles implements Resolve<Vehicles[]> {

    constructor(private _starwarsService: StarwarsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Vehicles[]> {

        return this._starwarsService.getVehicleList();

    }

}


