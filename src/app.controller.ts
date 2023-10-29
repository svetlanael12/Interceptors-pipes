import { Body, Controller, Get, HttpException, Param, Post, UseInterceptors, UsePipes } from '@nestjs/common'
import { AppService } from './app.service'
import { LoggingInterceptor } from './loggingInterceptor'
import { ValidationPipe } from './validatorPipe'
import { registerSchema } from './schemas/registerSchema'
import { JoiValidationPipe } from './joiValidatorPipe'
import { RegisterDto } from './books/dto/registerDto'

@UseInterceptors(LoggingInterceptor)
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        throw new HttpException('Oops', 401);
        return this.appService.getHello();
    }

    @Get('age/:age')
    getAgeInfo(@Param('age', ValidationPipe) age: string): string {
        return age;
    }

    @UsePipes(new JoiValidationPipe(registerSchema))
    @Post('/register')
    register(@Body() body: RegisterDto) {
        return body;
    }
}