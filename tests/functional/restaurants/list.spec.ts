import { test } from '@japa/runner'

test.group('Restaurants list', () => {
  // Write your test here
  test('get a paginated list of restaurants', async ({ client }) => {
    const response = await client.get('/restaurant')

    console.log(response.body())
  })
})
