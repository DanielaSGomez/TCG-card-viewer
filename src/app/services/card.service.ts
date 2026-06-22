import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';

import { map } from 'rxjs/operators';
import { Card } from '../interfaces/card.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CardService {

    apiURl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
    constructor(private httpClient : HttpClient) {  }

    getCards(name: string | null, offset = 0)
    {
        const params : any = { num:100, offset };

        if(name)
        {
            params.fname = name; 
        }

        return this.httpClient.get<any>(this.apiURl, { params }).pipe(
        map(res => res.data as Card[])
        );
    }

    getCard(id : string) : Observable<Card>
    {
        const params = { id };
        return this.httpClient.get(this.apiURl, {params}).pipe(
            map((res : any) => res.data[0])
        );
    }
   
}
