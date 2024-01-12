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
        zipCode: '14600',
        country: 'France',
        lat: 49.4199028,
        lon: 0.2320076,
        enabled: true,
      },
      {
        id: 'clpbalmx2000008ju7wmv35ya',
        name: 'Sushi Shop',
        address: 'Rue du lion',
        city: 'Beuzeville',
        zipCode: '27210',
        country: 'France',
        lat: 49.3481743,
        lon: 0.3405806,
        enabled: true,
      },
      {
        id: 'clpbalmx2000008ju7wmv35yz',
        name: 'Sensei Sushi',
        address: 'Rue de la république',
        city: 'Pont-audemer',
        zipCode: '27467',
        country: 'France',
        lat: 49.3572571,
        lon: 0.5161323,
        enabled: true,
      },
      {
        id: 'clpbalmx2000008ju7wmv35ye',
        name: 'Tacos Avenue',
        address: 'Rue de la république',
        city: 'Pont-audemer',
        country: 'France',
        zipCode: '27467',
        lat: 49.3572571,
        lon: 0.5161323,
        enabled: true,
      },
      {
        id: 'clpbalmx2000008ju7wmv35yr',
        name: 'Kebab',
        address: 'Rue de la république',
        city: 'Pont-audemer',
        zipCode: '27467',
        country: 'France',
        lat: 49.3572571,
        lon: 0.5161323,
        enabled: true,
      },
      {
        id: 'clpbalmx2000008ju7wmv35yt',
        name: 'Pizza Hut',
        address: 'Rue de la république',
        city: 'Pont-audemer',
        zipCode: '27467',
        country: 'France',
        lat: 49.3572571,
        lon: 0.5161323,
        enabled: true,
      },
      {
        id: 'clpbalmx2000008ju7wmv35yy',
        name: 'MacDonalds',
        address: 'Avenue des champs elysées',
        city: 'Paris',
        zipCode: '75000',
        country: 'France',
        lat: 48.8656031,
        lon: 2.3205259,
        enabled: true,
      },
    ])
  }
}
