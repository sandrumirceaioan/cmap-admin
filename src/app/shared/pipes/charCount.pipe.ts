import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'charCount'})
export class CharCount implements PipeTransform {
    transform(str: string): string {
        let regex = /(<([^>]+)>)/ig;
        let result = str.replace(regex, "");
    return result.length.toString();
    }
}