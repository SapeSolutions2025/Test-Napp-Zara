import { unstable_cache as next_unstable_cache } from 'next/cache'
import { cache } from 'react'

export const unstable_cache = (
  callback,
  key,
  options,
) => cache(next_unstable_cache(callback, key, options))

export const revalidate = 60 * 60 * 24