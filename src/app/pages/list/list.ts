import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { CommonModule } from '@angular/common';
import { CardService } from '../../services/card.service';
import { Card } from '../../interfaces/card.interface';
import { InfiniteScrollDirective, InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs';

@Component({
  selector: 'app-list',
  imports: [CommonModule, CardComponent, InfiniteScrollDirective, ReactiveFormsModule],
  templateUrl: './list.html',
  styleUrls: ['./list.css']
})
export class List implements OnInit{

  constructor(private cardService : CardService, private cdr: ChangeDetectorRef) {}
  cards: Card[] = [];
  offset = 0;
  cardText  = new FormControl('');

  ngOnInit(): void {
    this.cardText.valueChanges.pipe(debounceTime(1000)).subscribe((res) => {
      this.cards = [];
      this.searchCards(res);
    });
    this.searchCards(); 
   }


  onScroll()
  {
    this.offset += 100;
    this.searchCards();
  }

  searchCards(cardName : string | null = null)
  {
    this.cardService.getCards(cardName,this.offset).subscribe(res => 
      {
          this.cards = [...this.cards, ...res];
          this.cdr.detectChanges();
      }
      );
  }
}
