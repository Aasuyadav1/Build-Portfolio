import mongoose, { Schema, Document, Model } from 'mongoose';


interface userType extends Document {
    name: string;
    email: string;
}


const userSchema: Schema<userType> = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String, 
    },
});


const User = mongoose.models.User as Model<userType> || mongoose.model<userType>('User', userSchema);

export default User;
