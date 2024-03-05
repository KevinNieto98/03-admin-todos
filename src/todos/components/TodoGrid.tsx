'use client';

import { Todo } from "@prisma/client"
import * as todosApi from '@/todos/helper/todos';
import { useRouter } from "next/navigation";
import { TodoItem } from "./TodoItem";


interface Props {
  todos?: Todo[];
}


export const TodosGrid = ({ todos = [] }: Props) => {

  const router = useRouter();
 
  //*Actualiza el estado del TODO
  const toggleTodo = async(id: string, complete: boolean) => {

    const updatedTodo = await todosApi.updateTodo( id, complete );
    console.log({updatedTodo});
    //*Le dice a Next que recargue solo el componente 
    router.refresh();
  }

  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {
        todos.map( todo => (
          <TodoItem key={ todo.id } todo={ todo } toggleTodo={ toggleTodo }  />
        ))
      }
    </div>
  )
}