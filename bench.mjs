import b from 'benny';

import { getLinksInString } from './index.js';
import getUrls from 'get-urls';
import Urls from 'my-name-is-url';

const string =
	'Hello! This [link](https://en.wikipedia.org/wiki/Hyperlink) contains multiple URLs in it - such as ' +
	'https://www.google.com! I wonder which is the fastest?';

await b.suite(
	'Get links in string',
	b.add('@khaf/get-links-in-string', () => {
		getLinksInString(string);
	}),
	b.add('get-urls', () => {
		getUrls(string);
	}),
	b.add('my-name-is-url', () => {
		Urls(string).get();
	}),
	b.cycle(),
	b.complete()
);