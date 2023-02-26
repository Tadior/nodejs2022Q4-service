import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

export const WhitelistPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
});
