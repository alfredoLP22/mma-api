import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FightersModule } from './fighters/fighters.module';
import { Fighter } from './fighters/entities/fighter.entity';
import { EventModule } from './event/event.module';
import { Event } from './event/entities/event.entity';
import { FightModule } from './fight/fight.module';
import { RankingModule } from './ranking/ranking.module';
import { Fight } from './fight/entities/fight.entity';
import { Ranking } from './ranking/entities/ranking.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USER,
      database: process.env.DB_NAME,
      entities: [Fighter, Event, Fight, Ranking],
      synchronize: true,
    }),
    FightersModule,
    EventModule,
    FightModule,
    RankingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
