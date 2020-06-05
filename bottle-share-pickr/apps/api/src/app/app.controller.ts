import axios from 'axios';
import { Controller, Get, Query, Redirect } from '@nestjs/common';

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

  @Get('retrieveUntappdToken')
  @Redirect('')
  async authorizeUntappdUser(@Query('code') code: string) {
    const redirectUrl = env.untappdRedirectUrl;
    const untappdClientId = this.configService.get<string>('UNTAPPD_CLIENT_ID');
    const untappdClientSecret = this.configService.get<string>(
      'UNTAPPD_CLIENT_SECRET'
    );
    const url = `https://untappd.com/oauth/authorize/?client_id=${untappdClientId}&client_secret=${untappdClientSecret}&response_type=code&redirect_url=${redirectUrl}&code=${code}`;
    const tokenResponse: any = await axios.get(url);
    console.log(tokenResponse.data);

    const token = tokenResponse.data.response.access_token;
    return { url: `${env.appAuth}?access_token=${token}` };
  }
}
