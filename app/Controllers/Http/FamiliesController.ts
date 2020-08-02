import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Family from 'App/Models/Family'

export default class FamiliesController {
  public async store ({ request, response, auth }: HttpContextContract){
    const user = auth.user || await auth.authenticate()

    const family = new Family()
    family.name = request.input('name')

    await family.related('user').associate(user)

    return response.status(200).json(family)
  }

  public async show ({ params, response }: HttpContextContract){
    const familyId = params.id

    const family = await Family
      .query()
      .where('id', familyId)
      .preload('user')

    return response.status(200).json(family)
  }

  public async update ({ request, response, params }: HttpContextContract){
    const familyId = params.id

    const family = await Family.findOrFail(familyId)

    family.name = request.input('name') || family.name

    await family.save()

    return response.status(200).json(family)
  }

  public async destroy ({ params, response, auth }: HttpContextContract){
    const user = auth.user || await auth.authenticate()

    const familyId = params.id

    const family = await Family.findOrFail(familyId)

    if(!(user.id === family.acs_id)){
      return response.status(400).json({
        status: 'error',
        message: 'Essa família não está sob seus cuidados.',
      })
    }

    await family.delete()

    return response.status(204)
  }
}
