import { Component } from '@angular/core';
import { PremierComposantService } from '../../services/premier-composant-service';
import { tap } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ALT_ART_OPTION, FACTION_API_OPTIONS, FACTION_OPTIONS, KEYWORD_OPTIONS, NAME_OPTION, RARITY_API_OPTIONS, RARITY_OPTIONS, SET_API_OPTIONS, SET_OPTIONS, SORT_OPTIONS, SUB_TYPE_OPTIONS, TYPE_API_OPTIONS, TYPE_OPTIONS, URL_SORT_BY } from '../../../utils/api-altered';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Card } from '../card/card';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'premier-composant',
  imports: [CommonModule, ReactiveFormsModule, Card],
  templateUrl: './premier-composant.html',
  styleUrl: './premier-composant.css',
  standalone: true
})
export class PremierComposant {

  public affichageBasique: Array<any> = [];
  public form: FormGroup;

  public factions: FormArray<FormControl>;
  public rarities: FormArray<FormControl>;
  public types: FormArray<FormControl>;
  public subTypes: FormControl<string>;
  public sets: FormArray<FormControl>;
  public mainCosts: FormArray<FormControl>;
  public recallCosts: FormArray<FormControl>;
  public keywords: FormArray<FormControl>;
  public forestCaracValues: FormArray<FormControl>;
  public mountainCaracValues: FormArray<FormControl>;
  public oceanCaracValues: FormArray<FormControl>;

  public altArt: FormControl<boolean>;

  public name: FormControl<string>;

  public nombresCartesTrouvees: number = 0;
  public rechercheEffectuee: boolean = false;
  // Permet d'afficher une pagination plus chiadée avec les inter-page qui sont innaccessible
  public pagination: Array<number | string> = [];
  public currentPage: number = 1;
  public totalPages: number = 1;

  public dropdownOpen: boolean = false;
  public dropdownTrierOpen: boolean = false;
  public selectedKeywords: Array<string> = [];

  // Permet de réinitialiser la pagination si une nouvelle recherche est effectuée
  public isNavigation: boolean = false;

  // Permet de dissimuler la vue durant le chargement des cartes pour une vue plus propre :)
  public isLoading: boolean = true;

  // Valeur utilisé pour la lecture dans la vue
  readonly FACTION_OPTIONS = FACTION_OPTIONS;
  readonly RARITY_OPTIONS = RARITY_OPTIONS;
  readonly TYPE_OPTIONS = TYPE_OPTIONS;
  readonly SUB_TYPE_OPTIONS = SUB_TYPE_OPTIONS;
  readonly SET_OPTIONS = SET_OPTIONS;
  readonly ALT_ART_OPTION = ALT_ART_OPTION;
  readonly NAME_OPTION = NAME_OPTION;
  readonly KEYWORD_OPTIONS = KEYWORD_OPTIONS;
  readonly SORT_OPTIONS = SORT_OPTIONS;

  public sortTitleLibelle: string = "Trier par";
  public sortByOption: string = "";

  constructor(
    private premierComposantService: PremierComposantService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) {

    this.factions = this.fb.array(FACTION_OPTIONS.map(() => this.fb.control(false)));
    this.rarities = this.fb.array(RARITY_OPTIONS.map(() => this.fb.control(false)));
    this.types = this.fb.array(TYPE_OPTIONS.map(() => this.fb.control(false)));
    this.subTypes = this.fb.control("", {
      nonNullable: true
    });
    this.sets = this.fb.array(SET_OPTIONS.map(() => this.fb.control(false)));
    this.mainCosts = this.fb.array(Array.from({ length: 11 }, () => this.fb.control(false)));
    this.recallCosts = this.fb.array(Array.from({ length: 11 }, () => this.fb.control(false)));
    this.forestCaracValues = this.fb.array(Array.from({ length: 11 }, () => this.fb.control(false)));
    this.mountainCaracValues = this.fb.array(Array.from({ length: 11 }, () => this.fb.control(false)));
    this.oceanCaracValues = this.fb.array(Array.from({ length: 11 }, () => this.fb.control(false)));
    this.keywords = this.fb.array(KEYWORD_OPTIONS.map(() => this.fb.control(false)));

    this.altArt = this.fb.control(false, {
      nonNullable: true
    });

    this.name = this.fb.control("", {
      nonNullable: true
    });

    this.form = this.fb.group({
      factions: this.factions,
      rarities: this.rarities,
      types: this.types,
      subTypes: this.subTypes,
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

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      switch (Object.keys(params)[0]) {
        case "cardType":
          this.types.controls[TYPE_API_OPTIONS.findIndex((element: string) => element === params["cardType"])].setValue(true);
          this.getValue();
          break;
        case "cardSubTypes":
          this.subTypes.setValue(params["cardSubTypes"]);
          this.getValue();
          break;
        case "mainCost":
          this.mainCosts.controls[params["mainCost"]].setValue(true);
          this.getValue();
          break;
        case "recallCost":
          this.recallCosts.controls[params["recallCost"]].setValue(true);
          this.getValue();
          break;
        case "forestCaracValues":
          this.forestCaracValues.controls[params["forestCaracValues"]].setValue(true);
          this.getValue();
          break;
        case "mountainCaracValues":
          this.mountainCaracValues.controls[params["mountainCaracValues"]].setValue(true);
          this.getValue();
          break;
        case "oceanCaracValues":
          this.oceanCaracValues.controls[params["oceanCaracValues"]].setValue(true);
          this.getValue();
          break;
        case "rarity":
          this.rarities.controls[RARITY_API_OPTIONS.findIndex((element: string) => element === params["rarity"])].setValue(true);
          this.getValue();
          break;
        case "sets":
          this.sets.controls[SET_API_OPTIONS.findIndex((element: string) => element === params["sets"])].setValue(true);
          this.getValue();
          break;
        case "faction":
          this.factions.controls[FACTION_API_OPTIONS.findIndex((element: string) => element === params["faction"])].setValue(true);
          this.getValue();
          break;
        default:
          break;
      }
    });

  }

