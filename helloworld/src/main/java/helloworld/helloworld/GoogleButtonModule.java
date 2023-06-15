package helloworld.helloworld;

import com.atlassian.jira.plugin.webfragment.contextproviders.AbstractJiraContextProvider;
import com.atlassian.jira.plugin.webfragment.model.JiraHelper;
import com.atlassian.jira.user.ApplicationUser;
import com.atlassian.plugin.spring.scanner.annotation.component.Scanned;
import com.google.common.collect.ImmutableMap;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.Map;

//@Named
@Scanned
public class GoogleButtonModule extends AbstractJiraContextProvider {

    private final String message;

    @Inject
    public GoogleButtonModule() {
        message = "https://www.google.com";
    }

    @Override
    public Map getContextMap(ApplicationUser applicationUser, JiraHelper jiraHelper) {

        return ImmutableMap.of(
                "message", message
        );
    }
}
