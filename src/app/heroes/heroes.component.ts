import { MessageService } from './../message.service';
import { HeroService } from './../hero.service';
import { Hero } from './../Hero';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  getHeroes():void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  add(heroName: string, form: HTMLFormElement): void {
    const name = heroName.trim();
    if(name) {
      this.heroService.addHero({ name } as Hero).subscribe(hero => {
        this.heroes.push(hero);
        form.reset();
      })
    };
  }

  remove(hero: Hero):void {
    this.heroService.removeHero(hero).subscribe(
      () => this.heroes = this.heroes.filter(heroItem => heroItem !== hero)
    );
  }

  // resetForm(form: HTMLFormElement): void {
  //   form.reset()
  // }

  ngOnInit(): void {
    this.getHeroes();
  }

}
