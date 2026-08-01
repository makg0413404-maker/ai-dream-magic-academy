import library from "./magic-spell-library.json";

export interface SpellTip {
  title: string;
  desc: string;
}

export interface Spell {
  id: string;
  title: string;
  category: string;
  tagline: string;
  spell: string;
  zh: string;
  tips: SpellTip[];
  needs_upload: boolean;
  image: string;
  isNew: boolean;
}

export interface SpellLibrary {
  version: number;
  updatedAt: string;
  freeCount: number;
  brand: { name: string; slogan: string; note: string };
  newIds: string[];
  sections: string[];
  spells: Spell[];
}

const data = library as SpellLibrary;

export function getSpells(): Spell[] {
  return data.spells;
}

export function getFreeCount(): number {
  return data.freeCount;
}

export function getSlogan(): string {
  return data.brand.slogan;
}

export function getNewestSpells(): Spell[] {
  return data.spells.filter((s) => s.isNew);
}

export default data;
