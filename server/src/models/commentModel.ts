import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { User } from './userModel';

export class Comment {
  @prop({ name: 'message' })
  content: string;

  @prop({ ref: 'Comment' })
  parent_id: Ref<Comment>[];

  @prop({ ref: 'User' })
  user: Ref<User>;
  
  @prop()
  path: string;
}

const CommentModel = getModelForClass(Comment, {
  schemaOptions: {
    timestamps: true,
  },
});

export default CommentModel;
