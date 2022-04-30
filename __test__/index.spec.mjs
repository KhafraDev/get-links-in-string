import test from 'ava';

import { getLinksInString } from '../index.js';

test('With NO links returns EMPTY array', (t) => {
	t.deepEqual(getLinksInString('Don\'t click on scam links!'), []);

	t.deepEqual(getLinksInString('a.b', false), []); // invalid domain not detected
});

test('With 1 link IT returns the link', (t) => {
	t.deepEqual(
		getLinksInString('Click on this link! https://free.money/scam'),
		['https://free.money/scam']
	);

	t.deepEqual(
		getLinksInString('This link (https://mylink.link) is in the middle of the string. Wow!'),
		['https://mylink.link']
	);

	t.deepEqual(
		getLinksInString('[Click Here](https://www.google.com/) - works in markdown!'),
		['https://www.google.com/']
	);

	t.deepEqual(
		getLinksInString('Don\'t expand (Discord) - <https://www.google.com>'),
		['https://www.google.com']
	);
});

test('Unicode domains are detected', (t) => {
	t.deepEqual(
		getLinksInString('Unicode domains work too! https://i❤️.ws'),
		['https://i❤️.ws']
	);

	t.deepEqual(
		getLinksInString('Long ones work, too - https://xn--i-7iq.ws/'),
		['https://xn--i-7iq.ws/']
	);
});

test('Without protocol, links are still detected WHEN requireScheme = false', (t) => {
	t.deepEqual(
		getLinksInString('Join my Discord server discord.gg/scam', false),
		['discord.gg/scam']
	);

	t.deepEqual(
		getLinksInString('a.bc www.c.de/e-f-g-h?i=jk', false),
		['a.bc', 'www.c.de/e-f-g-h?i=jk']
	);

	t.deepEqual(
		getLinksInString('https://a.b c.de f.gh?i=jk http://l.mno', false),
		['https://a.b', 'c.de', 'f.gh?i=jk', 'http://l.mno']
	);
});

test('With MULTIPLE links, returns ALL links', (t) => {
	t.deepEqual(
		getLinksInString('1. https://www.google.com 2. https://www.youtube.com'),
		['https://www.google.com', 'https://www.youtube.com']
	);

	t.deepEqual(
		getLinksInString('1. https://www.google.com 2. youtube.com'),
		['https://www.google.com']
	);

	t.deepEqual(
		getLinksInString('1. https://a.b 2. c.d 3. https://e.f'),
		['https://a.b', 'https://e.f']
	);
});