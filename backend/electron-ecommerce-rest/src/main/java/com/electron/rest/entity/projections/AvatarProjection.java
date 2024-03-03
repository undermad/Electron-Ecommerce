package com.electron.rest.entity.projections;

public interface AvatarProjection {
    Long getId();
    String getFileName();
    String getFileType();
    byte[] getData();
}
