import type { Lang } from '../data/site';
import type { Dict } from './types';
import ja from './ja';
import en from './en';
import zh from './zh';
import vi from './vi';

const DICTS: Record<Lang, Dict> = { ja, en, zh, vi };

export function getDict(lang: Lang): Dict {
  return DICTS[lang];
}

export type { Dict };
