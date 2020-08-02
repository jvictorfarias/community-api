import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Hash from '@ioc:Adonis/Core/Hash'
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

    return response.status(200).json(user)
  }

  public async update ({ request, response, auth }: HttpContextContract){
    const user = auth.user || await auth.authenticate()

    user.name = request.input('name') || user.name
    user.cbo = request.input('cbo') || user.cbo
    user.cns = request.input('cns') || user.cns

    if(request.input('email')){
      request.validate({
        schema: schema.create({
          email: schema.string({ trim: true}, [
            rules.email(),
            rules.unique({ column: 'email', table: 'users' }),
          ]),
        }),
      })
    }

    if(request.input('newPassword')){
      const verifyPassword = await Hash.verify(
        request.input('password'),
        user.password
      )

      if(!verifyPassword){
        return response.status(404).json({
          status: 'error',
          message: 'Senha atual não pôde ser verificada.'})
      }

      request.validate({
        schema: schema.create({
          password: schema.string({ trim: true}),
          newPassword: schema.string({ trim: true }),
          confirmPassword: schema.string({ trim: true }, [
            rules.confirmed('newPassword'),
          ]),
        }),
      })

      user.password = await Hash.make(request.input('newPassword'))
    }

    await user.save()

    return response.status(200).json(user)
  }

  public async destroy ({ response, auth }: HttpContextContract){
    const user = auth.user || await auth.authenticate()

    await user.delete()

    return response.status(204).noContent()
  }
}

