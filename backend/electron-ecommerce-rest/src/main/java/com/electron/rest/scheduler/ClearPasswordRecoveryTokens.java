package com.electron.rest.scheduler;

import com.electron.rest.repository.auth.PasswordRecoveryTokenRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class ClearPasswordRecoveryTokens implements Scheduler {

    PasswordRecoveryTokenRepository passwordRecoveryTokenRepository;

    public ClearPasswordRecoveryTokens(PasswordRecoveryTokenRepository passwordRecoveryTokenRepository) {
        this.passwordRecoveryTokenRepository = passwordRecoveryTokenRepository;
    }

    @Transactional
    @Async
    @Scheduled(fixedRateString = "${schedule-clear-password-recovery-token-millisecond}")
    @Override
    public void performTask() {
        passwordRecoveryTokenRepository.deleteExpiredTokens();
    }
}
