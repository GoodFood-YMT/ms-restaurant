import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Restaurant from 'App/Models/Restaurant'

export default class extends BaseSeeder {
  public async run() {
    await Restaurant.createMany([
      {
        id: 'clpbalmx2000008ju7wmv35yg',
        name: 'MacDonalds',
        address: 'Rue du dauphin',
        city: 'Honfleur',
        country: 'France',
        enabled: true,
      },
      {
        id: 'clpbalmx2000008ju7wmv35ya',
        name: 'Sushi Shop',
        address: 'Rue du lion',
        city: 'Beuzeville',
        country: 'France',
        enabled: true,
      },
      {
        id: 'clpbalmx2000008ju7wmv35yz',
        name: 'Sensei Sushi',
        address: 'Rue de la république',
        city: 'Pont-audemer',
        country: 'France',
        enabled: true,
      },
      {
        id: 'clpbalmx2000008ju7wmv35ye',
        name: 'Tacos Avenue',
        address: 'Rue de la république',
        city: 'Pont-audemer',
        country: 'France',
        enabled: true,
      },
      {
        id: 'clpbalmx2000008ju7wmv35yr',
        name: 'Kebab',
        address: 'Rue de la république',
        city: 'Pont-audemer',
        country: 'France',
        enabled: true,
      },
      {
        id: 'clpbalmx2000008ju7wmv35yt',
        name: 'Pizza Hut',
        address: 'Rue de la république',
        city: 'Pont-audemer',
        country: 'France',
        enabled: true,
      },
      {
        id: 'clpbalmx2000008ju7wmv35yy',
        name: 'MacDonalds',
        address: 'Avenue des champs elysées',
        city: 'Paris',
        country: 'France',
        enabled: true,
      },
    ])
  }
}
