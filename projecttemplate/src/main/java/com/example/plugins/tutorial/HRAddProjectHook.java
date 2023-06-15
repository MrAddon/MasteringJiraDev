package com.rauliki.standaloneProjectTemplate;
 
//import com.atlassian.jira.blueprint.api.AddProjectHook;
import com.atlassian.jira.project.template.hook.AddProjectHook;
import com.atlassian.jira.project.template.*;
import com.atlassian.jira.project.template.hook.*;
//import com.atlassian.jira.blueprint.api.ConfigureData;
//import com.atlassian.jira.blueprint.api.ConfigureResponse;
//import com.atlassian.jira.blueprint.api.ValidateData;
//import com.atlassian.jira.blueprint.api.ValidateResponse;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import com.atlassian.jira.config.ConstantsManager;
import com.atlassian.jira.bc.projectroles.ProjectRoleService;
import com.atlassian.jira.component.ComponentAccessor;
//import com.atlassian.jira.ComponentManager;
import com.atlassian.jira.issue.fields.CustomField;
import com.atlassian.jira.issue.fields.layout.field.*;
import com.atlassian.jira.issue.fields.screen.*;
import com.atlassian.jira.issue.fields.screen.issuetype.*;
import com.atlassian.jira.issue.issuetype.IssueType;
import com.atlassian.jira.issue.CustomFieldManager;
import com.atlassian.jira.issue.IssueFieldConstants;
import com.atlassian.jira.issue.context.GlobalIssueContext;
import com.atlassian.jira.issue.customfields.CustomFieldSearcher;
import com.atlassian.jira.issue.customfields.CustomFieldType;
import com.atlassian.jira.issue.operation.IssueOperations;
import com.atlassian.jira.issue.operation.IssueOperations;
import com.atlassian.jira.issue.operation.ScreenableIssueOperation;
import com.atlassian.jira.notification.NotificationSchemeManager;
import com.atlassian.jira.permission.PermissionSchemeManager;
import com.atlassian.jira.scheme.SchemeManager;
import com.atlassian.jira.project.Project;
import com.atlassian.jira.project.ProjectCategory;
import com.atlassian.jira.project.ProjectManager;
import com.atlassian.jira.scheme.Scheme;
import com.atlassian.jira.security.roles.ProjectRole;
import com.atlassian.jira.util.SimpleErrorCollection;
import com.atlassian.jira.workflow.WorkflowSchemeManager;
import com.atlassian.jira.util.SimpleErrorCollection;
import com.atlassian.sal.api.message.I18nResolver;
import org.ofbiz.core.entity.GenericEntityException;
import org.ofbiz.core.entity.GenericValue;
 


public class HRAddProjectHook implements AddProjectHook
{
	
	 private static final Logger LOGGER = LogManager.getLogger(HRAddProjectHook.class);
	
    @Override
    public ValidateResponse validate(final ValidateData validateData)
    {
        return ValidateResponse.create();
    }


    @Override
    public ConfigureResponse configure(final ConfigureData configureData)
    {
		
		Project project = configureData.project();
		ConstantsManager constantsManager = ComponentAccessor.getConstantsManager();
		String template_name = "HR Project Template";
		String template_new_name = project.getKey() + ":" + template_name;
		
		
		PermissionSchemeManager permissionSchemeManager = ComponentAccessor.getPermissionSchemeManager();
		Scheme permissionScheme = permissionSchemeManager.getSchemeObject(template_name);
        if (permissionScheme != null) {
			Scheme permissionSchemeNew = permissionSchemeManager.copyScheme(permissionScheme);
			permissionSchemeNew.setName(template_new_name);
			permissionSchemeManager.updateScheme(permissionSchemeNew);
            permissionSchemeManager.removeSchemesFromProject(project);
            permissionSchemeManager.addSchemeToProject(project, permissionSchemeNew);
        } 
						
		FieldLayoutManager fieldLayoutManager = ComponentAccessor.getFieldLayoutManager();
        EditableDefaultFieldLayout defaultFieldLayout = fieldLayoutManager.getEditableDefaultFieldLayout();
		
		EditableFieldLayout editableFieldLayout = new EditableFieldLayoutImpl(null, defaultFieldLayout.getFieldLayoutItems());
        editableFieldLayout.setName(template_new_name);
        editableFieldLayout.setDescription(template_new_name);
		FieldLayout myFieldLayout = fieldLayoutManager.storeAndReturnEditableFieldLayout(editableFieldLayout);
		
		FieldLayoutScheme fieldLayoutScheme = new FieldLayoutSchemeImpl(fieldLayoutManager, null);
        fieldLayoutScheme.setName(template_new_name);
        fieldLayoutScheme.setDescription(template_new_name);
		fieldLayoutScheme.store();
		
		
		FieldLayoutSchemeEntity fieldLayoutSchemeEntity = new FieldLayoutSchemeEntityImpl(fieldLayoutManager, null, constantsManager);
        fieldLayoutSchemeEntity.setIssueTypeId(null); 
        fieldLayoutSchemeEntity.setFieldLayoutId(myFieldLayout.getId());
		//fieldLayoutSchemeEntity.store();
		fieldLayoutScheme.addEntity(fieldLayoutSchemeEntity);
		//fieldLayoutScheme.store();
		//This part not works fine :(
		
		fieldLayoutScheme = null;
        for (FieldLayoutScheme scheme : fieldLayoutManager.getFieldLayoutSchemes()) {
            if (scheme.getName().equals(template_new_name)) {
                fieldLayoutScheme = scheme;
                break;
            }
        }
		fieldLayoutManager.addSchemeAssociation(project, fieldLayoutScheme.getId());
				
		FieldScreenManager fieldScreenManager = ComponentAccessor.getFieldScreenManager();
		FieldScreen fieldScreen =  new FieldScreenImpl(fieldScreenManager);
		fieldScreen.setName(template_new_name);
		fieldScreen.setDescription(template_new_name);
		fieldScreen.store();		
		
		FieldScreenTab defaultTab = fieldScreen.addTab("Details");
		
		FieldScreenSchemeManager fieldScreenSchemeManager = ComponentAccessor.getComponent(FieldScreenSchemeManager.class);		
		FieldScreenSchemeImpl fieldScreenScheme = new FieldScreenSchemeImpl(fieldScreenSchemeManager, null);
        fieldScreenScheme.setName(template_new_name);
        fieldScreenScheme.setDescription(template_new_name);
        fieldScreenScheme.store();
		
        FieldScreenSchemeItemImpl fieldScreenSchemeItem = new FieldScreenSchemeItemImpl(fieldScreenSchemeManager, (GenericValue) null, fieldScreenManager);
        fieldScreenSchemeItem.setIssueOperation(null);
        fieldScreenSchemeItem.setFieldScreen(fieldScreenManager.getFieldScreen(fieldScreen.getId()));
        
        fieldScreenScheme.addFieldScreenSchemeItem(fieldScreenSchemeItem);
		
		IssueTypeScreenSchemeManager issueTypeScreenSchemeManager =  (IssueTypeScreenSchemeManager) ComponentAccessor.getComponent(IssueTypeScreenSchemeManager.class); 
		IssueTypeScreenScheme issueTypeScreenScheme = new IssueTypeScreenSchemeImpl(issueTypeScreenSchemeManager, null);
        issueTypeScreenScheme.setName(template_new_name);
        issueTypeScreenScheme.setDescription(template_new_name);
        issueTypeScreenScheme.store();

        IssueTypeScreenSchemeEntity issueTypeScreenSchemeEntity = new IssueTypeScreenSchemeEntityImpl(issueTypeScreenSchemeManager, (GenericValue) null, fieldScreenSchemeManager, constantsManager);
        issueTypeScreenSchemeEntity.setIssueTypeId(null);
        issueTypeScreenSchemeEntity.setFieldScreenScheme(fieldScreenSchemeManager.getFieldScreenScheme(fieldScreenScheme.getId()));
        issueTypeScreenScheme.addEntity(issueTypeScreenSchemeEntity);

		issueTypeScreenSchemeManager.addSchemeAssociation(project,issueTypeScreenScheme);
        
		
		// RETURN FINAL
		ConfigureResponse configureResponse = ConfigureResponse.create().setRedirect("/plugins/servlet/project-config/" + project.getKey() + "/summary");
		return configureResponse;

        
    }
}
