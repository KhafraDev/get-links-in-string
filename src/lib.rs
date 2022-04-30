#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

extern crate linkify;

use linkify::{LinkFinder};
use napi::{Env, bindgen_prelude::Array, Error};

#[napi]
fn get_links_in_string(env: Env, input: String) -> Result<Array, Error> {
  let finder = LinkFinder::new();
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