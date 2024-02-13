import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtGuard } from './auth/guard/jwt.guard';

@ApiTags('Audit App LMS  Health Check')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Healt Check response' })
  @ApiResponse({ status: 200, description: 'Successful operation' })
  getHello(): string {
    return this.appService.getHello();
  }
}
