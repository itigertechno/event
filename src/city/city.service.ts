import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CityService {

  constructor(private readonly httpService: HttpService) {}


  create(createCityDto: CreateCityDto) {
    return 'This action adds a new city';
  }

  async getAddressSuggestions(query: string): Promise<any> {
    const url = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
    const apiKey = '4418dc327d59b3beb366d0282e29d4c13be9faab';
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Token ${apiKey}`,
    };

    const body = { query };

    const response = await firstValueFrom(
      this.httpService.post(url, body, { headers }),
    );

    return response.data;
  }

  findAll() {
    return `This action returns all city`;
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
