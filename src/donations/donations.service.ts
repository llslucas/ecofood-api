import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateDonationDto } from './dto/create-donation.dto';
import { GetDonationsQueryDto } from './dto/get-donations-query.dto';
import {
  Donation,
  DonationDocument,
  DonationStatus,
} from './schemas/donation.schema';

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
      status: DonationStatus.DISPONIVEL,
    });
    return newDonation.save();
  }

  async findAllByUser(userId: string): Promise<Donation[]> {
    return this.donationModel
      .find({ donor: userId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findNearby(query: GetDonationsQueryDto): Promise<Donation[]> {
    const { lat, long, radius } = query;

    return this.donationModel
      .find({
        status: DonationStatus.DISPONIVEL,
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [long, lat],
            },
            $maxDistance: radius * 1000, // Converter km para metros
          },
        },
      })
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

  async reserve(id: string, userId: string): Promise<Donation> {
    const updatedDonation = await this.donationModel.findOneAndUpdate(
      {
        _id: id,
        status: DonationStatus.DISPONIVEL,
      },
      {
        $set: {
          status: DonationStatus.RESERVADO,
          collectedBy: userId,
        },
      },
      { new: true },
    );

    if (!updatedDonation) {
      throw new ConflictException(
        'Esta doação não está mais disponível ou não existe.',
      );
    }

    return updatedDonation;
  }
}
