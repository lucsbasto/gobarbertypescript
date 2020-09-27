import { parseISO } from 'date-fns';
import {Request, Response, Router} from 'express'
import {getCustomRepository} from 'typeorm'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'
const appointmentsRouter = Router();


appointmentsRouter.get('/appointments', async (req: Request, res: Response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentsRepository.find()
  return res.status(200).json(appointments)
})

appointmentsRouter.post('/appointments', async (req: Request, res: Response) => {
  try{
    const {date, provider} = req.body;
    const parsedDate = parseISO(date)
    const createAppointmentService = new CreateAppointmentService()
    const appointment = await createAppointmentService.registerAppointment({date: parsedDate, provider: provider});
    return res.status(201).json(appointment)
  }catch(error){
    return res.status(400).json({error: error.message})
  }
})

export default appointmentsRouter