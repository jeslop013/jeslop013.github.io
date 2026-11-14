// Science posts: English files live in src/content/science/,
// Spanish files in src/content/science/es/. A translation = same file name in the other folder.
export type Lang = 'en' | 'es';
export const langOf = (id: string): Lang => (id.startsWith('es/') ? 'es' : 'en');
export const baseId = (id: string) => id.replace(/^es\//, '');
export const counterpartId = (id: string) => (langOf(id) === 'es' ? baseId(id) : `es/${id}`);
