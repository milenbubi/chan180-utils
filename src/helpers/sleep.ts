/**
 ** Create pause before next code execution.
 ** You need to use the 'await' keyword when call this function.
 * @param delay  time in milliseconds.
 */
export function sleep(delay: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(resolve, delay)
  });
}