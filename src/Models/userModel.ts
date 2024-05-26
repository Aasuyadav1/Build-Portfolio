import mongoose, { Schema, Document, Model } from 'mongoose';


interface userType extends Document {
    name: string;
    email: string;
    password: string;
}


const userSchema: Schema<userType> = new Schema({
    name: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true,   
    },
    password: {
        type: String,
        required: true,
    }
});


const User = mongoose.models.User as Model<userType> || mongoose.model<userType>('User', userSchema);

export default User;
