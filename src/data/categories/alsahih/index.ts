// Al-Sahih (The Strong/Sound Verb) category assembly
import type { VerbCategory } from '../../../types/verb.types';
import { alsahihMetadata } from './metadata';
import {
  nasaraPattern,
  darabaPattern,
  samiaPattern,
  fatahaPattern,
  karumaPattern,
  hasibaPattern
} from './patterns';

export const alsahihData: VerbCategory = {
  ...alsahihMetadata,
  subCategories: [
    nasaraPattern,
    darabaPattern,
    samiaPattern,
    fatahaPattern,
    karumaPattern,
    hasibaPattern
  ]
};
