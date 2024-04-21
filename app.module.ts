import { Module  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
 //importa la entidad user

@Module({
  imports: [
    //Configura la concexion a la base de datos Mysql
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      database: 'test',
      entities: [User],
      synchronize: true, 
}),
    //Configura ClientsModule y registra MAIL_SERVICE
    ClientsModule.register([
      {
        name: 'MAIL_SERVICE', 
        transport: Transport.TCP,
        options: {
          host: 'localhost', //Debemos asegurarnos de que estamos usando bien la direccion correcta para el servicio
          port: 3001, //debemos asegurarnos de que usemos bien el puerto correcto para el servicio
        },
      },
  ]),
  TypeOrmModule.forFeature([User]), //aqui se importa la entidad user 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}