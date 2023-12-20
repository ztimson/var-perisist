/**
 * Configurations persistence behaviour
 *
 * @group Options
 */
export type PersistOptions<T> = {
	/** Default/Initial value if undefined */
	default?: T,
	/** Storage implementation, defaults to LocalStorage */
	storage?: Storage,
	/** Force value to have prototype */
	type?: any,
}

/**
 * Sync variable's value with persistent storage (LocalStorage by default)
 *
 * @example
 * ```ts
 * const theme = new Persist('theme.current', {default: 'os'});
 * console.log(theme.value); // Output: os
 *
 * theme.value = 'light'; // Any changes to `.value` will automatically sync with localStorage
 *
 * location.reload(); // Simulate refresh
 * console.log(theme.value); // Output: light
 * ```
 */
export class Persist<T> {
	/** Private value field */
	private _value!: T;

	/** Current value or default if undefined */
	get value(): T { return this._value !== undefined ? this._value : <T>this.options?.default; }

	/** Set value with proxy object wrapper to sync future changes */
	set value(v: T | undefined) {
		if(v == null || typeof v != 'object') this._value = <T>v;
		// @ts-ignore
		else this._value = new Proxy<T>(v, {
			get: (target: T, p: string | symbol): any => {
				const f = typeof (<any>target)[p] == 'function';
				if(!f) return (<any>target)[p];
				return (...args: any[]) => {
					const value = (<any>target)[p](...args);
					this.save();
					return value;
				};
			},
			set: (target: T, p: string | symbol, newValue: any): boolean => {
				(<any>target)[p] = newValue;
				this.save();
				return true;
			}
		});
		this.save();
	}

	/** Where data gets physically stored */
	private readonly storage!: Storage;
	/** Listeners which should be notified on changes */
	private watches: { [key: string]: Function } = {};

	/**
	 * @param {string} key Unique key value will be stored under
	 * @param {PersistOptions<T>} options Configure using {@link PersistOptions}
	 */
	constructor(public readonly key: string, public options: PersistOptions<T> = {}) {
		this.storage = options.storage || localStorage;
		this.load();
	}

	/** Delete value from storage */
	clear() {
		this.storage.removeItem(this.key);
	}

	/** Save current value to storage */
	save() {
		if(this._value === undefined) this.clear();
		else this.storage.setItem(this.key, JSON.stringify(this._value));
		this.notify(this.value);
	}

	/** Load value from storage */
	load() {
		if(this.storage[this.key] != undefined) {
			let value = JSON.parse(<string>this.storage.getItem(this.key));
			if(value != null && typeof value == 'object' && this.options.type) value.__proto__ = this.options.type.prototype;
			this.value = value;
		} else this.value = this.options.default || <T>undefined;
	}

	/** Callback to listen for changes */
	watch(fn: (value: T) => any): () => void {
		const index = Object.keys(this.watches).length;
		this.watches[index] = fn;
		return () => { delete this.watches[index]; };
	}

	/** Return value as JSON string */
	toString() { return JSON.stringify(this.value); }

	/** Return raw value */
	valueOf() { return this.value?.valueOf(); }

	/** Notify listeners of change */
	private notify(value: T) {
		Object.values(this.watches).forEach(watch => watch(value));
	}
}

/**
 * Sync class property with persistent storage (LocalStorage by default)
 *
 * @example
 * ```ts
 * class ThemeEngine {
 *   @persist({default: 'os'}) current!: string;
 * }
 *
 * const theme = new ThemeEngine();
 * console.log(theme.current) // Output: os
 *
 * theme.current = 'light'; //Any changes will be automatically saved to localStorage
 *
 * location.reload(); // Simulate refresh
 * console.log(theme.current) // Output: light
 * ```
 *
 * @group Decorators
 * @param {PersistOptions<T> & {key?: string}} options Configure using {@link PersistOptions}
 * @returns Decorator function
 */
export function persist<T>(options?: PersistOptions<T> & { key?: string }) {
	return (target: any, prop: any) => {
		const key = options?.key || `${target.constructor.name}.${prop.toString()}`;
		const wrapper = new Persist(key, options);
		Object.defineProperty(target, prop, {
			get: function() { return wrapper.value; },
			set: function(v) { wrapper.value = v; }
		});
	};
}
