import { Location } from "src/locations/entities/location.entity";
import { Manager } from "../entities/manager.entity";
import { IsString, IsEmail, IsNumber, MaxLength, IsObject, IsOptional } from "class-validator";

export class CreateManagerDto extends Manager{
    @IsString()
    @MaxLength(80)
    managerFullName: string;
    @IsString()
    @IsEmail()
    managerEmail: string;
    @IsNumber()
    managerSalary: number;
    @IsString()
    @MaxLength(16)
    managerPhoneNumber: string;
    @IsObject()
    @IsOptional()
    location: Location
}
