import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TYPEORM_CONFIG } from './config/constants';
import databaseConfig from './config/database.config';
import { DepartamentosModule } from './departamentos/departamentos.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ProvinciasModule } from './provincias/provincias.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
        useFactory: (config: ConfigService) => config.get<TypeOrmModuleOptions>(TYPEORM_CONFIG)  

    //   useFactory: (config: ConfigService) => ({
    //     type: 'mysql',
    //     //host: config.get<string>(DATABASE_HOST),
    //     host: "bt92jm2wtirh9gsjubcj-mysql.services.clever-cloud.com",
    //     //port: parseInt(config.get<string>(DATABASE_PORT),10),
    //     port: 3306,
    //     //username: config.get<string>(DATABASE_USERNAME),
    //     username:"ubntojirihw5pi9t",
    //     //password: config.get<string>(DATABASE_PASSWORD),
    //     password:"pFmW47CldiR7WvE1cITp",
    //     //database: config.get<string>(DATABASE_NAME),
    //     database: "bt92jm2wtirh9gsjubcj",
    //     entities: [__dirname + "./**/**/*.entity{.ts,.js}"],
    //     autoLoadEntities: true,
    //     synchronize: true
    //   }) 
     }),  
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: '.env'
    }), DepartamentosModule, UsuarioModule, ProvinciasModule, 

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
