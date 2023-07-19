package com.jhl.legalcase.dataInterface.consumer.support;

import org.springframework.core.ParameterizedTypeReference;

public class ProvidedTypeReference<T> extends ParameterizedTypeReference<T> {
    private <T> ProvidedTypeReference() {
    }

    private static ProvidedTypeReference instance = null;

    public static <T> ProvidedTypeReference<T> getTypeReference() {
        if (instance == null) {
            instance = new ProvidedTypeReference<T>();
        }
        return instance;
    }
}
