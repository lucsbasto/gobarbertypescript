import {startOfHour} from 'date-fns'
import {getCustomRepository} from 'typeorm'
import Appointment from '../models/Appointments'
import AppointmentRepository from '../repositories/AppointmentsRepository'

interface Request {
  provider: string,
  date: Date
}

class CreateAppointmentService {
  async registerAppointment({date, provider}: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmentRepository.findByDate(appointmentDate);
    if (findAppointmentInSameDate) {
      throw new Error('This appointment is already booked')
    }
    const appointment = appointmentRepository.create({provider, date: appointmentDate});
    await appointmentRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService