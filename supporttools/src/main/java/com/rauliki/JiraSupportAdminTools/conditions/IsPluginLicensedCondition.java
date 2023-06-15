package com.rauliki.JiraSupportAdminTools.conditions;

import com.atlassian.plugin.webresource.condition.SimpleUrlReadingCondition;

public class IsPluginLicensedCondition extends SimpleUrlReadingCondition
{
	private ConditionEvaluator conditionEvaluator;

	public IsPluginLicensedCondition(final ConditionEvaluator conditionEvaluator)
    {
        this.conditionEvaluator = conditionEvaluator;
    }

    @Override
    protected boolean isConditionTrue()
    {
        return conditionEvaluator.evaluate(ConditionType.LICENSED);
    }

    @Override
    protected String queryKey()
    {
        // This string will be appended to URLs as a GET parameter
        // whenever 'isConditionTrue' returns true.
        // You should make the string short, but unique to your plugin.
        return "JiraSupportAdminTools";
    }
}