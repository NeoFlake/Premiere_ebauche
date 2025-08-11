import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, tap } from 'rxjs';
import { FACTION_OPTIONS, RARITY_OPTIONS, TYPE_OPTIONS, SUB_TYPE_OPTIONS, SET_OPTIONS, ALT_ART_OPTION, NAME_OPTION, KEYWORD_OPTIONS, SORT_OPTIONS, TYPE_API_OPTIONS, RARITY_API_OPTIONS, SET_API_OPTIONS, FACTION_API_OPTIONS, URL_SORT_BY } from '../../../../utils/api-altered';
import { SearchFormService } from './service/search-form-service';
import { ApiResult } from '../../../interfaces/api/api-result';
import { CommonModule } from '@angular/common';
import { CheckboxListOptions } from '../../../interfaces/form/checkbox-list-options';
import { CheckboxList } from '../checkbox-list/checkbox-list';
import { FormType } from '../../../enum/form-type.enum';

@Component({
  selector: 'search-form',
  imports: [CommonModule, ReactiveFormsModule, CheckboxList],
  templateUrl: './search-form.html',
  styleUrl: './search-form.css'
})
export class SearchForm {

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

  public selectedKeywords: Array<string> = [];

  public sortTitleLibelle: string = "Trier par";
  public sortByOption: string = "";

  public dropdownTrierOpen: boolean = false;

  private formIsReady: boolean = false;
  private redirectionFormParams: Params | null = null;

  @Input() isNavigation$!: BehaviorSubject<boolean>;

  @Input() actualPage$!: BehaviorSubject<number>;
  @Output() rechercheEffectuee = new EventEmitter<boolean>();
  @Output() apiResult = new EventEmitter<ApiResult>();

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

  public factionOptions: CheckboxListOptions;
  public rarityOptions: CheckboxListOptions;
  public typesOptions: CheckboxListOptions;
  public setsOptions: CheckboxListOptions;
  public mainCostsOptions: CheckboxListOptions;
  public recallCostsOptions: CheckboxListOptions;
  public forestCaracValuesOptions: CheckboxListOptions;
  public mountainCaracValuesOptions: CheckboxListOptions;
  public oceanCaracValuesOptions: CheckboxListOptions;
  public keywordsOptions: CheckboxListOptions;
  public subTypesOptions: CheckboxListOptions;

  public FormTypeEnum = FormType;

  constructor(
    private searchFormService: SearchFormService,
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

    this.factionOptions = {
      formArray: this.factions,
      options: FACTION_OPTIONS,
      title: "Factions : ",
      isNumericValue: false
    };

    this.rarityOptions = {
      formArray: this.rarities,
      options: RARITY_OPTIONS,
      title: "Raretés : ", 
      isNumericValue: false
    };

    this.typesOptions = {
      formArray: this.types,
      options: TYPE_OPTIONS,
      title: "Types : ",
      isNumericValue: false
    };

    this.setsOptions = {
      formArray: this.sets,
      options: SET_OPTIONS,
      title: "Sets : ",
      isNumericValue: false
    };

    this.mainCostsOptions = {
      formArray: this.mainCosts,
      options: [],
      title: "Coût de main : ",
      isNumericValue: true
    };

    this.recallCostsOptions = {
      formArray: this.recallCosts,
      options: [],
      title: "Coût de réserve : ",
      isNumericValue: true
    };

    this.forestCaracValuesOptions = {
      formArray: this.forestCaracValues,
      options: [],
      title: "Forêt : ",
      isNumericValue: true
    };

    this.mountainCaracValuesOptions = {
      formArray: this.mountainCaracValues,
      options: [],
      title: "Montagne : ",
      isNumericValue: true

    };

    this.oceanCaracValuesOptions = {
      formArray: this.oceanCaracValues,
      options: [],
      title: "Océan : ",
      isNumericValue: true
    };

    this.keywordsOptions = {
      formArray: this.keywords,
      options: KEYWORD_OPTIONS,
      title: "",
      isNumericValue: false
    };

    this.subTypesOptions = {
      formControl: this.subTypes,
      options: SUB_TYPE_OPTIONS,
      title: "Sous-Type : "
    }

    this.formIsReady = true;

    if (this.redirectionFormParams) {
      this.searchFromRedirection(this.redirectionFormParams);
      this.redirectionFormParams = null;
    }

    this.activatedRoute.queryParams.subscribe((params: Params) => this.formIsReady ? this.searchFromRedirection(params) : this.redirectionFormParams = params);

  }

  ngOnInit() {
    this.isNavigation$
      .pipe(
        distinctUntilChanged(),
        tap((navigate: boolean) => {
          if (navigate === true) {
            this.getValue();
          }
        }))
      .subscribe();
  }

  public searchFromRedirection(params: Params): void {

    const key: string = Object.keys(params)[0];

    const methodLoadersByKey: Record<string, () => void> = {
      cardType: () => {
        const index = TYPE_API_OPTIONS.findIndex((el: string) => el === params["cardType"]);
        if (index !== -1) this.types.controls[index].setValue(true);
      },
      cardSubTypes: () => this.subTypes.setValue(params["cardSubTypes"]),
      mainCost: () => this.mainCosts.controls[params["mainCost"]].setValue(true),
      recallCost: () => this.recallCosts.controls[params["recallCost"]].setValue(true),
      forestCaracValues: () => this.forestCaracValues.controls[params["forestCaracValues"]].setValue(true),
      mountainCaracValues: () => this.mountainCaracValues.controls[params["mountainCaracValues"]].setValue(true),
      oceanCaracValues: () => this.oceanCaracValues.controls[params["oceanCaracValues"]].setValue(true),
      rarity: () => {
        const index = RARITY_API_OPTIONS.findIndex((el: string) => el === params["rarity"]);
        if (index !== -1) this.rarities.controls[index].setValue(true);
      },
      sets: () => {
        const index = SET_API_OPTIONS.findIndex((el: string) => el === params["sets"]);
        if (index !== -1) this.sets.controls[index].setValue(true);
      },
      faction: () => {
        const index = FACTION_API_OPTIONS.findIndex((el: string) => el === params["faction"]);
        if (index !== -1) this.factions.controls[index].setValue(true);
      }
    }

    if (methodLoadersByKey[key]) {
      methodLoadersByKey[key]();
    }

    if (Object.keys(params).length > 0) {
      setTimeout(() => this.getValue(), 0);
    }

  }

  public getValue(): void {

    // Petit chargement pour permettre de pas montrer les transitions
    this.rechercheEffectuee.emit(false);

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
      page: this.isNavigation$.value ? this.actualPage$.value : 1
    };

    this.isNavigation$.next(false);

    rechercheComplexe = this.searchFormService.hydrateForm([
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

    this.searchFormService.getCardsFromSearch(formResult, rechercheComplexe)
      .pipe(
        tap((data: any) => {

          this.apiResult.emit({
            nombresCartesTrouvees: data.totalItems,
            cards: [...data.cards],
            nombrePage: data.totalPages
          });

          setTimeout(() => this.rechercheEffectuee.emit(true), 0);
        }),
      )
      .subscribe();
  }

  public toggleDropdownTrier(): void {
    this.dropdownTrierOpen = !this.dropdownTrierOpen;
  }

  public orderBy(option: CheckBoxData): void {
    this.sortTitleLibelle = option.libelle;
    let sortBy: string = option.value.split(" ")[0];
    let directionOfSort: string = option.value.split(" ")[1];
    this.sortByOption = URL_SORT_BY + "[" + sortBy + "]=" + directionOfSort;
    this.isNavigation$.next(true);
  }

}
