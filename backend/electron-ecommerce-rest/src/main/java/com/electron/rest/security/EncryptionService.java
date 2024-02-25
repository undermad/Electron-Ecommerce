package com.electron.rest.security;

import org.eclipse.angus.mail.iap.ByteArray;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

import static java.nio.charset.StandardCharsets.UTF_8;

@Service
public class EncryptionService {

    private final String ALGORITHM = "AES";

    @Value("${app.payment-secret}")
    public String secretKey;

    public String encrypt(String value) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
        byte[] byteKey = get16ByteSecretKey(secretKey);
        Key key = new SecretKeySpec(byteKey, ALGORITHM);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, key);
        byte[] encValue = cipher.doFinal(value.getBytes());
        return Base64.getEncoder().encodeToString(encValue);
    }

    public String decrypt(String encryptedValue) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
        byte[] byteKey = get16ByteSecretKey(secretKey);
        Key key = new SecretKeySpec(byteKey, ALGORITHM);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, key);

        byte[] decodedValue = Base64.getDecoder().decode(encryptedValue);
        byte[] decValue = cipher.doFinal(decodedValue);
        return new String(decValue);
    }

    private byte[] get16ByteSecretKey(String secretKey) {
        byte[] bytes = secretKey.getBytes();
        byte[] byteKey = new byte[16];
        for (int i = 0; i < 16; i++) {
            byteKey[i] = bytes[i];
        }
        return byteKey;
    }

}
