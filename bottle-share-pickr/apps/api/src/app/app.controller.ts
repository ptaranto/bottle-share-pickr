import axios from 'axios';
import { Controller, Get, Query, Redirect } from '@nestjs/common';

import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { environment as env } from '../environments/environment';
import {
  UNTAPPD_AUTHENTICATE_URL,
  UNTAPPD_AUTHORIZE_URL,
} from '@bottle-share-pickr/api-interface';

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
  @Redirect(UNTAPPD_AUTHENTICATE_URL)
  authenticateUntappdUser() {
    const untappdClientId = this.configService.get<string>('UNTAPPD_CLIENT_ID');
    const redirectUrl = env.untappdRedirectUrl;
    return {
      url: `${UNTAPPD_AUTHENTICATE_URL}?client_id=${untappdClientId}&response_type=code&redirect_url=${redirectUrl}`,
    };
  }

  @Get('retrieveUntappdToken')
  @Redirect(UNTAPPD_AUTHORIZE_URL)
  async authorizeUntappdUser(@Query('code') code: string) {
    const redirectUrl = env.untappdRedirectUrl;
    const untappdClientId = this.configService.get<string>('UNTAPPD_CLIENT_ID');
    const untappdClientSecret = this.configService.get<string>(
      'UNTAPPD_CLIENT_SECRET'
    );
    const url = `${UNTAPPD_AUTHORIZE_URL}?client_id=${untappdClientId}&client_secret=${untappdClientSecret}&response_type=code&redirect_url=${redirectUrl}&code=${code}`;
    const tokenResponse: any = await axios.get(url);

    const token = tokenResponse.data.response.access_token;
    return { url: `${env.appAuth}?access_token=${token}` };
  }
}
