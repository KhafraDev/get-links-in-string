#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

extern crate linkify;

use linkify::{LinkFinder};
use napi::{Env, bindgen_prelude::Array, Error};

#[napi]
#[allow(dead_code)]
fn get_links_in_string(env: Env, input: String, require_scheme: Option<bool>) -> Result<Array, Error> {
  let mut finder = LinkFinder::new();
  finder.url_must_have_scheme(require_scheme.unwrap_or(true));
  let links: Vec<_> = finder.links(&input).collect();

  let mut arr = env.create_array(links.len() as u32).unwrap();
  let mut index = 0;

  for link in links.iter() {
    if let Err(err) = arr.set(index, link.as_str()) {
      return Err(Error::from_reason(err.reason));
    }

    index += 1;
  }

  Ok(arr)
}