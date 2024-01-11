import Redis from '@ioc:Adonis/Addons/Redis'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Restaurant from 'App/Models/Restaurant'
import { getAddressCoords } from 'App/Utils/functions'
import CreateRestaurantValidator from 'App/Validators/RestaurantValidator'
import UpdateRestaurantValidator from 'App/Validators/UpdateRestaurantValidator'

export default class RestaurantsController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const q = request.input('q', '')

    let query = Database.from('restaurants')

    if (q) {
      query = query.where('name', 'ilike', `%${q}%`).orWhere('city', 'ilike', `%${q}%`)
    }

    const result = await query.orderBy('created_at').paginate(page, limit)

    response.json(result)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateRestaurantValidator)
    const coords = await getAddressCoords(
      `${payload.address}, ${payload.zipCode}, ${payload.city}, ${payload.country}`
    )
    const restaurant = await Restaurant.create({ ...payload, lat: coords.lat, lon: coords.lon })
    const keys = await Redis.keys('restaurant:*')
    if (keys.length > 0) {
      await Redis.del(...keys)
    }
    response.created(restaurant)
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.params().id
    const cache = await Redis.get(`restaurant:${id}`)
    if (cache) {
      return JSON.parse(cache)
    }
    const restaurant = await Restaurant.findByOrFail('id', id)
    await Redis.set(`restaurant:${id}`, JSON.stringify(restaurant))
    response.json(restaurant)
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const payload = await request.validate(UpdateRestaurantValidator)
    const restaurant = await Restaurant.findOrFail(id)
    if (restaurant !== null) {
      if (payload.name) restaurant.name = payload.name
      if (payload.enabled) restaurant.enabled = payload.enabled
      if (
        payload.city !== restaurant.city ||
        payload.address !== restaurant.address ||
        payload.zipCode !== restaurant.zipCode ||
        payload.country !== restaurant.country
      ) {
        if (payload.address) restaurant.address = payload.address
        if (payload.city) restaurant.city = payload.city
        if (payload.zipCode) restaurant.zipCode = payload.zipCode
        if (payload.country) restaurant.country = payload.country

        const coords = await getAddressCoords(
          `${restaurant.address}, ${restaurant.zipCode}, ${restaurant.city}, ${restaurant.country}`
        )
        restaurant.lat = coords.lat
        restaurant.lon = coords.lon
      }
      await restaurant.save()

      const keys = await Redis.keys('restaurant:*')
      if (keys.length > 0) {
        await Redis.del(...keys)
      }

      response.json({
        message: `restaurant ${restaurant.name} is updated`,
      })
    } else {
      response.json({
        message: `cannot find restaurant with id ${id}`,
      })
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.params().id
    await Restaurant.query().where('id', id).delete()

    const keys = await Redis.keys('restaurant:*')
    if (keys.length > 0) {
      await Redis.del(...keys)
    }

    response.json({
      message: `restaurant with id ${id} is deleted`,
    })
  }
}
