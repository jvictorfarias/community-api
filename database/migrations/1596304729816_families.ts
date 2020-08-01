import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Families extends BaseSchema {
  protected tableName = 'families'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.integer('acs_id').notNullable()
      table.foreign('acs_id').references('id').inTable('users')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
