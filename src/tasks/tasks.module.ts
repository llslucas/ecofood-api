import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import {
  Donation,
  DonationSchema,
} from 'src/donations/schemas/donation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Donation.name, schema: DonationSchema },
    ]),
  ],
  controllers: [],
  providers: [TasksService],
})
export class TasksModule {}
