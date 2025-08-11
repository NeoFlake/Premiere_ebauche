import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, tap } from 'rxjs';
import { FACTION_OPTIONS, RARITY_OPTIONS, TYPE_OPTIONS, SUB_TYPE_OPTIONS, SET_OPTIONS, ALT_ART_OPTION, NAME_OPTION, KEYWORD_OPTIONS, SORT_OPTIONS, TYPE_API_OPTIONS, RARITY_API_OPTIONS, SET_API_OPTIONS, FACTION_API_OPTIONS, URL_SORT_BY } from '../../../../utils/api-altered';
import { SearchFormService } from './service/search-form-service';
import { ApiResult } from '../../../interfaces/api/api-result';
import { CommonModule } from '@angular/common';
import { FormChunkOptions } from '../../../interfaces/form/checkbox-list-options';
import { FormChunk } from '../form-chunk/form-chunk';
import { FormType } from '../../../enum/form-type.enum';

@Component({
  selector: 'search-form',
  imports: [CommonModule, ReactiveFormsModule, FormChunk],
  templateUrl: './search-form.html',
  styleUrl: './search-form.css'
})
export class SearchForm {

  public form: FormGroup;

  public filters: {
    factions: FormArray<FormControl>;
    rarities: FormArray<FormControl>;
    types: FormArray<FormControl>;
    subTypes: FormControl<string>;
    sets: FormArray<FormControl>;
    mainCosts: FormArray<FormControl>;
    recallCosts: FormArray<FormControl>;
    keywords: FormArray<FormControl>;
    forestCaracValues: FormArray<FormControl>;
    mountainCaracValues: FormArray<FormControl>;
    oceanCaracValues: FormArray<FormControl>;
    altArt: FormControl<boolean>;
    name: FormControl<string>;
  };

  public sortTitleLibelle: string = "Trier par";
  public sortByOption: string = "";

  public dropdownTrierOpen: boolean = false;

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

  public factionOptions: FormChunkOptions;
  public rarityOptions: FormChunkOptions;
  public typesOptions: FormChunkOptions;
  public setsOptions: FormChunkOptions;
  public mainCostsOptions: FormChunkOptions;
  public recallCostsOptions: FormChunkOptions;
  public forestCaracValuesOptions: FormChunkOptions;
  public mountainCaracValuesOptions: FormChunkOptions;
  public oceanCaracValuesOptions: FormChunkOptions;
  public keywordsOptions: FormChunkOptions;
  public subTypesOptions: FormChunkOptions;
  public altArtOptions: FormChunkOptions;
  public nameOptions: FormChunkOptions;

  public FormTypeEnum = FormType;

  private formIsReady: boolean = false;
  private redirectionFormParams: Params | null = null;

