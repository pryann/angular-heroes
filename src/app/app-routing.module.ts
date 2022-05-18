import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopHeroesComponent } from './top-heroes/top-heroes.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'top-heroes', component: TopHeroesComponent },
  { path: 'hero-detail/:id', component: HeroDetailComponent },
  { path: '',  redirectTo:'/top-heroes', pathMatch: 'full' },
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
