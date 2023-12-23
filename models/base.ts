/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AjvValidator, Model } from 'objection'

export class ModelWithValidator extends Model {
  static createValidator () {
    return new AjvValidator({
      onCreateAjv: (ajv) => {
        // Here you can modify the `Ajv` instance.
      },
      options: {
        allErrors: false,
        validateSchema: false,
        ownProperties: false
      }
    })
  }
}
