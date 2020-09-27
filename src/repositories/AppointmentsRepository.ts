import {EntityRepository, Repository} from 'typeorm'

import Appointment from '../models/Appointments'

@EntityRepository(Appointment)
export default class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findedAppointment = await this.findOne({
      where: {date}
    })
    return findedAppointment || null
  }
}