import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { User } from './userModel';

export class Todo {
  @prop({ require: true })
  title: string;

  @prop()
  content: string;

  @prop({ ref: 'User' })
  user: Ref<User>;
}

const TodoModel = getModelForClass(Todo, {
  schemaOptions: {
    timestamps: true,
  },
});

export default TodoModel;
