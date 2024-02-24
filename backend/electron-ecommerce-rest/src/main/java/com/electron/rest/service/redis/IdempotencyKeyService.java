package com.electron.rest.service.redis;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class IdempotencyKeyService {

    private final StringRedisTemplate redisTemplate;

    public IdempotencyKeyService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }


    public Boolean checkAndStore(IdempotencyKey key) {
        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        Boolean result = ops.setIfAbsent(key.value(), key.value());
        redisTemplate.expire(key.value(), 24, TimeUnit.HOURS);
        return Boolean.TRUE.equals(result);
    }


}
