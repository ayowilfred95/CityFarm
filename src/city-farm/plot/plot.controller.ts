import { Body, Controller, Post, Request, UseGuards,Get } from '@nestjs/common';
import { PlotService } from './plot.service';
import { RolesGuard } from '../greenhouse-owner/greenhouse-uthentication/roles.guard';
import { JwtAuthGuard } from '../greenhouse-owner/greenhouse-uthentication/jwt-auth.guard';
import { Roles } from '../greenhouse-owner/greenhouse-uthentication/roles.decorator';
import { CreatePlotDto } from '../dto/create-plot.dto';

@Controller('plot')
export class PlotController {
    constructor(private readonly plotService: PlotService){}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('greenhouseOwner')
    @Post('create')
    async createPlot(@Request() req, @Body() createPlotDto: CreatePlotDto) {
    const ownerId = req.user.userId;
    return this.plotService.createPlot(ownerId, createPlotDto);
    }

    @Get('get')
    async getAllPolts() {
        return this.plotService.getAllPlots()
    }

    
}
