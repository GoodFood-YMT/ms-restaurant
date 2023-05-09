import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Restaurant from 'App/Models/Restaurant'
import RestaurantFactory from 'Database/factories/RestaurantFactory'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const restaurants = await RestaurantFactory.createMany(200)
    await Restaurant.createMany(restaurants)
  }
}
