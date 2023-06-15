package helloworld.helloworld;

import com.atlassian.plugin.spring.scanner.annotation.component.Scanned;
import com.atlassian.plugin.spring.scanner.annotation.export.ExportAsService;
import com.atlassian.plugin.spring.scanner.annotation.imports.JiraImport;
import com.atlassian.sal.api.pluginsettings.PluginSettingsFactory;

import javax.inject.Inject;

@Scanned
@ExportAsService
public class HelloWorldPlugin {

    @JiraImport
    private final PluginSettingsFactory pluginSettingsFactory;

    @Inject
    public HelloWorldPlugin(PluginSettingsFactory pluginSettingsFactory) {
        this.pluginSettingsFactory = pluginSettingsFactory;
    }

    // Add your plugin logic here (if applicable)
}
