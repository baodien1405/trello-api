import { ValidationError } from 'joi'

export const slugify = (val: string) => {
  if (!val) return ''

  return val
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-') // remove consecutive hyphens
}

export const getErrorMessage = (error: ValidationError) => {
  const message = error.details.map((i) => i.message.replace(/['"]+/g, '')).join(',')
  return message
}
