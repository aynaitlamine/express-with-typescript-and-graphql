import {v4} from "uuid";
import {GqlContext} from "./GqlContext";
import {todos} from "./db";

interface User {
  id: string;
  username: string;
  email?: string;
}
interface Todo {
  id: string;
  title: string;
  description?: string;
}

const resolvers = {
  Query: {
    getUser: async (
      parent: any,
      args: {
        id: string;
      },
      ctx: GqlContext,
      info: any
    ): Promise<User> => {
      return {
        id: v4(),
        username: "dave",
        email: "Dave_Abbott@hotmail.com",
      };
    },
    getTodos: async (
      parent: any,
      args: null,
      ctx: GqlContext,
      info: any
    ): Promise<Array<Todo>> => {
      return [
        {
          id: v4(),
          title: "First todo",
          description: "First todo description",
        },
        {
          id: v4(),
          title: "Second todo",
          description: "Second todo description",
        },
        {
          id: v4(),
          title: "Third todo",
        },
      ];
    },
  },
  Mutation: {
    addTodo: async (
      parent: any,
      args: {
        title: string;
        description: string;
      },
      ctx: GqlContext,
      info: any
    ): Promise<Todo> => {
      const newTodo = {
        id: v4(),
        title: args.title,
        description: args.description,
      };

      todos.push(newTodo);

      return todos[todos.length - 1];
    },
  },
};

export default resolvers;
