package com.electron.rest.scheduler;

import com.electron.rest.repository.PasswordRecoveryTokenRepository;
import jakarta.transaction.Transactional;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ClearPasswordRecoveryTokens implements Scheduler {

    PasswordRecoveryTokenRepository passwordRecoveryTokenRepository;

    public ClearPasswordRecoveryTokens(PasswordRecoveryTokenRepository passwordRecoveryTokenRepository) {
        this.passwordRecoveryTokenRepository = passwordRecoveryTokenRepository;
    }

    @Transactional
    @Override
    @Async
    @Scheduled(fixedRateString = "${schedule-clear-password-recovery-token-millisecond}")
    public void performTask() {
        passwordRecoveryTokenRepository.deleteExpiredTokens();
    }
}
