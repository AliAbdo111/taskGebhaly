import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import{ConfigService} from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config/dist';
import { MongooseModule} from "@nestjs/mongoose";
@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: '.env',
      isGlobal:true}),
      MongooseModule.forRoot(process.env.DB_URL),
  AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
