import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Individuals extends BaseSchema {
  protected tableName = 'individuals'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('cns', 255).notNullable()
      table.string('cpf', 255).nullable()
      table.string('nome', 255).notNullable()
      table.dateTime('datanasc').notNullable()
      table.string('sexo').notNullable()
      table.string('color').notNullable()
      table.string('nomePai', 255).notNullable()
      table.string('nomeMae', 255).notNullable()
      table.string('nacionalidade', 255).notNullable()
      table.string('paisNascimento', 255).nullable()
      table.string('ufNascimento', 255).notNullable()
      table.boolean('freqEscola').defaultTo(false)
      // ! Referência ao curso de ensino mais elevado[Criar tabela]
      table.string('ocupacao', 255).notNullable()
      // ! Referência à situação do mercado de trabalho[Criar tabela]
      table.boolean('deficiente').defaultTo(false)
      // ! Referência à situação de deficiência[Criar tabela]
      table.boolean('gestante').defaultTo(false)
      // ! Referência à situação de peso[Criar tabela]
      table.boolean('fumante').defaultTo(false)
      table.boolean('alcolatra').defaultTo(false)
      table.boolean('usaDrogas').defaultTo(false)
      table.boolean('hipertenso').defaultTo(false)
      table.boolean('diabetes').defaultTo(false)
      table.boolean('derrame').defaultTo(false)
      table.boolean('infarto').defaultTo(false)
      table.boolean('doencaCoracao').defaultTo(false)
      // ! Referência à doença do coração [Criar tabela]
      table.boolean('doencaRim').defaultTo(false)
      // ! Referência à doença do rim [Criar tabela]
      table.boolean('doencaRespiratoria').defaultTo(false)
      // ! Referência à doença respiratória [Criar tabela]
      table.boolean('hanseniase').defaultTo(false)
      table.boolean('tuberculose').defaultTo(false)
      table.boolean('cancer').defaultTo(false)
      table.boolean('internacaoUltimos12Meses').defaultTo(false)
      table.string('causaInternacao').nullable()
      table.boolean('diagnosticoSaudeMental').defaultTo(false)
      table.boolean('acamado').defaultTo(false)
      table.boolean('domiciliado').defaultTo(false)
      table.boolean('semTeto').defaultTo(false)
      table.integer('family_id').notNullable()
      table.foreign('family_id').references('id').inTable('families')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
