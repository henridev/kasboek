import { writable } from 'svelte/store';
import type { Row } from '../models';
import type { renderedFile } from '../models/RenderedFile';


export const files = writable<renderedFile[]>([]);
export const rows = writable<Row[]>([]);