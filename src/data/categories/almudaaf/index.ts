// Al-Mudā'af (The Double Lettered Verb) category assembly
import type { VerbCategory } from '../../../types/verb.types';
import { almudaafMetadata } from './metadata';
import {
  sabbaPattern,
  darabaPattern,
  karamaPattern
} from './patterns';

export const almudaafData: VerbCategory = {
  ...almudaafMetadata,
  subCategories: [
    sabbaPattern,
    darabaPattern,
    karamaPattern
  ]
};
