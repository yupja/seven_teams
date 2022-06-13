package com.nautical99diary.nautical99diary.service;

import com.nautical99diary.nautical99diary.config.auth.PrincipalDetails;
import com.nautical99diary.nautical99diary.domain.Todo;
import com.nautical99diary.nautical99diary.dto.*;
import com.nautical99diary.nautical99diary.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class  TodoService {

    private final TodoRepository todoRepository;
    private final TodoRepositoryEM repositoryJPQL;

    public List<Todo> getTodo(String day, PrincipalDetails userDetails) {
        Long userId = userDetails.getUser().getId();
        return todoRepository.findAllByGoalDayAndUserID(day,userId);
    }

    public Todo createTodo(String day, TodoRequestDto todoRequestDto, PrincipalDetails principalDetails) {
        Todo todo = new Todo(day, todoRequestDto,principalDetails);
        todoRepository.save(todo);
        return todo;
    }

    public UpdateDto.TodoUpdate updateTodo(Long id, UpdateDto.TodoUpdate requestDto,PrincipalDetails principalDetails) {
        Todo todo = todoRepository.findAllById(id);
        if(todo.getUserID().equals(principalDetails.getUser().getId())){
            return repositoryJPQL.updateTodo(requestDto);
        }else{
            throw new IllegalArgumentException("회원정보가 일치하지 않습니다");
        }


    }

    public UpdateDto.CompletionUpdate updateComplete(Long id,UpdateDto.CompletionUpdate requestDto,PrincipalDetails principalDetails) {
        Todo todo = todoRepository.findAllById(id);
        if(todo.getUserID().equals(principalDetails.getUser().getId())){
            return repositoryJPQL.updateComplete(requestDto);
        }else{
            throw new IllegalArgumentException("회원정보가 일치하지 않습니다");
        }


    }

    public void deleteTodo(Long id,PrincipalDetails principalDetails) {
        Todo todo = todoRepository.findAllById(id);
        if(todo.getUserID().equals(principalDetails.getUser().getId())){
            repositoryJPQL.deleteTodo(id);
        }else{
            throw new IllegalArgumentException("회원정보가 일치하지 않습니다");
        }


    }
}