  constructor(
    private searchFormService: SearchFormService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) {

    this.filters = {
      factions: this.createFormArrayFromOptions(FACTION_OPTIONS),
      rarities: this.createFormArrayFromOptions(RARITY_OPTIONS),
      types: this.createFormArrayFromOptions(TYPE_OPTIONS),
      subTypes: this.fb.control("", { nonNullable: true }),
      sets: this.createFormArrayFromOptions(SET_OPTIONS),
      mainCosts: this.createFormArrayOfLength(11),
      recallCosts: this.createFormArrayOfLength(11),
      keywords: this.createFormArrayFromOptions(KEYWORD_OPTIONS),
      forestCaracValues: this.createFormArrayOfLength(11),
      mountainCaracValues: this.createFormArrayOfLength(11),
      oceanCaracValues: this.createFormArrayOfLength(11),
      altArt: this.fb.control(false, { nonNullable: true }),
      name: this.fb.control("", { nonNullable: true }),
    };

    this.form = this.fb.group(this.filters);

    this.factionOptions = this._createCheckboxOptions(this.filters.factions, FACTION_OPTIONS, "Factions : ");
    this.rarityOptions = this._createCheckboxOptions(this.filters.rarities, RARITY_OPTIONS, "Raretés : ");
    this.typesOptions = this._createCheckboxOptions(this.filters.types, TYPE_OPTIONS, "Types : ");
    this.setsOptions = this._createCheckboxOptions(this.filters.sets, SET_OPTIONS, "Sets : ");
    this.mainCostsOptions = this._createCheckboxOptions(this.filters.mainCosts, [], "Coût de main : ", true);
    this.recallCostsOptions = this._createCheckboxOptions(this.filters.recallCosts, [], "Coût de réserve : ", true);
    this.forestCaracValuesOptions = this._createCheckboxOptions(this.filters.forestCaracValues, [], "Forêt : ", true);
    this.mountainCaracValuesOptions = this._createCheckboxOptions(this.filters.mountainCaracValues, [], "Montagne : ", true);
    this.oceanCaracValuesOptions = this._createCheckboxOptions(this.filters.oceanCaracValues, [], "Océan : ", true);
    this.keywordsOptions = this._createCheckboxOptions(this.filters.keywords, KEYWORD_OPTIONS, "");

    this.subTypesOptions = this._createFormChunkOptions(this.filters.subTypes, "Sous-Type : ", SUB_TYPE_OPTIONS);
    this.altArtOptions = this._createFormChunkOptions(this.filters.altArt, ALT_ART_OPTION, undefined, "checkbox");
    this.nameOptions = this._createFormChunkOptions(this.filters.name, NAME_OPTION, undefined, "text");

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

  private createFormArrayFromOptions = (options: Array<CheckBoxData>): FormArray<FormControl<boolean>> =>
    this.fb.array(options.map(() => this.fb.control(false, { nonNullable: true })));

  private createFormArrayOfLength = (length: number): FormArray<FormControl<boolean>> =>
    this.fb.array(
      Array.from({ length }, () => this.fb.control(false, { nonNullable: true }))
    );

  private _createCheckboxOptions(formArray: FormArray<FormControl>, options: Array<CheckBoxData>, title: string, isNumericValue: boolean = false): FormChunkOptions {
    return { formArray, title, options, isNumericValue }
  }

  private _createFormChunkOptions(formControl: FormControl<any>, title: string, options: Array<CheckBoxData> = [], soloInputType: string = "") {
    return { formControl, title, options, soloInputType };
  }

  public searchFromRedirection(params: Params): void {

    const key: string = Object.keys(params)[0];

    const methodLoadersByKey: Record<string, () => void> = {
      faction: () => this._setMethodLoadersIndexedElement(FACTION_API_OPTIONS, params["faction"], this.filters.factions),
      rarity: () => this._setMethodLoadersIndexedElement(RARITY_API_OPTIONS, params["rarity"], this.filters.rarities),
      cardType: () => this._setMethodLoadersIndexedElement(TYPE_API_OPTIONS, params["cardType"], this.filters.types),
      cardSubTypes: () => this.filters.subTypes.setValue(params["cardSubTypes"]),
      sets: () => this._setMethodLoadersIndexedElement(SET_API_OPTIONS, params["sets"], this.filters.sets),
      mainCost: () => this.filters.mainCosts.controls[params["mainCost"]].setValue(true),
      recallCost: () => this.filters.recallCosts.controls[params["recallCost"]].setValue(true),
      forestCaracValues: () => this.filters.forestCaracValues.controls[params["forestCaracValues"]].setValue(true),
      mountainCaracValues: () => this.filters.mountainCaracValues.controls[params["mountainCaracValues"]].setValue(true),
      oceanCaracValues: () => this.filters.oceanCaracValues.controls[params["oceanCaracValues"]].setValue(true),
    }

    if (methodLoadersByKey[key]) {
      methodLoadersByKey[key]();
    }

    if (Object.keys(params).length > 0) {
      // À garder absolument car le Promise.resolve est trop rapide et s'exécute avant la création du formulaire (donc fait bugger)
      setTimeout(() => this.getValue(), 0);
    }

  }

  private _setMethodLoadersIndexedElement(apiOptions: Array<string>, params: string, filterParam: FormArray<FormControl<any>>): void {
    const index = apiOptions.findIndex((el: string) => el === params);
    index !== -1 ? filterParam.controls[index].setValue(true) : null;
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
      subTypes: this.filters.subTypes.value,
      altArt: this.filters.altArt.value,
      name: this.filters.name.value,
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
      [FACTION_OPTIONS, this.filters.factions, formResult.factions, true],
      [RARITY_OPTIONS, this.filters.rarities, formResult.rarities, true],
      [TYPE_OPTIONS, this.filters.types, formResult.types, true],
      [SET_OPTIONS, this.filters.sets, formResult.sets, true],
      [this.filters.mainCosts, this.filters.mainCosts, formResult.mainCosts, false],
      [this.filters.recallCosts, this.filters.recallCosts, formResult.recallCosts, false],
      [this.filters.forestCaracValues, this.filters.forestCaracValues, formResult.forestCaracValues, false],
      [this.filters.mountainCaracValues, this.filters.mountainCaracValues, formResult.mountainCaracValues, false],
      [this.filters.oceanCaracValues, this.filters.oceanCaracValues, formResult.oceanCaracValues, false],
      [KEYWORD_OPTIONS, this.filters.keywords, formResult.keywords, true]
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
