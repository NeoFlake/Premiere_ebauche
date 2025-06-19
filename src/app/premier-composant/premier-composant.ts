import { Component } from '@angular/core';
import { PremierComposantService } from '../premier-composant-service';
import { map } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ALT_ART_OPTION, FACTION_OPTIONS, KEYWORD_OPTIONS, NAME_OPTION, RARITY_OPTIONS, SET_OPTIONS, TYPE_OPTIONS } from '../../utils/api-altered';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Card } from '../card/card';

@Component({
  selector: 'premier-composant',
  imports: [CommonModule, ReactiveFormsModule, Card],
  templateUrl: './premier-composant.html',
  styleUrl: './premier-composant.css',
  standalone: true
})
export class PremierComposant {

  affichageBasique: Array<any> = [];
  form: FormGroup;

  factions: FormArray<FormControl>;
  rarities: FormArray<FormControl>;
  types: FormArray<FormControl>;
  sets: FormArray<FormControl>;
  mainCosts: FormArray<FormControl>;
  recallCosts: FormArray<FormControl>;
  keywords: FormControl<Array<string>>;
  forestCaracValues: FormArray<FormControl>;
  mountainCaracValues: FormArray<FormControl>;
  oceanCaracValues: FormArray<FormControl>;

  altArt: FormControl<boolean>;

  name: FormControl<string>;

  nombresCartesTrouvees: number = 0;
  rechercheEffectuee: boolean = false;

  dropdownOpen = false;
  selectedKeywords: string[] = [];

  // Valeur utilisé pour la lecture dans la vue
  readonly FACTION_OPTIONS = FACTION_OPTIONS;
  readonly RARITY_OPTIONS = RARITY_OPTIONS;
  readonly TYPE_OPTIONS = TYPE_OPTIONS;
  readonly SET_OPTIONS = SET_OPTIONS;
  readonly ALT_ART_OPTION = ALT_ART_OPTION;
  readonly NAME_OPTION = NAME_OPTION;
  readonly KEYWORD_OPTIONS = KEYWORD_OPTIONS;

  constructor(private premierComposantService: PremierComposantService, private fb: FormBuilder) {

    this.factions = this.fb.array(FACTION_OPTIONS.map(() => this.fb.control(false)));

    this.rarities = this.fb.array(RARITY_OPTIONS.map(() => this.fb.control(false)));

    this.types = this.fb.array(TYPE_OPTIONS.map(() => this.fb.control(false)));

    this.sets = this.fb.array(SET_OPTIONS.map(() => this.fb.control(false)));

    this.mainCosts = this.fb.array(Array.from({ length: 9 }, () => this.fb.control(false)));

    this.recallCosts = this.fb.array(Array.from({ length: 9 }, () => this.fb.control(false)));

    this.forestCaracValues = this.fb.array(Array.from({ length: 9 }, () => this.fb.control(false)));

    this.mountainCaracValues = this.fb.array(Array.from({ length: 9 }, () => this.fb.control(false)));
    
    this.oceanCaracValues = this.fb.array(Array.from({ length: 9 }, () => this.fb.control(false)));

    this.keywords = this.fb.control([], {
      nonNullable: true
    });

    this.altArt = this.fb.control(false, {
      nonNullable: true
    });

    this.name = this.fb.control("", {
      nonNullable: true
    })

    this.form = this.fb.group({
      factions: this.factions,
      rarities: this.rarities,
      types: this.types,
      sets: this.sets,
      altArt: this.altArt,
      name: this.name,
      mainCosts: this.mainCosts,
      recallCosts: this.recallCosts,
      keywords: this.keywords,
      forestCaracValues: this.forestCaracValues,
      mountainCaracValues: this.mountainCaracValues,
      oceanCaracValues: this.oceanCaracValues,
    });

  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  onKeywordToggle(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
    const current = this.keywords.value;

    if (checkbox.checked) {
      this.keywords.setValue([...current, value]);
    } else {
      this.keywords.setValue(current.filter(v => v !== value));
    }

    this.keywords.markAsDirty();
    this.keywords.markAsTouched();
    this.selectedKeywords = this.keywords.value;
  }

  getValue(): void {

    let rechercheComplexe: boolean = false;

    let formResult: SearchFormData = {
      factions: [],
      rarities: [],
      sets: [],
      types: [],
      altArt: this.altArt.value,
      name: this.name.value,
      mainCosts: [],
      recallCosts: [],
      keywords: [],
      forestCaracValues: [],
      mountainCaracValues: [],
      oceanCaracValues: [],
    };

    // Récupération des valeurs formulaires pour le paramètre faction
    FACTION_OPTIONS.forEach((element: CheckBoxData, i: number) => {

      if (this.factions.value[i] === true) {
        formResult.factions.push(element.value);
        rechercheComplexe === false ? rechercheComplexe = true : null;
      };

    });

    RARITY_OPTIONS.forEach((element: CheckBoxData, i: number) => {

      if (this.rarities.value[i] === true) {
        formResult.rarities.push(element.value);
        rechercheComplexe === false ? rechercheComplexe = true : null;
      };

    });

    TYPE_OPTIONS.forEach((element: CheckBoxData, i: number) => {

      if (this.types.value[i] === true) {
        formResult.types.push(element.value);
        rechercheComplexe === false ? rechercheComplexe = true : null;
      };

    });

    SET_OPTIONS.forEach((element: CheckBoxData, i: number) => {

      if (this.sets.value[i] === true) {
        formResult.sets.push(element.value);
        rechercheComplexe === false ? rechercheComplexe = true : null;
      };

    });

    this.mainCosts.controls.forEach((element: FormControl<boolean>, i: number) => {
      if (element.value === true) {
        formResult.mainCosts.push(i + 1);
        rechercheComplexe === false ? rechercheComplexe = true : null;
      }
    });

    this.recallCosts.controls.forEach((element: FormControl<boolean>, i: number) => {
      if (element.value === true) {
        formResult.recallCosts.push(i + 1);
        rechercheComplexe === false ? rechercheComplexe = true : null;
      }
    });

    this.forestCaracValues.controls.forEach((element: FormControl<boolean>, i: number) => {
      if (element.value === true) {
        formResult.forestCaracValues.push(i + 1);
        rechercheComplexe === false ? rechercheComplexe = true : null;
      }
    });

    this.mountainCaracValues.controls.forEach((element: FormControl<boolean>, i: number) => {
      if (element.value === true) {
        formResult.mountainCaracValues.push(i + 1);
        rechercheComplexe === false ? rechercheComplexe = true : null;
      }
    });

    this.oceanCaracValues.controls.forEach((element: FormControl<boolean>, i: number) => {
      if (element.value === true) {
        formResult.oceanCaracValues.push(i + 1);
        rechercheComplexe === false ? rechercheComplexe = true : null;
      }
    });

    if(this.keywords.value.length > 0) {
      formResult.keywords = this.keywords.value;
      rechercheComplexe === false ? rechercheComplexe = true : null;
    }

    this.premierComposantService.premierAppelRest(formResult, rechercheComplexe)
      .pipe(
        map((data: any) => {
          // On fixe la recherche effectué à true
          this.rechercheEffectuee = true;
          // On détermine le nombre de résultat renvoyé par l'API
          this.nombresCartesTrouvees = data.totalItems;
          this.affichageBasique = data.cards;
        }),
      )
      .subscribe();

  }

}
