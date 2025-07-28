import { Pipe, PipeTransform } from '@angular/core';
import { IconMappingService } from '../services/icon-mapping';

@Pipe({
  name: 'textIconParser'
})
export class TextIconParserPipe implements PipeTransform {

  constructor(private iconService: IconMappingService) {}

  transform(value: string): string {
    return this.iconService.replacePlaceholders(value);
  }

}
