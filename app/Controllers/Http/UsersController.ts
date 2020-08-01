import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersController {
  public async store ({ request, response }: HttpContextContract){
    const validateSchema = schema.create({
      name: schema.string(),
      email: schema.string({ trim: true}, [
        rules.email(), rules.unique({ column: 'email', table: 'users' }),
      ]),
      password: schema.string({ trim: true}),
      passwordConfirmation: schema.string({trim: true}, [
        rules.confirmed('password'),
      ]),
      cns: schema.string({trim: true}),
      cbo: schema.string({trim: true}),
    })

    const validated = await request.validate({
      schema: validateSchema,
      messages: {
        'name.required': 'Nome necessário!',
        'email.required': 'Email necessário!',
        'password.required': 'Senha necessária!',
        'passwordConfirmation.required' : 'Confirmação de senha necessária!',
        'cns.required':'Cartão nacional do SUS necessário!' ,
        'cbo.required': 'Código do profissional obrigatório!',
      }})

    delete validated.passwordConfirmation

    const user = await User.create({
      ...validated,
    })

    return response.json(user)
  }
}
