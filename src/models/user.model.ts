import { model, Schema, Model, Document } from 'mongoose';
const possibleRoles = ['admin', 'student', 'staff'];

const validateEmail = (email: string) => {
  // eslint-disable-next-line no-useless-escape
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: [string];
  approved?: boolean;
  examAttempt?: [object];
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      validate: [validateEmail, 'Please fill a valid email address'],
      // eslint-disable-next-line no-useless-escape
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: [{ type: String, enum: possibleRoles }],
      required: true,
      default: ['student'],
    },
    approved: {
      type: Boolean,
      default: false,
    },
    examAttempt: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Exam',
      },
    ],
  },
  { timestamps: true },
);
export const UserModel: Model<IUser> = model('User', userSchema);
