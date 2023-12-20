/**
 * Example storage backend. By default, persist will use localStorage however,
 * by implementing the Storage interface you can provide a custom backend to
 * store data anywhere you desire such as an external database or redis.
 *
 * @ignore
 */
export class MemoryStorage implements Storage {
	[name: string]: any;

	get length() { return Object.keys(this).length; }

	clear(): void { Object.keys(this).forEach(k => this.removeItem(k)); }

	getItem(key: string): string | null { return this[key]; }

	key(index: number): string | null { return Object.keys(this)[index]; }

	removeItem(key: string): void { delete this[key]; }

	setItem(key: string, value: string): void { this[key] = value; }
}
