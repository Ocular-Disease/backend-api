import { Response, Request, NextFunction } from 'express';
import {Patient } from '../model/patient';

import patientService from '../service/patient.service';
import tokenService from '../service/token.service';
import { Role } from '../types/role.enum';

class PatientController {
	public async getAll(req: Request, res: Response) {
		res.status(200).json(await patientService.getAll());
	}

	public async getById(req: Request, res: Response) {
		const patientId = req.params.id;

		res.status(200).json(await patientService.getById(patientId));
	}

	public async create(req: Request, res: Response) {
        const { firstName, lastName,gender,cin,number,email,address,height,weight } = req.body;

        const patient = new Patient();

        patient.firstName = firstName;
        patient.lastName = lastName;
        patient.gender = gender;
        patient.cin = cin;
        patient.number = number;
        patient.email = email;
        patient.address = address;
        patient.height = height;
        patient.weight = weight;

        const data = await patientService.create(patient);

        console.log("patient created");

        res.status(201).json({
            message: "patient created",
            patient: data
        });
    }

	public async delete(req: Request, res: Response) {
		const patientId = req.params.id;

		await patientService.delete(patientId);

		res.status(200).json();
	}

	public async update(req: Request, res: Response) {
		const patientId = req.params.id;
		const patient = req.body;

        res.status(200).json(await patientService.update(patientId, patient));
	}

	
}

export default new PatientController();
