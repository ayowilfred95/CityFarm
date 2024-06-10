import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';


@Injectable()
export class ItemsService {
  // create a private constructor
  constructor( 
    @InjectRepository(Item) private itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager
  ) {}
  async create(createItemDto: CreateItemDto): Promise<{ item: Item, message: string }> {
    const listing = new Listing({
      ...createItemDto.listing,
    });
    
    const newItem = this.itemsRepository.create({
      ...createItemDto,
      comments: [],
      listing,
    });
    const savedItem = await this.itemsRepository.save(newItem);
    const message = `Item created successfully`
    return { message, item: savedItem }

    // const newItem = new Item(createItemDto)
    // const item = await this.entityManager.save(newItem);
    // return item;
  }

  async findAll(): Promise<{item:Item[], message:string}> {
    const items = await this.itemsRepository.find({
      relations: {listing: true},
    });
    const message = `All Items retrieved successfully`
    return {message, item: items}
    
  }

  async findOne(id: number): Promise<{item: Item, message: string}> {
    try {
      const findOneItem = await this.itemsRepository.findOne({
        where: {id}, 
        relations: {listing: true, comments:true},
      });
      if(!findOneItem) throw new NotFoundException({message:"Item not found"})
        const message = `Successfully retrieved item with ID ${id}`
        return {message, item:findOneItem}
      
    } catch (error) {
      throw error
    }
    
    
  }

   async update(id: number, updateItemDto: UpdateItemDto): Promise<{item:Item, message:string}> {

   try {

    const item = await this.itemsRepository.findOne({
      where: { id },
      relations: ['listing'],
   });

    if(!item) throw new NotFoundException({message:"No item found"})
      Object.assign(item,updateItemDto);
    const updatedItem = await this.itemsRepository.save(item)
     const message = `Item with  ID ${id} updated successfully`
     return {message, item:updatedItem}
   } catch (error) {
    throw error
   }
  }

  async remove(id: number): Promise<string> {

   try {
    const item = await this.itemsRepository.delete({id})
    if(item.affected === 0) throw new NotFoundException(`Item with ID ${id} not found`);
      return `Item with ID ${id} delected successfully`
   } catch (error) {
    throw error;
   }
      
  }
}
