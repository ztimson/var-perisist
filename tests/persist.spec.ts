import {MemoryStorage, Persist, persist} from "../src";

const storage = new MemoryStorage();
(<any>global).localStorage = storage;

describe('Persistence Library', () => {
	beforeEach(() => storage.clear());

	describe('Proxy Object', () => {
		test('Null Values', () => {
			let persist = new Persist('test');
			expect(persist.value).toBeUndefined();
			persist.value = null;
			persist = new Persist('test');
			expect(persist.value).toBeNull();
			persist.value = 0;
			persist = new Persist('test');
			expect(persist.value).toBe(0);
			persist.value = false;
			persist = new Persist('test');
			expect(persist.value).toBeFalsy();
			persist.value = undefined;
			persist = new Persist('test');
			expect(persist.value).toBeUndefined();
		});
		test('Number Value', () => {
			const value = 0;
			let persist = new Persist('test');
			persist.value = value;
			persist = new Persist('test');
			expect(persist.value).toBe(value);
		});
		test('Boolean Value', () => {
			const value = true;
			let persist = new Persist('test');
			persist.value = value;
			persist = new Persist('test');
			expect(persist.value).toStrictEqual(value);
		});
		test('String Value', () => {
			const value = 'abc';
			let persist = new Persist('test');
			persist.value = value;
			persist = new Persist('test');
			expect(persist.value).toBe(value);
		});
		test('Array Value', () => {
			const value = [9, 8, 7];
			let persist = new Persist('test');
			persist.value = value;
			persist = new Persist('test');
			expect(persist.value).toEqual(value);
		});
		test('Object Value', () => {
			const value = {a: 0, b: 'c'};
			let persist = new Persist<any>('test');
			persist.value = value;
			persist = new Persist('test');
			expect(persist.value).toEqual(value);
			persist.value.b = 'test';
			persist = new Persist('test');
			expect(persist.value).toEqual({...value, b: 'test'});
		});
		test('Default Value', () => {
			let persist = new Persist('test');
			persist.value = undefined;
			persist = new Persist('test', {default: true});
			expect(persist.value).toBeTruthy();
		});
		test('Type/Prototype', () => {
			class TestObj {
				constructor(public a: number, public b: number) { }

				sum() { return this.a + this.b; }
			}

			const a = 1, b = 3;
			const value = new TestObj(a, b);
			let persist = new Persist<TestObj>('test');
			persist.value = value;
			persist = new Persist<TestObj>('test', {type: TestObj});
			expect(persist.value).toEqual(value);
			expect(persist.value.sum()).toEqual(a + b);
		});
		test('Impure Functions', () => {
			let persist = new Persist<number[]>('test');
			persist.value = [1];
			persist.value.push(2);
			persist = new Persist('test');
			expect(persist.value).toEqual([1, 2]);
		});
	});
});
