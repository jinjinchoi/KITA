import { Module } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqController } from './faq.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { FaqBoard } from './entity/faq.entity';

@Module({
  imports: [SequelizeModule.forFeature([FaqBoard])],
  controllers: [FaqController],
  providers: [FaqService],
})
export class FaqModule {}
