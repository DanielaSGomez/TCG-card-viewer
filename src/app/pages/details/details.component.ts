import { Component, OnInit } from '@angular/core';
import { Card } from '../../interfaces/card.interface';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf, NgForOf, KeyValuePipe, CommonModule } from '@angular/common';
import { MarketNamePipe } from '../../pipes/market-name-pipe';

@Component({
  selector: 'app-details',
  imports: [CommonModule, AsyncPipe, KeyValuePipe, MarketNamePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class Details implements OnInit {
  id! : string;
  card$! : Observable<Card>;

  constructor(private route : ActivatedRoute, private cardService : CardService){}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.card$ = this.cardService.getCard(this.id);
    
  }
    
}
