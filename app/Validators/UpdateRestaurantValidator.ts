import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateRestaurantValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional([rules.maxLength(250)]),
    enabled: schema.boolean.optional(),
    address: schema.string.optional(),
    city: schema.string.optional(),
    country: schema.string.optional(),
  })

  public messages: CustomMessages = {
    'name:maxLength': 'The Name is too long. Max 250 char.',
  }
}
