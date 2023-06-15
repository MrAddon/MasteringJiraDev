package com.rauliki.JiraSupportAdminTools.conditions;
 
import com.rauliki.JiraSupportAdminTools.conditions.ConditionEvaluator;
import com.atlassian.upm.api.license.PluginLicenseManager;
import com.atlassian.upm.api.license.entity.PluginLicense;

public class ConditionEvaluatorImpl implements ConditionEvaluator
{
    PluginLicenseManager licenseManager;

	public ConditionEvaluatorImpl(final PluginLicenseManager licenseManager)
    {
        this.licenseManager = licenseManager;
    }

    @Override
    public boolean evaluate(ConditionType type)
    {
        switch (type)
        {
            case LICENSED:
                return isLicenseValid();
            default:
                return false;
        }
    }

    private boolean isLicenseValid()
    {
        boolean isLicensed = false;
        boolean hasErrors = false;
        for (PluginLicense pluginLicense : licenseManager.getLicense())
        {
            isLicensed = true;
            hasErrors = hasErrors || pluginLicense.getError().isDefined();
        }
        isLicensed = isLicensed && !hasErrors;
        return isLicensed;
    }
}