<!-- Header -->
<div id="top" align="center">
  <br />

  <!-- Logo -->
  <img src="https://git.zakscode.com/repo-avatars/89f6c36caf75762ed9f7f98b69044b7db30da5230be7c5cea54f8a1158f1669a" alt="Logo" width="200" height="200">

  <!-- Title -->
  ### var-persist

  <!-- Description -->
  TypeScript: Sync variables with localStorage

  <!-- Repo badges -->
  [![Version](https://img.shields.io/badge/dynamic/json.svg?label=Version&style=for-the-badge&url=https://git.zakscode.com/api/v1/repos/ztimson/persist/tags&query=$[0].name)](https://git.zakscode.com/ztimson/persist/tags)
  [![Pull Requests](https://img.shields.io/badge/dynamic/json.svg?label=Pull%20Requests&style=for-the-badge&url=https://git.zakscode.com/api/v1/repos/ztimson/persist&query=open_pr_counter)](https://git.zakscode.com/ztimson/persist/pulls)
  [![Issues](https://img.shields.io/badge/dynamic/json.svg?label=Issues&style=for-the-badge&url=https://git.zakscode.com/api/v1/repos/ztimson/persist&query=open_issues_count)](https://git.zakscode.com/ztimson/persist/issues)

  <!-- Links -->

  ---
  <div>
    <a href="https://git.zakscode.com/ztimson/persist/releases" target="_blank">Release Notes</a>
    • <a href="https://git.zakscode.com/ztimson/persist/issues/new?template=.github%2fissue_template%2fbug.md" target="_blank">Report a Bug</a>
    • <a href="https://git.zakscode.com/ztimson/persist/issues/new?template=.github%2fissue_template%2fenhancement.md" target="_blank">Request a Feature</a>
  </div>

  ---
</div>

## Table of Contents
- [var-persist](#top)
	- [About](#about)
      - [Examples](#examples) 
      - [Built With](#built-with)
	- [Setup](#setup)
      - [Production](#production)
      - [Development](#development)
    - [Documentation](#documentation)
      - [Classes](#classes)
      - [Decorators](#decorators)
      - [Types](#types)
	- [License](#license)

## About

Var-Persist is an updated version of [webstorage-decorators](https://git.zakscode.com/ztimson/webstorage-decorators), a library which saves variables to local or session storage.

This library aims to improve upon the original's limitations by using the new [Proxy Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Improvements include:
 - Supports both OOP & Decorator patterns
 - Proxy object ensures all changes are tracked including impure functions
 - [Proto]types and functions can be preserved by passing the `type` option

**Disclaimer:** JavaScript's decorators are currently undergoing changes to the API overseen by [TC39](https://tc39.es) and currently have no support for property decorators. [Experimental decorators](https://www.typescriptlang.org/tsconfig#experimentalDecorators) must be enabled to work properly.

### Examples

Using objects:
```ts
import {Persist} from 'var-persist';

// Proxy Object (Always access/modify using `.value`):
let theme = new Persist<string>('theme', {default: 'os'});

console.log(theme.value) // Output: os
theme.value = 'light'; // Changes will be synced to localStorage['theme'];
```

Using decorators:
```ts
import {persist} from 'var-persist';

// Using decorators
class Theme {
	@persist({key: 'theme', default: 'os'}) current!: string;
}
const theme = new Theme();

console.log(theme.current); // Output: light
theme.current = 'dark'; // You can ommit `.value` when using the decorator
```

Advanced uses:

```ts
import {Persist} from 'var-persist';

// Options are the same for both the persist decorator and object:
let example = new Persist<string[]>('example', {
	storage: SessionStorage, // Use a different storage solution
	default: [], // Default value if stored value === undefined
	type: Array // Ensures [proto]type & methods are restored
});

// Callback when changes are made
example.watch(value => console.log(`Length - ${value.length}`));
example.value = [1, 2, 3];
// Output: Length - 3
example.value.pop(); // Impure changes are saved
// Output: Length - 2

```

### Built With
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)

## Setup

<details>
<summary>
  <h3 id="production" style="display: inline">
    Production
  </h3>
</summary>

#### Prerequisites
- [Node.js](https://nodejs.org/en/download)

#### Instructions
1. Install persist: `npm i var-persist`
2. Enable decorators inside `tsconfig.json`:
```json
{
	"compilerOptions": {
		"experimentalDecorators": true,
		...
	},
	...
}
```
3. Import & use, see [examples above](#examples)

</details>

<details>
<summary>
  <h3 id="development" style="display: inline">
    Development
  </h3>
</summary>

#### Prerequisites
- [Node.js](https://nodejs.org/en/download)

#### Instructions
1. Install the dependencies: `npm i`
2. Build library & docs: `npm build`
3. Run unit tests: `npm test`

</details>

## Documentation

<details>
<summary>
  <h3 id="classes" style="display: inline">
    Classes
  </h3>
</summary>

Create a proxy object which wraps your data so any changes can be intercepted & synced with storage.

Your data is stored under the `value` property and should always be accessed/modified through it.

#### Example

```ts
import {Persist} from 'var-persist'

const theme = new Persist('theme.current', {default: 'os'});

console.log(theme.value); // Output: os
theme.value = 'light'; // Make sure you always use .value to access/modify data

location.reload(); // Simulate refresh
console.log(theme.value); // Output: light
```

#### Constructor

`Persist<T>(key: string, options?: PersistOptions)`

| Argument  | Type                                             | Description                                                 |
|-----------|--------------------------------------------------|-------------------------------------------------------------|
| `key`     | `string`                                         | Primary key value will be stored under                      |
| `options` | [`PersistOptions<T>`](../Home.md#persistoptions) | Configure using [PersistOptions](../Home.md#persistoptions) |


###### Properties

| Name      | Type                                             | Description                                                 |
|-----------|--------------------------------------------------|-------------------------------------------------------------|
| `key`     | `string`                                         | Primary key value will be stored under                      |
| `options` | [`PersistOptions<T>`](../Home.md#persistoptions) | Configure using [PersistOptions](../Home.md#persistoptions) |
| `value`   | `T`                                              | Current value                                               |

#### Methods

##### clear

Delete value from storage

`clear(): void`

##### load

Load value from storage

`load(): void`

##### save

Save current value to storage

`save(): void`

##### watch

Callback function which is run when there are changes

`watch(fn: (value: T) => void): void`

###### Parameters

| Name | Type                    | Description                                                                           |
|------|-------------------------|---------------------------------------------------------------------------------------|
| `fn` | (`value`: `T`) => `any` | Callback will run on each change; it's passed the next value & it's return is ignored |

###### Returns

`() => void` - Function which will unsubscribe the watch/callback when called

##### toString

Return value as JSON string

`toString(): string`

###### Returns

`string` - Stringified JSON object

##### valueOf

Current value

`valueOf(): T`

###### Returns

`T` - Current value

</details>

<details>
<summary>
  <h3 id="decorators" style="display: inline">
    Decorators
  </h3>
</summary>

Create a proxy object which wraps your data so any changes can be intercepted & synced with storage.

Your data is stored under the value property and should always be accessed/modified through it.

#### Example

```ts
import {Persist} from 'var-persist';

class Theme {
	// This property will automatically sync with localStorage
	@Persist({default: 'os'}) current!: string;

	constructor() {
		console.log(this.current); // Output: os
		this.current == localStorage.getItem('Thene.current'); // True
		this.current = 'light';
		console.log(this.current); // Output: light
	}
}

```

#### Constructor

`persist(options?: {key?: string} & PersistOptions<T>)`

| Argument  | Type                                                               | Description                                                                                                                   |
|-----------|--------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| `options` | `{key: string}` & [`PersistOptions<T>`](../Home.md#persistoptions) | Configure using [PersistOptions](../Home.md#persistoptions). Storage key can also be ovverriden by passing `key` as an option |



</details>

<details>
<summary>
  <h3 id="types" style="display: inline">
    Types
  </h3>
</summary>

`PersistOptions<T>`

Configurable options to change persistence behavior

| Property   | Type      | Description                                                                            |
|------------|-----------|----------------------------------------------------------------------------------------|
| `default?` | `T`       | Default/Initial value if undefined                                                     |
| `storage?` | `Storage` | Storage implementation, defaults to LocalStorage. Can also be used with SessionStorage |
| `type?`    | `any`     | Force value to have \[proto\]type                                                      |

</details>

## License

Copyright © 2023 Zakary Timson | Available under MIT Licensing

See the [license](./LICENSE) for more information.
