import Restaurant from 'App/Models/Restaurant'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Restaurant, ({ faker }) => {
  return {
    name: faker.name.fullName(),
    enabled: true,
    address: faker.address.street(),
    city: faker.address.city(),
    country: faker.address.country(),
  }
}).build()
