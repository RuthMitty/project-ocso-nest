import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from 'uuid';
import { CreateEmployeeDto } from 'src/employees/dto/create-employee.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private products: CreateProductDto[] = [{
    productId: uuid(),
    productName: "Sabritas",
    price: 29,
    countSeal: 3,
    provider: uuid(),
  },
  {
    productId: uuid(),
    productName: "Coca Cola 600ml",
    price: 40,
    countSeal: 3,
    provider: uuid()
  },{
    productId: uuid(),
    productName: "Agua Ciel 1L",
    price: 15,
    countSeal: 2,
    provider: uuid()
  }
]

  create(createProductDto: CreateProductDto) {
    createProductDto.productId = uuid()
    createProductDto.provider = uuid()
    this.products.push(createProductDto)
    return createProductDto;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const producto = this.products.find((p)=>p.productId===id);
    if(!producto) throw new NotFoundException();
    return producto;

  }

  findByProvider(id: string){
    const productos = this.products.filter((p)=>p.provider === id);
    if(productos.length === 0) throw new NotFoundException()
    return productos;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let productToUpdate = this.findOne(id);
    productToUpdate = {
      ...productToUpdate,
      ...updateProductDto
    }
    this.products = this.products.map((p)=>{
      if(p.productId === id){
        p === productToUpdate
      }
      return p
    })
    return productToUpdate;
  }

  remove(id: string) {
    this.findOne(id)
    this.products = this.products.filter((p)=> p.productId !== id)
    return this.products;
  }
}
