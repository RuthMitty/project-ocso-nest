import {IsString, MaxLength, IsArray, ArrayNotEmpty } from "class-validator";
import {Location} from "../entities/location.entity"

export class CreateLocationDto extends Location {
    @IsString()
    @MaxLength(25)
    locationName: string;
    @IsString()
    @MaxLength(160)
    locationAddress: string;
    @IsArray()
    @ArrayNotEmpty()
    locationLatLng: number[]
}

// 4:44