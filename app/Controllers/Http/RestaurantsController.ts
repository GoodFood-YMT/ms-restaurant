import Redis from '@ioc:Adonis/Addons/Redis'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Restaurant from 'App/Models/Restaurant'
import CreateRestaurantValidator from 'App/Validators/RestaurantValidator'

export default class RestaurantsController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 2
    // const cache = await Redis.get(`restaurant:${page}`)
    // // const cache = await Redis.get(`restaurant`)
    // if (cache) {
    //   return JSON.parse(cache)
    // }
    const result = await Database.from('restaurants').orderBy('created_at').paginate(page, limit)
    // await Redis.set(`restaurant:all:${page}`, JSON.stringify(result))
    response.json(result)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateRestaurantValidator)
    const restaurant = await Restaurant.create(payload)
    // await Redis.set('restaurant:all:*', '')
    // await Redis.set('restaurant', '')
    response.created(restaurant)
  }

  public async show({ request, response }: HttpContextContract) {
    const id = Number(request.params().id)
    // const cache = await Redis.get(`restaurant`)
    // if (cache) {
    //   let cachedRestaurants = JSON.parse(cache)
    //   console.log(cachedRestaurants)
    //   return cachedRestaurants.findOrFail((r) => r.id === id)
    // }
    const restaurant = await Restaurant.findOrFail(id)
    response.json(restaurant)
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const payload = await request.validate(CreateRestaurantValidator)
    const restaurant = await Restaurant.findOrFail(id)
    if (restaurant !== null) {
      restaurant.name = payload.name
      restaurant.address = payload.address
      restaurant.enabled = payload.enabled
      restaurant.city = payload.city
      restaurant.country = payload.country

      await restaurant.save()
      await Redis.set('restaurant', '')
      response.json(`restaurant ${restaurant.name} are updated`)
    } else {
      response.json(`cannot find restaurant with id ${id}`)
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.params().id
    await Restaurant.query().where('id', id).delete()
    await Redis.set('restaurant', '')
    response.json(`restaurant with id ${id} deleted`)
  }
}
