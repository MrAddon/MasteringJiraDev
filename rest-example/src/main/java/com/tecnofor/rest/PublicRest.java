package com.tecnofor.rest;

import com.atlassian.jira.component.ComponentAccessor;
import com.atlassian.jira.config.properties.ApplicationProperties;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import java.net.URI;

/**
 * Rest to make some public version of admin-only services
 */

@Path("/public")
public class PublicRest {

    private final static String GETTING_STARTED_URL = "http://google.com";

    public PublicRest() {
        // no he podido inyectar ApplicationProperties con spring scanner
        // TODO subir spring scanner a v2
        ApplicationProperties appProps = ComponentAccessor.getComponent(ApplicationProperties.class);
    }



    @GET
    @Path("getting-started")
    // "Hacky" way to have an external getting started page
    // since post.install.url can only reference local urls
    public Response gettingStarted() {
        return Response.temporaryRedirect(URI.create(GETTING_STARTED_URL)).build();
    }

}