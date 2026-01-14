import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Donation, DonationDocument } from './schemas/donation.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class DonationsService {
  constructor(
    @InjectModel(Donation.name) private donationModel: Model<DonationDocument>,
  ) {}

  async create(
    createDonationDto: CreateDonationDto,
    userId: string,
  ): Promise<Donation> {
    const newDonation = new this.donationModel({
      ...createDonationDto,
      donor: userId,
      status: 'DISPONIVEL',
    });
    return newDonation.save();
  }

  async findAllByUser(userId: string): Promise<Donation[]> {
    return this.donationModel
      .find({ donor: userId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Donation> {
    const donation = await this.donationModel.findById(id).exec();

    if (!donation) {
      throw new NotFoundException(`Doação com ID ${id} não encontrada.`);
    }

    return donation;
  }

  async remove(id: string, userId: string): Promise<void> {
    const donation = await this.donationModel.findById(id).exec();

    if (!donation) {
      throw new NotFoundException(`Doação com ID ${id} não encontrada.`);
    }

    const donorId = donation.donor as Types.ObjectId;

    if (donorId.toString() !== userId) {
      throw new NotFoundException(
        `Doação com ID ${id} não encontrada para o usuário.`,
      );
    }

    await this.donationModel.findByIdAndDelete(id).exec();
  }
}
