import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type DonationDocument = Donation & Document;

export enum DonationStatus {
  DISPONIVEL = 'DISPONIVEL',
  COLETADO = 'COLETADO',
  RESERVADO = 'RESERVADO',
  EXPIRADO = 'EXPIRADO',
}

@Schema({ timestamps: true })
export class Donation {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  quantity: string;

  @Prop({ required: true })
  expiration: Date;

  @Prop({ default: DonationStatus.DISPONIVEL, enum: DonationStatus })
  status: DonationStatus;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  donor: User | Types.ObjectId;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  location: {
    type: string;
    coordinates: number[];
  };

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  collectedBy?: User;
}

export const DonationSchema = SchemaFactory.createForClass(Donation);

DonationSchema.index({ location: '2dsphere' });
