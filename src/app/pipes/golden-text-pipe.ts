import { Pipe, PipeTransform } from '@angular/core';
import { TextChunk } from '../interfaces/text/text-chunk';

@Pipe({
  name: 'goldenText'
})
export class GoldenTextPipe implements PipeTransform {

  transform(value: string): Array<TextChunk> {
    if (!value) return [];

    const chunks: Array<TextChunk> = [];
    const regex = /#(.*?)#/g;
    let currentIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(value)) !== null) {
      if (match.index > currentIndex) {
        chunks.push({ text: value.slice(currentIndex, match.index), isGold: false });
      }
      chunks.push({ text: match[1], isGold: true });
      currentIndex = regex.lastIndex;
    }

    if (currentIndex < value.length) {
      chunks.push({ text: value.slice(currentIndex), isGold: false });
    }

    return chunks;
  }

}
