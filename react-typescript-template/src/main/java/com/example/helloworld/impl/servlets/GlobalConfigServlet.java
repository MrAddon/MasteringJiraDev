package com.example.helloworld.impl.servlets;

import com.atlassian.jira.security.JiraAuthenticationContext;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.soy.renderer.SoyTemplateRenderer;
import com.atlassian.upm.api.license.PluginLicenseManager;
import com.example.helloworld.api.service.ServletService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

class GlobalConfigServlet extends HttpServlet {

    @ComponentImport
    private final PluginLicenseManager pluginLicenseManager;
    private final ServletService servletService;

    @ComponentImport
    private final SoyTemplateRenderer soyTemplateRenderer;
    @ComponentImport
    private final JiraAuthenticationContext jiraAuthenticationContext;


    GlobalConfigServlet(SoyTemplateRenderer soyTemplateRenderer,
                        PluginLicenseManager pluginLicenseManager,
                        ServletService servletService,
                        JiraAuthenticationContext jiraAuthenticationContext) {
        this.pluginLicenseManager = pluginLicenseManager;
        this.soyTemplateRenderer = soyTemplateRenderer;
        this.servletService = servletService;
        this.jiraAuthenticationContext = jiraAuthenticationContext;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        if (!jiraAuthenticationContext.isLoggedInUser()) {
            servletService.redirectToLogin(req, resp);
        }

        Map<String, Object> map = new HashMap<String, Object>();

        String pluginKey = pluginLicenseManager.getPluginKey();
        String html = soyTemplateRenderer.render(pluginKey + ":soy-templates", "templates.ui.globalConfig", map);

        resp.setContentType("text/html");
        resp.getWriter().write(html);
        resp.getWriter().close();
    }
}
