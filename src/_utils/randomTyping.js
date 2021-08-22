import { random } from '../_utils'

export function randomTyping(string = '') {
  let n = string.length / 1800

  if (n < 1) {
    n = 1
  }

  return random(n - 0.2, n + 0.2) * 1000
}
