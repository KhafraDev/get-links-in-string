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

# Benchmark

*Note*: packages that use a basic regex with little validation or safety checks were not added to this benchmark. If you are parsing trusted inputs, it is likely faster to use a regex (however, you may encounter false positives or some links might not be matched). Also, this package does work with both email addresses and urls without schemes (optionally).

```
Running "Get links in string" suite...
Progress: 100%

  @khaf/get-links-in-string:
    873 588 ops/s, ±1.06%   | fastest

  get-urls:
    111 ops/s, ±2.56%       | slowest, 99.99% slower

  my-name-is-url:
    41 775 ops/s, ±1.64%    | 95.22% slower

Finished 3 cases!
  Fastest: @khaf/get-links-in-string
  Slowest: get-urls
```