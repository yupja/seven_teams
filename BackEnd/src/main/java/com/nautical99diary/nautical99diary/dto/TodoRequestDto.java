package com.nautical99diary.nautical99diary.dto;

import lombok.*;

import javax.persistence.Column;

@Setter
@Getter
@NoArgsConstructor
public class TodoRequestDto {
    private Long id;
    private boolean checkComplete;
    private String todo;
    private String goalDay;
}
