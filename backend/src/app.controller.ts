import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@ApiTags('Server')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Checks server health by initiating a Hello World request
   */
  @Get()
  @ApiOkResponse({
    description: 'Returns a Hello World message',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
