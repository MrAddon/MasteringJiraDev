package com.example.helloworld.api.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface ServletService {
    void redirectToLogin(HttpServletRequest request, HttpServletResponse response) throws IOException;
}
