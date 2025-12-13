// Al-Mahmūz (The Hamzated Verb) category assembly
import type { VerbCategory } from '../../../types/verb.types';
import { mahmoozMetadata } from './metadata';
import {
  akhazaPattern,
  saalaPattern,
  qaraPattern
} from './patterns';

export const mahmoozData: VerbCategory = {
  ...mahmoozMetadata,
  subCategories: [
    akhazaPattern,
    saalaPattern,
    qaraPattern
  ]
};
