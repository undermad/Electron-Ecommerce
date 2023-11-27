package com.electron.rest.utility;

import java.time.Instant;
import java.time.LocalDateTime;

public class UnitConverter {

    public static long stringToLong(String longAsString) {
        return Long.parseLong(longAsString);
    }

    public static long millisecondsToSeconds(long milliseconds){
        return milliseconds / 1000;
    }



}
