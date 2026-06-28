import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';
import { Todo } from 'generated/prisma/client';
import { TodoInterceptor } from './interceptors/todo.interceptor';


@Controller('todo')
@UseInterceptors(TodoInterceptor)
export class TodoController {
    constructor(
        private readonly todoService: TodoService
    ) { }

    @Get()
    getAllTodo(): Promise<Todo[]> {
        return this.todoService.allTodo({})
    }

    @Get('/:id')
    getTodo(@Param('id') id: String): Promise<Todo | null> {
        return this.todoService.todo({
            where: { id: +id }
        })
    }

    @Post('/create')
    createTodo(@Body() createTodo: CreateTodoDTO): Promise<Todo> {
        return this.todoService.createTodo(createTodo)
    }

    @Post('/update/:id')
    updateTodo(@Param('id') id: String, @Body() updateTodo: UpdateTodoDto): Promise<Todo> {
        return this.todoService.updateTodo({
            where: { id: +id },
            data: updateTodo
        })
    }

    @Post('/delete/:id')
    deleteTodo(@Param('id') id: String): Promise<Todo> {
        return this.todoService.deleteTodo({ id: +id })
    }
}
