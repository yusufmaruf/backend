/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { CarsModel, type Cars } from '../models/cars'

export class CarsRepository {
  async getMany (): Promise<Cars[]> {
    const cars = await CarsModel.query().where('deleted', false).withGraphFetched('lastModifiedBy')
    return cars
  }

  async getOne (id: string): Promise<Cars | undefined> {
    const cars = await CarsModel.query().findById(id)
    return cars
  }

  async create (carData: Cars): Promise<Cars> {
    const body = {
      ...carData,
      specs: JSON.stringify(carData.specs),
      options: JSON.stringify(carData.options)
    }
    const car = await CarsModel.query().insert(body).returning('*')
    return car
  }

  async update (id: string, carData: Cars): Promise<Cars | undefined> {
    const body = {
      ...carData,
      specs: JSON.stringify(carData.specs),
      options: JSON.stringify(carData.options)
    }
    const updatedCar = await CarsModel.query().findById(id).patch(body).returning('*')
    return updatedCar[0]
  }

  async delete (id: string): Promise<number> {
    try {
      const result = await CarsModel.query().deleteById(id)
      return result || 0 // Return 0 if result is falsy (undefined or null)
    } catch (error) {
      throw error // Handle the error as per your application's needs
    }
  }

  async softDelete (id: string, adminId: number): Promise<number> {
    try {
      const body = {
        deleted: true,
        last_modified_by: adminId
      }

      const result = await CarsModel.query().findById(id).patch(body)
      return result || 0 // Return 0 if result is falsy (undefined or null)
    } catch (error) {
      throw error // Handle the error as per your application's needs
    }
  }

  async getFilteredCars (date?: Date, capacity?: number): Promise<Cars[]> {
    let query = CarsModel.query().where('deleted', false)

    if (date) {
      query = query.where('availableAt', '<=', date)
    }

    if (capacity) {
      query = query.where('capacity', '>=', capacity)
    }
    const cars = await query
    return cars
  }
}
