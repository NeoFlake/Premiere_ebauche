import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconMappingService {

  private readonly map: Record<string, string> = {
    "  ": "Coucou",
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
    "{R}": "\ue024",
    "{J}": "\ue026",
    "{D}": "\ue029",
    "{F}": "\ue037",
    "{M}": "\ue025",
    "{O}": "\ue02d",
    "{T}": "\ue027"
  };

  replacePlaceholders(text: string): string {
    return text.replace(/\{[A-Z0-9]+\}/g, (match) => this.map[match] || match);
  }

}
