# @khaf/get-links-in-string

A simple package that returns an array of links in a string. Useful for detecting scams in a fast, reliable way that doesn't use a regex under the hood.

This package is a binding for [linkify](https://crates.io/crates/linkify).

# Usage

See [tests](./__test__/index.spec.mjs) for more uses.

```js
import { getLinksInString } from '@khaf/get-links-in-string'

const message = 'This is a message that contains [a link](https://www.google.com/)'
const links = getLinksInString(message) // ['https://www.google.com/']

const message_2 = 'This contains a [link](google.com) without a protocol!'
const links_2 = getLinksInString(message_2, false) // ['google.com']

const message_3 = 'This contains [links](https://www.google.com) and [more links](https://www.yahoo.com)'
const links_3 = getLinksInString(message_3) // ['https://www.google.com', 'https://www.yahoo.com']
```

# API

```ts
declare function getLinksInString (
	message: string,
	requireScheme = true
): string[]
```