  public loadPreviousPage(): void {
    if (this.currentPage > 1) {
      this.isNavigation = true;
      this.isLoading = true;
      this.loadPage(this.currentPage - 1);
    }
  }

  public loadNextPage(): void {
    if (this.currentPage <= this.pagination.length) {
      this.isNavigation = true;
      this.isLoading = true;
      this.loadPage(this.currentPage + 1);
    }
  }

  public loadPage(page: number): void {
    this.isNavigation = true;
    this.isLoading = true;
    this.currentPage = page;
    this.getValue();
  }

  public toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  public toggleDropdownTrier(): void {
    this.dropdownTrierOpen = !this.dropdownTrierOpen;
  }

  public orderBy(option: CheckBoxData): void {
    this.sortTitleLibelle = option.libelle;
    let sortBy: string = option.value.split(" ")[0];
    let directionOfSort: string = option.value.split(" ")[1];
    this.sortByOption = URL_SORT_BY + "[" + sortBy + "]=" + directionOfSort;
    this.isNavigation = true;
    this.getValue();
  }

  public getValue(): void {

    if (!this.isNavigation) {
      this.currentPage = 1;
    } else {
      this.isNavigation = false;
    }

    let rechercheComplexe: boolean = false;

    let formResult: SearchFormData = {
      factions: [],
      rarities: [],
      sets: [],
      types: [],
      subTypes: this.subTypes.value,
      altArt: this.altArt.value,
      name: this.name.value,
      mainCosts: [],
      recallCosts: [],
      keywords: [],
      forestCaracValues: [],
      mountainCaracValues: [],
      oceanCaracValues: [],
      sortBy: this.sortByOption,
      page: this.currentPage
    };

    rechercheComplexe = this.premierComposantService.hydrateForm([
      [FACTION_OPTIONS, this.factions, formResult.factions, true],
      [RARITY_OPTIONS, this.rarities, formResult.rarities, true],
      [TYPE_OPTIONS, this.types, formResult.types, true],
      [SET_OPTIONS, this.sets, formResult.sets, true],
      [this.mainCosts, this.mainCosts, formResult.mainCosts, false],
      [this.recallCosts, this.recallCosts, formResult.recallCosts, false],
      [this.forestCaracValues, this.forestCaracValues, formResult.forestCaracValues, false],
      [this.mountainCaracValues, this.mountainCaracValues, formResult.mountainCaracValues, false],
      [this.oceanCaracValues, this.oceanCaracValues, formResult.oceanCaracValues, false],
      [KEYWORD_OPTIONS, this.keywords, formResult.keywords, true]
    ]);

    this.premierComposantService.premierAppelRest(formResult, rechercheComplexe)
      .pipe(
        tap((data: any) => {
          this.pagination = [];
          // On fixe la recherche effectué à true
          this.rechercheEffectuee = true;
          // On détermine le nombre de résultat renvoyé par l'API
          this.nombresCartesTrouvees = data.totalItems;
          this.affichageBasique = [...data.cards];
          this.totalPages = data.totalPages;
          this.pagination = this.premierComposantService.createPaginationDisplay(data.totalPages, this.currentPage);
          this.isLoading = false;
        }),
      )
      .subscribe();
  }

}
