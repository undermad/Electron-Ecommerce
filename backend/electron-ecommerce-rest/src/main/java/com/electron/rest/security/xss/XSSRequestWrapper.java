package com.electron.rest.security.xss;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ReadListener;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import org.owasp.encoder.Encode;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class XSSRequestWrapper extends HttpServletRequestWrapper
{

    private String sanitizedBody;

    public XSSRequestWrapper(HttpServletRequest request) throws IOException
    {
        super(request);

        if(request.getMethod().equalsIgnoreCase("GET")) return;
        String body = new String(request.getInputStream().readAllBytes());
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> bodyMap = objectMapper.readValue(body, Map.class);
        Map<String, Object> sanitizedMap = sanitizeJson(bodyMap);

        // Convert sanitized map back to JSON
        this.sanitizedBody = objectMapper.writeValueAsString(sanitizedMap);
    }

    @Override
    public ServletInputStream getInputStream() throws IOException
    {
        final byte[] bytes = sanitizedBody.getBytes();
        return new ServletInputStream()
        {
            private int lastIndexRetrieved = -1;
            private ReadListener readListener = null;

            @Override
            public boolean isFinished()
            {
                return (lastIndexRetrieved == bytes.length - 1);
            }

            @Override
            public boolean isReady()
            {
                return true;
            }

            @Override
            public void setReadListener(ReadListener readListener)
            {
                this.readListener = readListener;
            }

            @Override
            public int read() throws IOException
            {
                if (!isFinished()) {
                    int i = bytes[lastIndexRetrieved + 1];
                    lastIndexRetrieved++;
                    if (isFinished() && (readListener != null)) {
                        readListener.onAllDataRead();
                    }
                    return i;
                } else {
                    return -1;
                }
            }
        };
    }

    private Map<String, Object> sanitizeJson(Map<String, Object> input)
    {
        Map<String, Object> sanitizedMap = new HashMap<>();
        input.forEach((key, value) ->
        {
            if (value instanceof String) {
                sanitizedMap.put(key, sanitize((String) value));
            } else {
                sanitizedMap.put(key, value);
            }
        });
        return sanitizedMap;
    }

    private String sanitize(String input)
    {
        if (input == null) return null;
        
        var javaClean = Encode.forJava(input);
        var jsClean = Encode.forJavaScript(javaClean);
        return Encode.forHtml(jsClean);
    }
}