import mongoose, {Model, Schema} from "mongoose";

export const AccessLogModelSchema = new Schema({
    page_id: String,
    title: {
        type: String,
        default: '',
        required: false
    },
    date: String,
    ip: String,
    city: {
        type: String,
        default: '',
        required: false
    },
    country: {
        type: String,
        default: '',
        required: false
    },
    region: {
        type: String,
        default: '',
        required: false
    },
    latitude: {
        type: String,
        default: '',
        required: false
    },
    longitude: {
        type: String,
        default: '',
        required: false
    },
});

