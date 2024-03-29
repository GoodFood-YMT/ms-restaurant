import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'restaurants'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('name').notNullable()
      table.boolean('enabled').notNullable()
      table.string('address').notNullable()
      table.string('city').notNullable()
      table.string('country').notNullable()
      table.string('zip_code').notNullable()
      table.float('lat').notNullable()
      table.float('lon').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
