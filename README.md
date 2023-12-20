<!-- Header -->
<div id="top" align="center">
  <br />

  <!-- Logo -->
  <img src="https://git.zakscode.com/repo-avatars/2b4ee6ba1f2e2618bf7694e4a52fb56d1d0ea6abafa2dcbe496ab786b86d5a76" alt="Logo" width="200" height="200">

  <!-- Title -->
  ### Persist

  <!-- Description -->
  Typescript Library to Sync Variables with LocalStorage

  <!-- Repo badges -->
  [![Version](https://img.shields.io/badge/dynamic/json.svg?label=Version&style=for-the-badge&url=https://git.zakscode.com/api/v1/repos/ztimson/persist/tags&query=$[0].name)](https://git.zakscode.com/ztimson/persist/tags)
  [![Pull Requests](https://img.shields.io/badge/dynamic/json.svg?label=Pull%20Requests&style=for-the-badge&url=https://git.zakscode.com/api/v1/repos/ztimson/persist&query=open_pr_counter)](https://git.zakscode.com/ztimson/persist/pulls)
  [![Issues](https://img.shields.io/badge/dynamic/json.svg?label=Issues&style=for-the-badge&url=https://git.zakscode.com/api/v1/repos/ztimson/persist&query=open_issues_count)](https://git.zakscode.com/ztimson/persist/issues)

  <!-- Links -->

  ---
  <div>
    <a href="https://git.zakscode.com/ztimson/persist/wiki" target="_blank">Documentation</a>
    • <a href="https://git.zakscode.com/ztimson/persist/releases" target="_blank">Release Notes</a>
    • <a href="https://git.zakscode.com/ztimson/persist/issues/new?template=.github%2fissue_template%2fbug.md" target="_blank">Report a Bug</a>
    • <a href="https://git.zakscode.com/ztimson/persist/issues/new?template=.github%2fissue_template%2fenhancement.md" target="_blank">Request a Feature</a>
  </div>

  ---
</div>

## Table of Contents
- [Persist](#top)
	- [About](#about)
		- [Built With](#built-with)
	- [Setup](#setup)
		- [Production](#production)
		- [Development](#development)
	- [License](#license)

## About

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

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
1. Install persist: `npm i ztimson/persist`
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
3. Use persist:
```ts
import {Persist} from 'ztimson/persist';

// Proxy Object (Always access/modify using `.value`):
let theme = new Persist<string>('theme', {default: 'os'});

console.log(theme.value) // Output: os
theme.value = 'light'; // Changes will be synced to localStorage['theme'];
```
```ts
import {persist} from 'ztimson/persist';

// Using decorators
class Theme {
	@persist({key: 'theme', default: 'os'}) current!: string;
}
const theme = new Theme();

console.log(theme.current); // Output: light
theme.current = 'dark'; // You can ommit `.value` when using the decorator
```
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

## License

Copyright © 2023 Zakary Timson | Available under MIT Licensing

See the [license](./LICENSE) for more information.
