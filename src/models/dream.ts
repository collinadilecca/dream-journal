import mongoose, { Document, Schema } from 'mongoose';

export enum DreamType {
    happy = "happy",
    sad = "sad",
    exciting = "exciting",
    scary = "scary"
}

export interface IDream extends Document {
    title: string;
    description: string;
    date: Date;
    type: DreamType;
}

const DreamSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

export const Dream = mongoose.model<IDream>('dream', DreamSchema);

