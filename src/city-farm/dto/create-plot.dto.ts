export class CreatePlotDto {
    name: string;
    price: number;
    dimensions: string;
    location: string;
    description: string;
    supportedCrops: string[];
    availability : boolean;
    photos?: string[];
  }
  