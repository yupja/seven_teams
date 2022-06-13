package com.nautical99diary.nautical99diary.controller;

import com.nautical99diary.nautical99diary.config.auth.PrincipalDetails;
import com.nautical99diary.nautical99diary.domain.Todo;

import com.nautical99diary.nautical99diary.dto.*;
import com.nautical99diary.nautical99diary.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class TodoController {

    private final TodoService todoService;

    @GetMapping("/todo/{goalDay}")
    public List<Todo> getTodo(@PathVariable String goalDay,@AuthenticationPrincipal PrincipalDetails principalDetails) {
        return todoService.getTodo(goalDay,principalDetails);
    }

    @PostMapping("/todo/{goalDay}")
    public Todo createTodo(@PathVariable String goalDay, @RequestBody TodoRequestDto todoRequestDto,@AuthenticationPrincipal PrincipalDetails principalDetails) {
        return todoService.createTodo(goalDay, todoRequestDto,principalDetails);

    }

    /**
     * updateTodo: todo 내용 업데이트
     *
     * @param id
     * @param goalDay
     * @param todoUpdate
     * @return UpdateDto.TodoUpdate
     */
    @PostMapping("/todo/{goalDay}/{id}")
    public UpdateDto.TodoUpdate updateTodo
    (@PathVariable Long id, @PathVariable String goalDay, @RequestBody UpdateDto.TodoUpdate todoUpdate,@AuthenticationPrincipal PrincipalDetails principalDetails) {
        // 컨트롤러에서 데이터 가공하는 게 맞을지?
        todoUpdate.setId(id);
        return todoService.updateTodo(id,todoUpdate,principalDetails);
    }

    /**
     * updateComplete: 완료 여부 업데이트
     *
     * @param id
     * @param goalDay
     * @param completetionUpdate
     * @return UpdateDto.CompletionUpdate
     */
    @PutMapping("/todo/{goalDay}/{id}")
    public UpdateDto.CompletionUpdate updateComplete
    (@PathVariable Long id, @PathVariable String goalDay, @RequestBody UpdateDto.CompletionUpdate completetionUpdate,@AuthenticationPrincipal PrincipalDetails principalDetails) {
        completetionUpdate.setId(id);
        return todoService.updateComplete(id,completetionUpdate,principalDetails);
    }

    @DeleteMapping("/todo/{goalDay}/{id}")
    public void deleteTodo(@PathVariable Long id, @PathVariable String goalDay,@AuthenticationPrincipal PrincipalDetails principalDetails) {
        todoService.deleteTodo(id,principalDetails);
    }
}
