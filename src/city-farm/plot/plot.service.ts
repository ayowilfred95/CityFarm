import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plot } from '../entities/plot.entity';
import { Repository } from 'typeorm';
import { GreenhouseOwner } from '../entities/greenhouse-owner.entity';
import { CreatePlotDto } from '../dto/create-plot.dto';


@Injectable()
export class PlotService {

    constructor(
        @InjectRepository(Plot) private plotRepository:Repository<Plot>,
        @InjectRepository(GreenhouseOwner) private greenhouseOwnerRepository: Repository<GreenhouseOwner>,
    ){}

    async createPlot(ownerId: number, createPlotDto: CreatePlotDto): Promise<{plot: Plot, message:string}> {
        try {
            const greenhouseOwner = await this.greenhouseOwnerRepository.findOne({where:{id: ownerId}});
              if (!greenhouseOwner) throw new UnauthorizedException('Invalid greenhouse owner');

              const plot = this.plotRepository.create({
                ...createPlotDto,
                owner: greenhouseOwner
             })

             await this.plotRepository.save(plot)

             return {message:"Plot created successfully",plot,}
        } catch (error) {
            throw error
        }
    }
}
