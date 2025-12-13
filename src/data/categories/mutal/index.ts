// Al-Mu'tall (The Weak Verb) category assembly
import type { VerbCategory } from '../../../types/verb.types';
import { amutalMetadata } from './metadata';
import {
  wajadaPattern,
  yanaaPattern,
  taabaPattern,
  khaabaPattern,
  daaaPattern,
  bakaaaPattern
} from './patterns';

export const amutalData: VerbCategory = {
  ...amutalMetadata,
  subCategories: [
    wajadaPattern,
    yanaaPattern,
    taabaPattern,
    khaabaPattern,
    daaaPattern,
    bakaaaPattern
  ]
};
