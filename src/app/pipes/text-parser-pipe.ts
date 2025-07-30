import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'textParser'
})
export class TextParserPipe implements PipeTransform {

  constructor() { }

  transform(value: string): SafeHtml {
    if (!value) return '';

    let formatted = value;

    const iconMap: Record<string, string> = {
      "{0}": "\uE022",
      "{1}": "\ue01b",
      "{2}": "\ue01a",
      "{3}": "\ue019",
      "{4}": "\ue020",
      "{5}": "\ue01c",
      "{6}": "\ue01e",
      "{7}": "\ue01d",
      "{8}": "\ue01f",
      "{9}": "\ue021",
      "{X}": "\ue02c",
      "{H}": "\ue023",
      "{h}": "\ue023",
      "{R}": "\ue024",
      "{J}": "\ue026",
      "{D}": "\ue029",
      "{V}": "\ue037",
      "{M}": "\ue025",
      "{O}": "\ue02d",
      "{T}": "\ue027",
      "{I}": "\ue02f"
    };

    Object.entries(iconMap).forEach(([key, icon]) => {
      const regex = new RegExp(this.escapeRegex(key), 'g');
      formatted = formatted.replace(regex, `<span class="altered-icon">${icon}</span>`);
    });

    formatted = formatted
      .replace(/ {2,}/g, '<p></p>')
      .replace(/\[\[([^\]]+)\]\]/g, '<b><u>$1</u></b>')
      .replace(/\[([^\]]+)\]/g, '<b>$1</b>');

    return `<span class="standard-text">${formatted}</span>`;
  }

  private escapeRegex(input: string): string {
    return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

}
