import { Context } from 'fresh'

function fail(message: string) {
  throw new Error(message)
}

// deno-lint-ignore require-await
export default async function ExamplePage(
  _ctx: Context<unknown>,
) {
  console.log('this runs on line 11')
  console.log('this runs on line 12')
  fail('on line 13')

  return (
    <div />
  )
}
