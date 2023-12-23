/* eslint-disable @typescript-eslint/class-literal-property-style */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type ModelObject, Model } from 'objection'
import { ModelWithValidator } from './base'
import { UserModel } from './users'

export class CarsModel extends ModelWithValidator {
  id!: number
  plate!: string
  manufacture!: string
  image!: string
  model!: string
  type!: string
  description!: string
  transmission!: string
  capacity!: number
  rentPerDay!: number
  availableAt!: string
  available!: boolean
  year!: number
  last_modified_by!: number
  deleted!: boolean
  options!: string
  specs!: string

  static get tableName () {
    return 'cars'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      properties: {
        plate: { type: 'string', minLength: 5 },
        model: { type: 'string', minLength: 1 },
        price: { type: 'number', minimum: 300_000 }
      }
    }
  }

  static relationMappings = {
    lastModifiedBy: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: 'cars.last_modified_by',
        to: 'users.id'
      }
    }
  }
}

export type Cars = ModelObject<CarsModel>
