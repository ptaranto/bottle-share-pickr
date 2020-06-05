import { Controller, Get, Redirect } from '@nestjs/common';

import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { environment as env } from '../environments/environment';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('redirectToUntappdAuth')
  @Redirect('https://untappd.com/oauth/authenticate/')
  authenticateUntappdUser() {
    const untappdClientId = this.configService.get<string>('UNTAPPD_CLIENT_ID');
    const redirectUrl = env.untappdRedirectUrl;
    return {
      url: `https://untappd.com/oauth/authenticate/?client_id=${untappdClientId}&response_type=code&redirect_url=${redirectUrl}`
    };
  }
}
