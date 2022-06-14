package com.nautical99diary.nautical99diary.service;

import com.nautical99diary.nautical99diary.config.auth.PrincipalDetails;
import com.nautical99diary.nautical99diary.config.jwt.JwtDecoder;
import com.nautical99diary.nautical99diary.domain.Todo;
import com.nautical99diary.nautical99diary.dto.*;
import com.nautical99diary.nautical99diary.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static ch.qos.logback.classic.PatternLayout.HEADER_PREFIX;
import static com.nautical99diary.nautical99diary.config.handler.LoginSuccessHandler.TOKEN_TYPE;

@RequiredArgsConstructor
@Service
public class TodoService {

    private final JwtDecoder jwtDecoder;
    private final TodoRepository todoRepository;
    private final TodoRepositoryEM repositoryJPQL;

    public List<Todo> getTodo(String day, PrincipalDetails userDetails) {
        Long userId = userDetails.getUser().getId();
        return todoRepository.findAllByGoalDayAndUserID(day,userId);
    }

    public Todo createTodo(String day, TodoRequestDto todoRequestDto, PrincipalDetails userDetails) {
        Todo todo = new Todo(day, todoRequestDto,userDetails);
        todoRepository.save(todo);
        return todo;
    }

    public UpdateDto.TodoUpdate updateTodo(UpdateDto.TodoUpdate requestDto) {
        return repositoryJPQL.updateTodo(requestDto);
    }

    public UpdateDto.CompletionUpdate updateComplete(UpdateDto.CompletionUpdate requestDto) {
        return repositoryJPQL.updateComplete(requestDto);
    }

    public void deleteTodo(Long id) {
        repositoryJPQL.deleteTodo(id);
    }

    @Transactional
    public String test(String test) {
        validCheck(test);
        return jwtDecoder.decodeUsername(tokenProcess(test));
    }

    public String tokenProcess(String token) {
        String bearer = token.substring(
                0,
                TOKEN_TYPE.length()
        );

        if (bearer.equals("BEARER")) {
            return token.substring(
                    TOKEN_TYPE.length()
            );
        }
        throw new IllegalArgumentException("유효하지 않은 토큰");
    }

    private void validCheck(String token) {
        if (!validToken(token)) {
            throw new IllegalArgumentException("로그인이 필요한 기능입니다.");
        }
    }

    public boolean validToken(String token) {
        if (token == null || token.equals("") || token.length() < HEADER_PREFIX.length()) {
            return false;
        }
        return true;
    }
}
