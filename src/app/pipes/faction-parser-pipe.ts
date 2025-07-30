import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'factionParser'
})
export class FactionParserPipe implements PipeTransform {

  transform(value: string): SafeHtml {

    if (!value) return '';

    let formatted = value;

    const factionMap: Record<string, string> = {
      "AX": "\ue007",
      "BR": "\ue008",
      "LY": "\ue009",
      "MU": "\ue00a",
      "OR": "\ue00b",
      "YZ": "\ue00c"
    };

    Object.entries(factionMap).forEach(([key, icon]) => {
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      formatted = formatted.replace(regex, `<span class="altered-icon">${icon}</span>`);
    });

    return `<span class="standard-text">${formatted}</span>`;
  }

}
