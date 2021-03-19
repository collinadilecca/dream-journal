import mongoose, { Document, Schema } from 'mongoose';

export enum DreamType {
    happy = "happy",
    sad = "sad",
    exciting = "exciting",
    scary = "scary"
}

// Making a POJO for strict type checking
export interface IDream extends Document {
    title: string;
    description: string;
    date: Date;
    type: DreamType;
}

// Defining a schema for dreams
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
    },
    type: {
        type: String,
        enum: DreamType,
        required: true
    }
});

// Exposing the model to the application
export const Dream = mongoose.model<IDream>('dream', DreamSchema);

