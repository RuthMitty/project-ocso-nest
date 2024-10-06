import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {v4 as uuid} from "uuid";
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ){}

  create(createEmployeeDto: CreateEmployeeDto) {
  const employee = this.employeeRepository.save(createEmployeeDto);
  return employee;
  }

  findAll() {
    // retornar todos los empleados
    return this.employeeRepository.find();
  }

  findByLocation(id: number){
    return this.employeeRepository.findBy({
      location: {
        locationId: id
      }
    })
  }

  findOne(id: string) {
    const employee = this.employeeRepository.findOneBy({
      idEmployee: id
    })
    if(!employee) throw new NotFoundException()
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      idEmployee: id,
      ...updateEmployeeDto
    })
    this.employeeRepository.save(employeeToUpdate)
    return employeeToUpdate;
  }

  remove(id: string) {
    this.findOne(id)
    this.employeeRepository.delete({
      idEmployee: id
    })

    return{
      message: `El empleado identificado con ${id} fue eliminado`
    }
  }
}
