import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../Hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero?:Hero

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private heroService : HeroService,
  ) { }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero && this.hero.name.trim()) {
      this.heroService.updateHero(this.hero).subscribe(()=> this.goBack())
    }
  }

  ngOnInit(): void {
    this.getHero()
  }

}
