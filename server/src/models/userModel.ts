import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
  pre,
  DocumentType,
  index,
  Ref,
} from '@typegoose/typegoose';
import argon2 from 'argon2';

import log from '../utils/logger';
import { Todo } from './todoModel';

export const privateFields = [
  'password',
  '__v',
  'verificationCode',
  'passwordResetCode',
  'verified',
];

@pre<User>('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const hash = await argon2.hash(this.password);
  this.password = hash;
  return;
})
@index({ email: 1 })
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User {

  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true, default: '548671' })
  verificationCode: string;

  @prop()
  passwordResetCode: string | null;

  @prop({ default: false })
  verified: boolean;

  @prop({ ref: 'Todo' })
  todoList: Ref<Todo>[];

  @prop({ ref: 'Comment' })
  commentList: Ref<Comment>[];

  async validatePassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      return await argon2.verify(this.password, candidatePassword);
    } catch (e) {
      log.error(e, 'Could not validate password');
      return false;
    }
  }
}

const UserModel = getModelForClass(User);
export default UserModel;
