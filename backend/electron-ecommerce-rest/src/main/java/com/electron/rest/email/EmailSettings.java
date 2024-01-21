package com.electron.rest.email;

import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Builder
@Getter
public class EmailSettings {
    private String receiver;
    private String subject;
    private String template;
    private Map<String, Object> variables;
}
