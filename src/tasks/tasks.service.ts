import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import {
  Donation,
  DonationDocument,
  DonationStatus,
} from 'src/donations/schemas/donation.schema';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectModel(Donation.name) private donationModel: Model<DonationDocument>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleExpiration() {
    this.logger.debug('Iniciando verificação de validade de doações...');

    const now = new Date();

    const result = await this.donationModel.updateMany(
      {
        status: DonationStatus.DISPONIVEL,
        expiration: { $lt: now },
      },
      {
        $set: { status: 'EXPIRADO' },
      },
    );

    if (result.modifiedCount > 0) {
      this.logger.log(
        `Rotina executada: ${result.modifiedCount} doações foram marcadas como EXPIRADO`,
      );
    } else {
      this.logger.debug('Nenhuma doação expirada encontrada hoje.');
    }
  }
}
