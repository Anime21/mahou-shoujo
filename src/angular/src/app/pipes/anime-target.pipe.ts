import { Pipe, PipeTransform } from '@angular/core';
import { EnumTarget } from '../enums/enum-target.enum';

@Pipe({
  name: 'animeTarget'
})
export class AnimeTargetPipe implements PipeTransform {

  private _targets: Map<EnumTarget, string> = new Map<EnumTarget, string>([
    [EnumTarget.FemaleChild, "Meninas"],
    [EnumTarget.MaleChild, "Meninos"],
    [EnumTarget.Child, "Crianças"],
    [EnumTarget.FemaleTeen, "Garotas adolescentes"],
    [EnumTarget.MaleTeen, "Garotos adolescentes"],
    [EnumTarget.Teen, "Adolescentes"],
    [EnumTarget.FemaleYoungAdult, "Mulheres jovens"],
    [EnumTarget.MaleYoungAdult, "Homens jovens"],
    [EnumTarget.YoungAdult, "Jovens adultos"],
    [EnumTarget.FemaleAdult, "Mulheres adultas"],
    [EnumTarget.MaleAdult, "Homens adultos"],
    [EnumTarget.Adult, "Adultos"],
    [EnumTarget.Family, "Toda a família"]
  ]);

  transform(value: EnumTarget): string {
    return this._targets.get(value) || "";
  }

}
