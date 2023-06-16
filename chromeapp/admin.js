// ==UserScript==
// @name         Jirasupport Tools
// @namespace    http://tampermonkey.net/
// @version      3.2
// @description  try to take over the world!
// @author       You
// @match        https://jirasupport.atlassian.net/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Your code here...





function fieldscreens() {
    var pathname = window.location.pathname;
    if (pathname == "/secure/admin/AssociateFieldToScreens!default.jspa" || pathname == "/jira/secure/admin/AssociateFieldToScreens!default.jspa") {

        var nodeList = document.getElementsByTagName("select");
        var item;
        var item2;
        var i = 0;
        var longitud = 0;
        var options_custom = "";
        var Arr = new Array();
        for(item in nodeList) {
            try {
                longitud = nodeList[item].options.length;
            } catch( err) { longitud = 0; }
            for ( i =0; i < longitud ; i++) {
                if ( Arr[nodeList[item].options[i].text] == 1 ) {

                } else {
                    options_custom = options_custom +"<option value='" + nodeList[item].options[i].text + "' />";
                    Arr[nodeList[item].options[i].text] = 1;
                }
            }
        }


        var x = jQuery(".aui-navgroup-primary");
        var input = jQuery("<input type='text'  list='OptionList' name='search_issuetype' autocomplete='on' autocorrect='off' autocapitalize='off' spellcheck='false' id='search_issuetype' class='search-entry text'></input>");
        var optionlist = jQuery("<datalist id='OptionList'>"+options_custom+"</datalist>");
        var btn = jQuery("<button id='search_btn_issuetype' class='aui-button'>Check Screen Tabs</button>");
        var valor = "";
        var alerta = function(){
            valor = document.getElementById("search_issuetype").value;
            setscreentab(valor);

        }

        input.keydown(function (e){
            if(e.keyCode == 13){
                valor = document.getElementById("search_issuetype").value;
                setscreentab(valor);
            }
        })

        btn.click(alerta);
        x.append(optionlist);
        x.append(input);
        x.append(btn);


    }
}

function customfields() {
    var pathname = window.location.pathname;
    if (pathname == "/secure/admin/ViewCustomFields.jspa" || pathname == "/jira/secure/admin/ViewCustomFields.jspa") {
        var divs = document.getElementById('ak-main-content').getElementsByTagName("tr");
        var options_custom = "";
        for (var i = 0; i < divs.length; i++) {
            var para = divs[i].getElementsByTagName("td");
            if ( para[0] ) {
                options_custom = options_custom +"<option value='" + para[0].innerText + "' />";
                //options_custom = options_custom +"<option value='" + para[0].innerText.replace('custom-fields-','').replace('-name','') + "' />";
                //para[0].innerHTML = para[0].innerHTML + "(" + para[0].id.replace('custom-fields-','').replace('-name','') + ")" + "&nbsp;<a href='javascript:document.getElementById(\"search_customfield\").focus();document.getElementById(\"search_customfield\").setSelectionRange(0, document.getElementById(\"search_customfield\").value.length)'>[TOP]</a> <a href='ConfigureCustomField!default.jspa?customFieldId="+para[0].id.replace('custom-fields-','').replace('-name','').replace('customfield_','') +"' target='_new'>[CONFIG]</a> <a href='EditCustomField!default.jspa?id="+para[0].id.replace('custom-fields-','').replace('-name','').replace('customfield_','') +"' target='_new'>[DESCRIPTION]</a> <a href='AssociateFieldToScreens!default.jspa?fieldId=customfield_"+para[0].id.replace('custom-fields-','').replace('-name','').replace('customfield_','') +"' target='_new'>[SCREENS]</a>";
            }
        }

        var x = jQuery("#ak-main-content");
        var input = jQuery("<input type='text' list='OptionList' name='search_custom_field' autocomplete='on' autocorrect='off' autocapitalize='off' spellcheck='false' id='search_customfield' class='search-entry text'></input>");
        var optionlist = jQuery("<datalist id='OptionList'>"+options_custom+"</datalist>");
        var btn = jQuery("<button id='search_btn_customfield' class='aui-button'>Search CustomField</button>");
        var valor = "";
        var alerta = function(){
            valor = document.getElementById("search_customfield").value;
            search_customfield(valor);
        }

        input.keydown(function (e){
            if(e.keyCode == 13){
                valor = document.getElementById("search_customfield").value;
                search_customfield(valor);
            }
        })

        btn.click(alerta);
        x.prepend(btn);
        x.prepend(optionlist);
        x.prepend(input);
    }
}

function statuses() {
    var pathname = window.location.pathname;
    if (pathname == "/secure/admin/ViewStatuses.jspa"|| pathname == "/jira/secure/admin/ViewStatuses.jspa") {
        var divs = document.getElementById('table-issue-statuses').getElementsByTagName("tr");
        var options_custom = "";
        for (var i = 0; i < divs.length; i++) {
            var para = divs[i].getElementsByTagName("td");
            if ( para[0] ) {
                options_custom = options_custom +"<option value='" + para[0].getElementsByTagName("b")[0].innerText + "' />";
                var links = para[4].getElementsByTagName("a");
                var id_issuetype = links[0].href.split("id=");
                para[0].innerHTML = para[0].innerHTML +  "<b>ID:</b>"+ id_issuetype[1];
                options_custom = options_custom +"<option value='" + id_issuetype[1] + "' />";
                for (var j = 0; j < 1; j++) { //links.length; j++) {
                    para[0].innerHTML = para[0].innerHTML + "&nbsp;<a href='"+links[j].href+"' target='_new'>["+links[j].innerText.toUpperCase()+"]</a>";
                }
                para[0].innerHTML = para[0].innerHTML + "&nbsp;<a href='javascript:document.getElementById(\"search_issuetype\").focus();document.getElementById(\"search_issuetype\").setSelectionRange(0, document.getElementById(\"search_issuetype\").value.length)'>[TOP]</a>";

            }
        }

        var x = jQuery(".aui-page-header-actions");
        var input = jQuery("<input type='text' list='OptionList' name='search_status' autocomplete='on' autocorrect='off' autocapitalize='off' spellcheck='false' id='search_status' class='search-entry text'></input>");
        var optionlist = jQuery("<datalist id='OptionList'>"+options_custom+"</datalist>");
        var btn = jQuery("<button id='search_btn_status' class='aui-button'>Search Status</button>");
        var valor = "";
        var alerta = function(){
            valor = document.getElementById("search_status").value;
            search_status(valor);
        }

        input.keydown(function (e){
            if(e.keyCode == 13){
                valor = document.getElementById("search_status").value;
                search_status(valor);
            }
        })

        btn.click(alerta);
        x.append(optionlist);
        x.append(input);
        x.append(btn);
    }
}


function resolutions() {
    var pathname = window.location.pathname;
    if (pathname == "/secure/admin/ViewResolutions.jspa"|| pathname == "/jira/secure/admin/ViewResolutions.jspa") {
        var divs = document.getElementById('table-issue-resolutions').getElementsByTagName("tr");
        var options_custom = "";
        for (var i = 0; i < divs.length; i++) {
            var para = divs[i].getElementsByTagName("td");
            if ( para[0] ) {
                options_custom = options_custom +"<option value='" + para[0].getElementsByTagName("b")[0].innerText + "' />";
                var links = para[3].getElementsByTagName("a");
                var id_issuetype = links[0].href.split("id=");
                para[0].innerHTML = para[0].innerHTML +  "<br><b>ID:</b>"+ id_issuetype[1];
                options_custom = options_custom +"<option value='" + id_issuetype[1] + "' />";
                for (var j = 0; j < 1; j++) { //links.length; j++) {
                    para[0].innerHTML = para[0].innerHTML + "&nbsp;<a href='"+links[j].href+"' target='_new'>["+links[j].innerText.toUpperCase()+"]</a>";
                }
                para[0].innerHTML = para[0].innerHTML + "&nbsp;<a href='javascript:document.getElementById(\"search_issuetype\").focus();document.getElementById(\"search_issuetype\").setSelectionRange(0, document.getElementById(\"search_issuetype\").value.length)'>[TOP]</a>";

            }
        }

    }
}

function priorities() {
    var pathname = window.location.pathname;
    if (pathname == "/secure/admin/ViewPriorities.jspa"|| pathname == "/jira/secure/admin/ViewPriorities.jspa") {
        var divs = document.getElementById('table-issue-priorities').getElementsByTagName("tr");
        var options_custom = "";
        for (var i = 0; i < divs.length; i++) {
            var para = divs[i].getElementsByTagName("td");
            //options_custom = options_custom +"<option value='" + para[0].getElementsByTagName("b")[0].innerText + "' />";
            if (para[6]) {
            var links = para[6].getElementsByTagName("a");
            if (links) {
                var id_issuetype = links[0].href.split("id=");
                para[0].innerHTML = para[0].innerHTML +  "<br><b>ID:</b>"+ id_issuetype[1];
                options_custom = options_custom +"<option value='" + id_issuetype[1] + "' />";
                for (var j = 0; j < 1; j++) { //links.length; j++) {
                    para[0].innerHTML = para[0].innerHTML + "&nbsp;<a href='"+links[j].href+"' target='_new'>["+links[j].innerText.toUpperCase()+"]</a>";
                }
                para[0].innerHTML = para[0].innerHTML + "&nbsp;<a href='javascript:document.getElementById(\"search_issuetype\").focus();document.getElementById(\"search_issuetype\").setSelectionRange(0, document.getElementById(\"search_issuetype\").value.length)'>[TOP]</a>";
            }

        }

    }
}
}

function issuetypes() {
    var pathname = window.location.pathname;
    if (pathname == "/jira/settings/issues/issue-types") {
        var divs = document.getElementById('ak-main-content').getElementsByTagName("tr");
        var options_custom = "";
        for (var i = 0; i < divs.length; i++) {
            var para = divs[i].getElementsByTagName("td");
            if ( para[0] ) {
                options_custom = options_custom +"<option value='" + para[0].innerText + "' />";
                var id_issuetype = divs[i].getAttribute("data-testid").replace("admin-pages-issue-types-directory.ui.table.dynamic-table-stateless--row-issue-type-",""); //links[0].href.split("id=");
                para[0].innerHTML = para[0].innerHTML +  "<b>ID:</b>"+ id_issuetype;
                options_custom = options_custom +"<option value='" + id_issuetype + "' />";
                para[0].innerHTML = para[0].innerHTML + "&nbsp;<a href='javascript:document.getElementById(\"search_issuetype\").focus();document.getElementById(\"search_issuetype\").setSelectionRange(0, document.getElementById(\"search_issuetype\").value.length)'>[TOP]</a>";

            }
        }

        var x = jQuery("#ak-main-content");
        var input = jQuery("<input type='text' list='OptionList' name='search_issuetype' autocomplete='on' autocorrect='off' autocapitalize='off' spellcheck='false' id='search_issuetype' class='search-entry text'></input>");
        var optionlist = jQuery("<datalist id='OptionList'>"+options_custom+"</datalist>");
        var btn = jQuery("<button id='search_btn_issuetype' class='aui-button'>Search IssueType</button>");
        var valor = "";
        var alerta = function(){
            valor = document.getElementById("search_issuetype").value;
            search_issuetype(valor);
        }

        input.keydown(function (e){
            if(e.keyCode == 13){
                valor = document.getElementById("search_issuetype").value;
                search_issuetype(valor);
            }
        })

        btn.click(alerta);
        x.prepend(btn);
        x.prepend(optionlist);
        x.prepend(input);
    }
}

function issuetypesscheme() {
    var pathname = window.location.pathname;
    if (pathname == "/jira/settings/issues/issue-type-schemes") {

        var divs = document.getElementById('ak-main-content').getElementsByTagName("tr");
        var options_custom = "";
        for (var i = 0; i < divs.length; i++) {
            var para = divs[i].getElementsByTagName("td");
            if ( para[0] ) {
                options_custom = options_custom +"<option value='" + para[0].innerText + "' />";
                para[0].innerHTML = para[0].innerHTML  + "&nbsp;<a href='javascript:document.getElementById(\"search_issuetype\").focus();document.getElementById(\"search_issuetype\").setSelectionRange(0, document.getElementById(\"search_issuetype\").value.length)'>[TOP]</a>";

            }
        }

        var x = jQuery("#ak-main-content");
        var input = jQuery("<input type='text' list='OptionList' name='search_issuetype' autocomplete='on' autocorrect='off' autocapitalize='off' spellcheck='false' id='search_issuetype' class='search-entry text'></input>");
        var optionlist = jQuery("<datalist id='OptionList'>"+options_custom+"</datalist>");
        var btn = jQuery("<button id='search_btn_issuetype' class='aui-button'>Search IssueType Scheme</button>");
        var valor = "";
        var alerta = function(){
            valor = document.getElementById("search_issuetype").value;
            search_issuetype_scheme(valor);
        }

        input.keydown(function (e){
            if(e.keyCode == 13){
                valor = document.getElementById("search_issuetype").value;
                search_issuetype_scheme(valor);
            }
        })

        btn.click(alerta);
        x.prepend(btn);
        x.prepend(optionlist);
        x.prepend(input);
    }
}




function views() {
    var pathname = window.location.pathname;
    if (pathname == "/jira/settings/issues/screens") {
        var divs = document.getElementById('ak-main-content').getElementsByTagName("tr");
        var options_custom = "";
        for (var i = 0; i < divs.length; i++) {
            var para = divs[i].getElementsByTagName("td");
            if ( para[0] ) {
                options_custom = options_custom +"<option value='" + para[0].innerText + "' />";
                para[0].innerHTML = para[0].innerHTML  + "&nbsp;<a href='javascript:document.getElementById(\"search_issuetype\").focus();document.getElementById(\"search_issuetype\").setSelectionRange(0, document.getElementById(\"search_issuetype\").value.length)'>[TOP]</a>";

            }
        }


        var x = jQuery("#ak-main-content");
        var input = jQuery("<input type='text' list='OptionList' name='search_issuetype' autocomplete='on' autocorrect='off' autocapitalize='off' spellcheck='false' id='search_issuetype' class='search-entry text'></input>");
        var optionlist = jQuery("<datalist id='OptionList'>"+options_custom+"</datalist>");
        var btn = jQuery("<button id='search_btn_issuetype' class='aui-button'>Search View</button>");
        var valor = "";
        var alerta = function(){
            valor = document.getElementById("search_issuetype").value;
            search_view(valor);
        }

        input.keydown(function (e){
            if(e.keyCode == 13){
                valor = document.getElementById("search_issuetype").value;
                search_view(valor);
            }
        })

        btn.click(alerta);
        x.prepend(btn);
        x.prepend(optionlist);
        x.prepend(input);


    }
}

function viewsscheme() {
    var pathname = window.location.pathname;
    if (pathname == "/jira/settings/issues/screen-schemes") {

        var divs = document.getElementById('ak-main-content').getElementsByTagName("tr");
        var options_custom = "";
        for (var i = 0; i < divs.length; i++) {
            var para = divs[i].getElementsByTagName("td");
            if ( para[0] ) {
                options_custom = options_custom +"<option value='" + para[0].innerText + "' />";
                para[0].innerHTML = para[0].innerHTML  + "&nbsp;<a href='javascript:document.getElementById(\"search_issuetype\").focus();document.getElementById(\"search_issuetype\").setSelectionRange(0, document.getElementById(\"search_issuetype\").value.length)'>[TOP]</a>";

            }
        }


        var x = jQuery("#ak-main-content");
        var input = jQuery("<input type='text' list='OptionList' name='search_issuetype' autocomplete='on' autocorrect='off' autocapitalize='off' spellcheck='false' id='search_issuetype' class='search-entry text'></input>");
        var optionlist = jQuery("<datalist id='OptionList'>"+options_custom+"</datalist>");
        var btn = jQuery("<button id='search_btn_issuetype' class='aui-button'>Search View</button>");
        var valor = "";
        var alerta = function(){
            valor = document.getElementById("search_issuetype").value;
            search_view_scheme(valor);
        }

        input.keydown(function (e){
            if(e.keyCode == 13){
                valor = document.getElementById("search_issuetype").value;
                search_view_scheme(valor);
            }
        })

        btn.click(alerta);
        x.prepend(btn);
        x.prepend(optionlist);
        x.prepend(input);


    }
}

function viewsschemeissue() {
    var pathname = window.location.pathname;
    if (pathname == "/jira/settings/issues/issue-type-screen-schemes") {

        var divs = document.getElementById('ak-main-content').getElementsByTagName("tr");
        var options_custom = "";
        for (var i = 0; i < divs.length; i++) {
            var para = divs[i].getElementsByTagName("td");
            if ( para[0] ) {
                options_custom = options_custom +"<option value='" + para[0].innerText + "' />";
                para[0].innerHTML = para[0].innerHTML  + "&nbsp;<a href='javascript:document.getElementById(\"search_issuetype\").focus();document.getElementById(\"search_issuetype\").setSelectionRange(0, document.getElementById(\"search_issuetype\").value.length)'>[TOP]</a>";

            }
        }


        var x = jQuery("#ak-main-content");
        var input = jQuery("<input type='text' list='OptionList' name='search_issuetype' autocomplete='on' autocorrect='off' autocapitalize='off' spellcheck='false' id='search_issuetype' class='search-entry text'></input>");
        var optionlist = jQuery("<datalist id='OptionList'>"+options_custom+"</datalist>");
        var btn = jQuery("<button id='search_btn_issuetype' class='aui-button'>Search View</button>");
        var valor = "";
        var alerta = function(){
            valor = document.getElementById("search_issuetype").value;
            search_view_scheme_issue(valor);
        }

        input.keydown(function (e){
            if(e.keyCode == 13){
                valor = document.getElementById("search_issuetype").value;
                search_view_scheme_issue(valor);
            }
        })

        btn.click(alerta);
        x.prepend(btn);
        x.prepend(optionlist);
        x.prepend(input);


    }
}

function dvcsraul() {
    var pathname = window.location.pathname;
    if (pathname == "/secure/admin/ConfigureDvcsOrganizations!default.jspa" || pathname == "/jira/secure/admin/ConfigureDvcsOrganizations!default.jspa") {
        var divs = document.getElementById('dvcs-repos-table-1').getElementsByTagName("tr");
        var options_custom = "";
        for (var i = 0; i < divs.length; i++) {
            var para = divs[i].getElementsByTagName("td");
            if ( para[0] ) {
                options_custom = options_custom +"<option value='" + para[0].getElementsByTagName("a")[0].innerText + "' />";

                para[0].innerHTML = para[0].innerHTML + "&nbsp;<a href='javascript:document.getElementById(\"search_issuetype\").focus();document.getElementById(\"search_issuetype\").setSelectionRange(0, document.getElementById(\"search_issuetype\").value.length)'>[TOP]</a>";

            }
        }



        var x = jQuery(".aui-button.submit");
        var input = jQuery("<input type='text' list='OptionList' name='search_issuetype' autocomplete='on' autocorrect='off' autocapitalize='off' spellcheck='false' id='search_issuetype' class='search-entry text'></input>");
        var optionlist = jQuery("<datalist id='OptionList'>"+options_custom+"</datalist>");
        var btn = jQuery("<button id='search_btn_issuetype' class='aui-button'>Search Repo</button>");
        var valor = "";
        var alerta = function(){
            valor = document.getElementById("search_issuetype").value;
            search_dvcs(valor);
        }

        input.keydown(function (e){
            if(e.keyCode == 13){
                valor = document.getElementById("search_issuetype").value;
                search_dvcs(valor);
            }
        })

        btn.click(alerta);
        x.after(btn);
        x.after(optionlist);
        x.after(input);





    }
}


function fieldconfig() {
    var pathname = window.location.pathname;
    if (pathname == "/secure/admin/ViewFieldLayouts.jspa" || pathname == "/jira/secure/admin/ViewFieldLayouts.jspa") {

        var divs = document.getElementById('field-configurations-table').getElementsByTagName("tr");
        var options_custom = "";
        for (var i = 0; i < divs.length; i++) {
            var para = divs[i].getElementsByTagName("td");
            if ( para[0] ) {
                options_custom = options_custom +"<option value='" + para[0].getElementsByTagName("a")[0].innerText + "' />";
                para[0].innerHTML = para[0].innerHTML  + "&nbsp;<a href='javascript:document.getElementById(\"search_issuetype\").focus();document.getElementById(\"search_issuetype\").setSelectionRange(0, document.getElementById(\"search_issuetype\").value.length)'>[TOP]</a>";

            }
        }


        var x = jQuery(".aui-buttons");
        var input = jQuery("<input type='text' list='OptionList' name='search_issuetype' autocomplete='on' autocorrect='off' autocapitalize='off' spellcheck='false' id='search_issuetype' class='search-entry text'></input>");
        var optionlist = jQuery("<datalist id='OptionList'>"+options_custom+"</datalist>");
        var btn = jQuery("<button id='search_btn_issuetype' class='aui-button'>Search Field Config</button>");
        var valor = "";
        var alerta = function(){
            valor = document.getElementById("search_issuetype").value;
            search_field_config(valor);
        }

        input.keydown(function (e){
            if(e.keyCode == 13){
                valor = document.getElementById("search_issuetype").value;
                search_field_config(valor);
            }
        })

        btn.click(alerta);
        x.append(optionlist);
        x.append(input);
        x.append(btn);


    }
}

function fieldauxconfig() {
    var pathname = window.location.pathname;
    if (pathname == "/secure/admin/ConfigureFieldLayout!default.jspa" || pathname == "/jira/secure/admin/ConfigureFieldLayout!default.jspa"||pathname == "/secure/admin/ViewIssueFields.jspa" || pathname == "/jira/secure/admin/ViewIssueFields.jspa") {

        var divs = document.getElementById('field_table').getElementsByTagName("tr");
        var options_custom = "";
        for (var i = 0; i < divs.length; i++) {
            var para = divs[i].getElementsByTagName("td");

            if ( para[0] ) {
                var span = para[0].getElementsByTagName("span")[0];
                var b = para[0].getElementsByTagName("b")[0]
                if ( span == null)
                    span = b;
                options_custom = options_custom +"<option value='" + span.innerText + "' />";
                para[0].innerHTML = para[0].innerHTML  + "&nbsp;<a href='javascript:document.getElementById(\"search_issuetype\").focus();document.getElementById(\"search_issuetype\").setSelectionRange(0, document.getElementById(\"search_issuetype\").value.length)'>[TOP]</a>";

            }
            if ( para[2] ) {
                var links = para[2].getElementsByTagName("a");
                for (var j = 0; j < links.length; j++) {
                    para[0].innerHTML = para[0].innerHTML  + "&nbsp;<a href='"+links[j].href+"' target='_new'>["+links[j].innerText.toUpperCase()+"]</a>";
                }
            }
        }


        var x = jQuery(".jiraform");
        var input = jQuery("<input type='text' list='OptionList' name='search_issuetype' autocomplete='on' autocorrect='off' autocapitalize='off' spellcheck='false' id='search_issuetype' class='search-entry text'></input>");
        var optionlist = jQuery("<datalist id='OptionList'>"+options_custom+"</datalist>");
        var btn = jQuery("<button id='search_btn_issuetype' class='aui-button'>Search Field Config</button>");
        var valor = "";
        var alerta = function(){
            valor = document.getElementById("search_issuetype").value;
            search_fieldaux_config(valor);
        }

        input.keydown(function (e){
            if(e.keyCode == 13){
                valor = document.getElementById("search_issuetype").value;
                search_fieldaux_config(valor);
            }
        })

        btn.click(alerta);
        x.append(optionlist);
        x.append(input);
        x.append(btn);


    }
}


function fieldconfigscheme() {
    var pathname = window.location.pathname;
    if (pathname == "/secure/admin/ViewFieldLayoutSchemes.jspa" || pathname == "/jira/secure/admin/ViewFieldLayoutSchemes.jspa") {

        var divs = document.getElementById('field-configuration-schemes-table').getElementsByTagName("tr");
        var options_custom = "";
        for (var i = 0; i < divs.length; i++) {
            var para = divs[i].getElementsByTagName("td");
            if ( para[0] ) {
                options_custom = options_custom +"<option value='" + para[0].getElementsByTagName("a")[0].innerText + "' />";
                para[0].innerHTML = para[0].innerHTML  + "&nbsp;<a href='javascript:document.getElementById(\"search_issuetype\").focus();document.getElementById(\"search_issuetype\").setSelectionRange(0, document.getElementById(\"search_issuetype\").value.length)'>[TOP]</a>";

            }
        }


        var x = jQuery(".aui-buttons");
        var input = jQuery("<input type='text' list='OptionList' name='search_issuetype' autocomplete='on' autocorrect='off' autocapitalize='off' spellcheck='false' id='search_issuetype' class='search-entry text'></input>");
        var optionlist = jQuery("<datalist id='OptionList'>"+options_custom+"</datalist>");
        var btn = jQuery("<button id='search_btn_issuetype' class='aui-button'>Search Field Config Scheme</button>");
        var valor = "";
        var alerta = function(){
            valor = document.getElementById("search_issuetype").value;
            search_field_config_scheme(valor);
        }

        input.keydown(function (e){
            if(e.keyCode == 13){
                valor = document.getElementById("search_issuetype").value;
                search_field_config_scheme(valor);
            }
        })

        btn.click(alerta);
        x.append(optionlist);
        x.append(input);
        x.append(btn);


    }
}


function permissionscheme() {
    var pathname = window.location.pathname;
    if (pathname == "/secure/admin/ViewPermissionSchemes.jspa" || pathname == "/jira/secure/admin/ViewPermissionSchemes.jspa") {

        var divs = document.getElementById('permission_schemes_table').getElementsByTagName("tr");
        var options_custom = "";
        for (var i = 0; i < divs.length; i++) {
            var para = divs[i].getElementsByTagName("td");
            if ( para[0] ) {
                options_custom = options_custom +"<option value='" + para[0].getElementsByTagName("a")[0].innerText + "' />";
                para[0].innerHTML = para[0].innerHTML  + "&nbsp;<a href='javascript:document.getElementById(\"search_issuetype\").focus();document.getElementById(\"search_issuetype\").setSelectionRange(0, document.getElementById(\"search_issuetype\").value.length)'>[TOP]</a>";

            }
        }


        var x = jQuery(".jiraformbody");
        var input = jQuery("<input type='text' list='OptionList' name='search_issuetype' autocomplete='on' autocorrect='off' autocapitalize='off' spellcheck='false' id='search_issuetype' class='search-entry text'></input>");
        var optionlist = jQuery("<datalist id='OptionList'>"+options_custom+"</datalist>");
        var btn = jQuery("<button id='search_btn_issuetype' class='aui-button'>Search Permission</button>");
        var valor = "";
        var alerta = function(){
            valor = document.getElementById("search_issuetype").value;
            search_permission_scheme(valor);
        }

        input.keydown(function (e){
            if(e.keyCode == 13){
                valor = document.getElementById("search_issuetype").value;
                search_permission_scheme(valor);
            }
        })

        btn.click(alerta);
        x.append(optionlist);
        x.append(input);
        x.append(btn);

        x = jQuery(".aui-buttons");
        input = jQuery("<input type='text' list='OptionList' name='search_issuetype' autocomplete='on' autocorrect='off' autocapitalize='off' spellcheck='false' id='search_issuetype' class='search-entry text'></input>");
        optionlist = jQuery("<datalist id='OptionList'>"+options_custom+"</datalist>");
        btn = jQuery("<button id='search_btn_issuetype' class='aui-button'>Search Permission</button>");
        valor = "";
        alerta = function(){
            valor = document.getElementById("search_issuetype").value;
            search_permission_scheme(valor);
        }

        input.keydown(function (e){
            if(e.keyCode == 13){
                valor = document.getElementById("search_issuetype").value;
                search_permission_scheme(valor);
            }
        })

        btn.click(alerta);
        x.append(optionlist);
        x.append(input);
        x.append(btn);


    }
}

function notificationscheme() {
    var pathname = window.location.pathname;
    if (pathname == "/secure/admin/ViewNotificationSchemes.jspa" || pathname == "/jira/secure/admin/ViewNotificationSchemes.jspa") {

        //var divs = document.getElementById('notification_schemes').getElementsByTagName("tr");
        var divs = jQuery("table[id='notification_schemes']");
        var options_custom = "";
        for (var i = 0; i < divs.length; i++) {
            var para2 = divs[i].getElementsByTagName("tr");
            for (var j = 0; j < para2.length; j++) {
                var para = para2[j].getElementsByTagName("td");
                if ( para[0] ) {
                    options_custom = options_custom +"<option value='" + para[0].getElementsByTagName("a")[0].innerText + "' />";
                    para[0].innerHTML = para[0].innerHTML  + "&nbsp;<a href='javascript:document.getElementById(\"search_issuetype\").focus();document.getElementById(\"search_issuetype\").setSelectionRange(0, document.getElementById(\"search_issuetype\").value.length)'>[TOP]</a>";

                }
            }
        }



        var x = jQuery(".jiraformbody");
        var input = jQuery("<input type='text' list='OptionList' name='search_issuetype' autocomplete='on' autocorrect='off' autocapitalize='off' spellcheck='false' id='search_issuetype' class='search-entry text'></input>");
        var optionlist = jQuery("<datalist id='OptionList'>"+options_custom+"</datalist>");
        var btn = jQuery("<button id='search_btn_issuetype' class='aui-button'>Search Notification</button>");
        var valor = "";
        var alerta = function(){
            valor = document.getElementById("search_issuetype").value;
            search_notification_scheme(valor);
        }

        input.keydown(function (e){
            if(e.keyCode == 13){
                valor = document.getElementById("search_issuetype").value;
                search_notification_scheme(valor);
            }
        })

        btn.click(alerta);
        x.append(optionlist);
        x.append(input);
        x.append(btn);


    }
}



function workflowscheme() {
    var pathname = window.location.pathname;
    if (pathname == "/secure/admin/ViewWorkflowSchemes.jspa" || pathname == "/jira/secure/admin/ViewWorkflowSchemes.jspa") {
        var divs = jQuery("div[class='module toggle-wrap collapsed']")
        for (var i = 0; i < divs.length; i++) {
            divs[i].className = "module toggle-wrap expanded";
        }

        //var divs = document.getElementById('WorkflowSchemes').getElementsByTagName("tr");
        var divs = jQuery("table[class='aui aui-table-rowhover list-workflow-table']");
        var options_custom = "";
        for (var i = 0; i < divs.length; i++) {
            var para2 = divs[i].getElementsByTagName("tr");
            for (var j = 0; j < para2.length; j++) {
                var para = para2[j].getElementsByTagName("td");
                if ( para[0] ) {
                    options_custom = options_custom +"<option value='" + para[0].getElementsByTagName("strong")[0].innerText + "' />";
                    para[0].innerHTML = para[0].innerHTML  + "&nbsp;<a href='javascript:document.getElementById(\"search_issuetype\").focus();document.getElementById(\"search_issuetype\").setSelectionRange(0, document.getElementById(\"search_issuetype\").value.length)'>[TOP]</a>";

                }
            }
        }


        var x = jQuery(".aui-buttons");
        var input = jQuery("<input type='text' list='OptionList' name='search_issuetype' autocomplete='on' autocorrect='off' autocapitalize='off' spellcheck='false' id='search_issuetype' class='search-entry text'></input>");
        var optionlist = jQuery("<datalist id='OptionList'>"+options_custom+"</datalist>");
        var btn = jQuery("<button id='search_btn_issuetype' class='aui-button'>Search Workflow</button>");
        var valor = "";
        var alerta = function(){
            valor = document.getElementById("search_issuetype").value;
            search_workflow_scheme(valor);
        }

        input.keydown(function (e){
            if(e.keyCode == 13){
                valor = document.getElementById("search_issuetype").value;
                search_workflow_scheme(valor);
            }
        })

        btn.click(alerta);
        x.append(optionlist);
        x.append(input);
        x.append(btn);

    }
}

function browseprojects() {
    var pathname = window.location.pathname;
    if (pathname == "/secure/BrowseProjects.jspa" || pathname == "/jira/secure/BrowseProjects.jspa") {

        var divs
        var divs2 = document.getElementsByTagName('table')
        for (var j = 0; j < divs2.length; j++) {
            divs = divs2[j].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
            var options_custom = "";
            for (var i = 0; i < divs.length; i++) {
                var para = divs[i].getElementsByTagName("td");
                if ( para[1] ) {
                    options_custom = options_custom +"<option value='" + para[1].getElementsByTagName("a")[0].innerText + "' />";
                    para[1].innerHTML = para[1].innerHTML  + "&nbsp;<a href='javascript:document.getElementById(\"search_issuetype\").focus();document.getElementById(\"search_issuetype\").setSelectionRange(0, document.getElementById(\"search_issuetype\").value.length)'>[TOP]</a>";

                }
                if ( para[2] ) {
                    options_custom = options_custom +"<option value='" + para[2].innerText + "' />";

                }
            }
        }

        var x = jQuery(".aui-page-header-actions");
        var input = jQuery("<input type='text' list='OptionList' name='search_issuetype' autocomplete='on' autocorrect='off' autocapitalize='off' spellcheck='false' id='search_issuetype' class='search-entry text'></input>");
        var optionlist = jQuery("<datalist id='OptionList'>"+options_custom+"</datalist>");
        var btn = jQuery("<button id='search_btn_issuetype' class='aui-button'>Search Project</button>");
        var valor = "";
        var alerta = function(){
            valor = document.getElementById("search_issuetype").value;
            search_project(valor);
        }

        input.keydown(function (e){
            if(e.keyCode == 13){
                valor = document.getElementById("search_issuetype").value;
                search_project(valor);
            }
        })

        btn.click(alerta);
        x.append(optionlist);
        x.append(input);
        x.append(btn);


    }
}



function subtasks() {
    var pathname = window.location.pathname;
    if (pathname == "/secure/admin/subtasks/ManageSubTasks.jspa" || pathname == "/jira/secure/admin/subtasks/ManageSubTasks.jspa") {

        var divs
        var divs2 = document.getElementsByTagName('table')
        for (var j = 0; j < divs2.length; j++) {
            divs = divs2[j].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
            var options_custom = "";
            for (var i = 0; i < divs.length; i++) {
                var para = divs[i].getElementsByTagName("td");
                if ( para[1] ) {
                    options_custom = options_custom +"<option value='" + para[0].innerText + "' />";
                    para[1].innerHTML = para[1].innerHTML  + "&nbsp;<a href='javascript:document.getElementById(\"search_issuetype\").focus();document.getElementById(\"search_issuetype\").setSelectionRange(0, document.getElementById(\"search_issuetype\").value.length)'>[TOP]</a>";

                }
                if ( para[2] ) {
                    options_custom = options_custom +"<option value='" + para[2].innerText + "' />";

                }
            }
        }

        var x = jQuery(".toolbar-item");
        var input = jQuery("<input type='text' list='OptionList' name='search_issuetype' autocomplete='on' autocorrect='off' autocapitalize='off' spellcheck='false' id='search_issuetype' class='search-entry text'></input>");
        var optionlist = jQuery("<datalist id='OptionList'>"+options_custom+"</datalist>");
        var btn = jQuery("<button id='search_btn_issuetype' class='aui-button'>Search Project</button>");
        var valor = "";
        var alerta = function(){
            valor = document.getElementById("search_issuetype").value;
            search_subtask(valor);
        }

        input.keydown(function (e){
            if(e.keyCode == 13){
                valor = document.getElementById("search_issuetype").value;
                search_subtask(valor);
            }
        })

        btn.click(alerta);
        x.append(optionlist);
        x.append(input);
        x.append(btn);


    }
}


function fields_settings() {
    var pathname = window.location.pathname;
    if (pathname == "/secure/admin/ManageConfigurationScheme!default.jspa" || pathname == "/jira/secure/admin/ManageConfigurationScheme!default.jspa") {
        var x = jQuery(".admin-search");
        var btn = jQuery("<button id='save_issuetypes' class='aui-button'>Save Types Options</button>");
        var btn2 = jQuery("<button id='load_issuetypes' class='aui-button'>Load Types </button>");
        var btn3 = jQuery("<button id='save_projects' class='aui-button'>Save Projects Options</button>");
        var btn4 = jQuery("<button id='load_projects' class='aui-button'>Load Projects</button>");

        var alerta = function(){
            var valor =document.getElementsByTagName('select')[0]
            var selected1 = [];
            for (var i = 0; i < valor.length; i++) {
                if (valor.options[i].selected) selected1.push(valor.options[i].value);
            }
            setCookie('cf_prop_types',selected1,7);
            alert("Values selected saved: " + selected1);

        }
        var alerta2 = function(){
            var x = getCookie('cf_prop_types');
            if (x) {
                var valores = x.split(",");
                var j = 0;
                var valor =document.getElementsByTagName('select')[0]
                valor.options[0].selected = false;
                for (var i = 0; i < valor.length; i++) {
                    if (valor.options[i].value == valores[j] ) {
                        valor.options[i].selected = true;
                        j++;
                    }
                }
                alert("Values added: "+ x);
            }
        }
        var alerta3 = function(){
            var valor =document.getElementsByTagName('select')[1]
            var selected1 = [];
            for (var i = 0; i < valor.length; i++) {
                if (valor.options[i].selected) selected1.push(valor.options[i].value);
            }
            setCookie('cf_prop_proj',selected1,7);
            alert("Values selected saved: " + selected1);
        }
        var alerta4 = function(){
            var x = getCookie('cf_prop_proj');
            if (x) {
                var valores = x.split(",");
                var j = 0;
                var valor =document.getElementsByTagName('select')[1]
                for (var i = 0; i < valor.length; i++) {
                    if (valor.options[i].value == valores[j] ) {
                        valor.options[i].selected = true;
                        j++;
                    }
                }
                var check =document.getElementById('global_false');
                check.checked = true;
                alert("Values added: "+ x);
            }
        }
        btn.click(alerta);
        x.append(btn);
        btn2.click(alerta2);
        x.append(btn2);
        btn3.click(alerta3);
        x.append(btn3);
        btn4.click(alerta4);
        x.append(btn4);
    }
}




function issuetypes_call() {
    var x = jQuery("#ak-main-content");
    var btn = jQuery("<button id='rauliki' class='aui-button'>JiraSupport [SUAJ]!</button>");
    var alerta = function(){
        this.remove();
        issuetypes();
    }

    btn.click(alerta);
    x.prepend(btn);
}

function statuses_call() {
    var x = jQuery(".aui-page-header-actions");
    var btn = jQuery("<button id='rauliki' class='aui-button'>JiraSupport [SUAJ]!</button>");
    var alerta = function(){
        this.remove();
        statuses();
    }

    btn.click(alerta);
    x.append(btn);
}

function resolutions_call() {
    var x = jQuery(".admin-search");
    var btn = jQuery("<button id='rauliki' class='aui-button'>JiraSupport [SUAJ]!</button>");
    var alerta = function(){
        this.remove();
        resolutions();
    }

    btn.click(alerta);
    x.append(btn);
}

function priorities_call() {
    var x = jQuery(".admin-search");
    var btn = jQuery("<button id='rauliki' class='aui-button'>JiraSupport [SUAJ]!</button>");
    var alerta = function(){
        this.remove();
        priorities();
    }

    btn.click(alerta);
    x.append(btn);
}

function customfields_call() {
    var x = jQuery("#ak-main-content");
    var btn = jQuery("<button id='rauliki' class='aui-button'>JiraSupport [SUAJ]!</button>");
    var alerta = function(){
        this.remove();
        customfields();
    }

    btn.click(alerta);
    x.prepend(btn);
}

function issuetypesscheme_call() {
    var x = jQuery("#ak-main-content");
    var btn = jQuery("<button id='rauliki' class='aui-button'>JiraSupport [SUAJ]!</button>");
    var alerta = function(){
        this.remove();
        issuetypesscheme()
    }

    btn.click(alerta);
    x.prepend(btn);
}


function views_call() {
    var x = jQuery("#ak-main-content");
    var btn = jQuery("<button id='rauliki' class='aui-button'>JiraSupport [SUAJ]!</button>");
    var alerta = function(){
        this.remove();
        views();
    }

    btn.click(alerta);
    x.prepend(btn);
}

function viewsscheme_call(){
    var x = jQuery("#ak-main-content");
    var btn = jQuery("<button id='rauliki' class='aui-button'>JiraSupport [SUAJ]!</button>");
    var alerta = function(){
        this.remove();
        viewsscheme();
    }

    btn.click(alerta);
    x.prepend(btn);
}

function viewsschemeissue_call(){
    var x = jQuery("#ak-main-content");
    var btn = jQuery("<button id='rauliki' class='aui-button'>JiraSupport [SUAJ]!</button>");
    var alerta = function(){
        this.remove();
        viewsschemeissue();
    }

    btn.click(alerta);
    x.prepend(btn);
}

function dvcsraul_call(){
    var x = jQuery(".aui-button.submit");
    var btn = jQuery("<button id='rauliki' class='aui-button'>JiraSupport [SUAJ]!</button>");
    var alerta = function(){
        this.remove();
        dvcsraul();
    }

    btn.click(alerta);
    x.after(btn);
}

function fieldconfig_call(){
    var x = jQuery(".aui-buttons");
    var btn = jQuery("<button id='rauliki' class='aui-button'>JiraSupport [SUAJ]!</button>");
    var alerta = function(){
        this.remove();
        fieldconfig();
    }

    btn.click(alerta);
    x.append(btn);
}

function fieldconfigaux_call(){
    var x = jQuery(".jiraform");
    var btn = jQuery("<button id='rauliki' class='aui-button'>JiraSupport [SUAJ]!</button>");
    var alerta = function(){
        this.remove();
        fieldauxconfig();
    }

    btn.click(alerta);
    x.append(btn);
}

function fieldconfigscheme_call(){
    var x = jQuery(".aui-buttons");
    var btn = jQuery("<button id='rauliki' class='aui-button'>JiraSupport [SUAJ]!</button>");
    var alerta = function(){
        this.remove();
        fieldconfigscheme();
    }

    btn.click(alerta);
    x.append(btn);
}

function permissionscheme_call(){
    var x = jQuery(".jiraformbody");
    var btn = jQuery("<button id='rauliki' class='aui-button'>JiraSupport [SUAJ]!</button>");
    var alerta = function(){
        this.remove();
        permissionscheme();
    }

    btn.click(alerta);
    x.append(btn);

    x = jQuery(".aui-buttons");
    btn = jQuery("<button id='rauliki' class='aui-button'>JiraSupport [SUAJ]!</button>");
    alerta = function(){
        this.remove();
        permissionscheme();
    }

    btn.click(alerta);
    x.append(btn);
}

function notificationscheme_call(){
    var x = jQuery(".jiraformbody");
    var btn = jQuery("<button id='rauliki' class='aui-button'>JiraSupport [SUAJ]!</button>");
    var alerta = function(){
        this.remove();
        notificationscheme();
    }

    btn.click(alerta);
    x.append(btn);
}

function workflowscheme_call(){
    var x = jQuery(".aui-buttons");
    var btn = jQuery("<button id='rauliki' class='aui-button'>JiraSupport [SUAJ]!</button>");
    var alerta = function(){
        this.remove();
        workflowscheme();
    }

    btn.click(alerta);
    x.append(btn);
}

function browseprojects_call(){
    var x = jQuery(".aui-page-header-actions");
    var btn = jQuery("<button id='rauliki' class='aui-button'>JiraSupport [SUAJ]!</button>");
    var alerta = function(){
        this.remove();
        browseprojects();
    }

    btn.click(alerta);
    x.append(btn);
}

function subtasks_call(){
    var x = jQuery(".toolbar-item");
    var btn = jQuery("<button id='rauliki' class='aui-button'>JiraSupport [SUAJ]!</button>");
    var alerta = function(){
        this.remove();
        subtasks();
    }

    btn.click(alerta);
    x.append(btn);
}

function fieldsscreens_call(){

    var x = jQuery(".aui-navgroup-primary");
    var btn = jQuery("<button id='rauliki' class='aui-button'>JiraSupport [SUAJ]!</button>");
    var alerta = function(){
        this.remove();
        fieldscreens();
    }

    btn.click(alerta);
    x.append(btn);
}


function migration_call(){

    var x = jQuery(".aui-navgroup-primary");
    var btn = jQuery("<button id='rauliki' class='aui-button'>JiraSupport [SUAJ]!</button>");
    var alerta = function(){
        this.remove();
        migration();
    }

    btn.click(alerta);
    x.append(btn);
}


function field_properties_call(){

    var x = jQuery(".admin-search");
    var btn = jQuery("<button id='rauliki' class='aui-button'>JiraSupport [SUAJ]!</button>");
    var alerta = function(){
        this.remove();
        fields_settings();
    }

    btn.click(alerta);
    x.append(btn);
}

function link_call(){

    var x = jQuery(".admin-search");
    var btn = jQuery("<button id='rauliki' class='aui-button'>JiraSupport [SUAJ]!</button>");
    var alerta = function(){
        this.remove();
        links();
    }

    btn.click(alerta);
    x.append(btn);
}

function migration() {
    var divs = document.getElementsByTagName("tbody");
    for (var i = 0; i < divs.length; i++) {
        var para = divs[i].getElementsByTagName("span");
        if ( para[0] ) {
            if (para[0].title == "Affected issues: 0 of 0") {
                divs[i].style.visibility = "hidden";
            }
        }
    }

    var table = document.getElementById("workflow-mapping-table");

    var divs2 = document.getElementsByTagName("tbody");
    var longitud = divs2.length - 1;
    for (var j = longitud; j >= 0; j--) {
        if (divs2[j].style.visibility =="hidden") {
            //Si los borro da error
            //divs[j].remove();
            //Los muevo al final
            table.appendChild(divs2[j]);
        }
    }
}

var pathname = window.location.pathname;


//Set the functions in each page
if (pathname == "/secure/admin/ViewCustomFields.jspa" || pathname == "/jira/secure/admin/ViewCustomFields.jspa") {
    setTimeout(function() { customfields_call(); }, 60);
} else if (pathname == "/jira/settings/issues/issue-types") {
    setTimeout(function() { issuetypes_call(); }, 60);
} else if (pathname == "/jira/settings/issues/issue-type-schemes") {
    setTimeout(function() { issuetypesscheme_call(); }, 60);
} else if (pathname == "/secure/admin/ViewPriorities.jspa" || pathname == "/jira/secure/admin/ViewPriorities.jspa") {
    setTimeout(function() { priorities_call(); }, 60);
} else if (pathname == "/secure/admin/ViewResolutions.jspa" || pathname == "/jira/secure/admin/ViewResolutions.jspa") {
    setTimeout(function() { resolutions_call(); }, 60);
} else if (pathname == "/secure/admin/ViewStatuses.jspa" || pathname == "/jira/secure/admin/ViewStatuses.jspa") {
    setTimeout(function() { statuses_call(); }, 60);
} else if (pathname == "/jira/settings/issues/screens") {
    setTimeout(function() { views_call(); }, 60);
} else if (pathname == "/jira/settings/issues/screen-schemes") {
    setTimeout(function() { viewsscheme_call(); }, 60);
} else if (pathname == "/jira/settings/issues/issue-type-screen-schemes") {
    setTimeout(function() { viewsschemeissue_call(); }, 60);
} else if (pathname == "/secure/admin/ConfigureDvcsOrganizations!default.jspa" || pathname == "/jira/secure/admin/ConfigureDvcsOrganizations!default.jspa") {
    setTimeout(function() { dvcsraul_call(); }, 60);
} else if (pathname == "/secure/admin/ViewFieldLayouts.jspa" || pathname == "/jira/secure/admin/ViewFieldLayouts.jspa") {
    setTimeout(function() { fieldconfig_call(); }, 60);
} else if (pathname == "/secure/admin/ConfigureFieldLayout!default.jspa" || pathname == "/jira/secure/admin/ConfigureFieldLayout!default.jspa" || pathname == "/secure/admin/ViewIssueFields.jspa" || pathname == "/jira/secure/admin/ViewIssueFields.jspa") {
    setTimeout(function() { fieldconfigaux_call(); }, 60);
} else if (pathname == "/secure/admin/ViewFieldLayoutSchemes.jspa" || pathname == "/jira/secure/admin/ViewFieldLayoutSchemes.jspa") {
    setTimeout(function() { fieldconfigscheme_call(); }, 60);
} else if (pathname == "/secure/admin/ViewPermissionSchemes.jspa" || pathname == "/jira/secure/admin/ViewPermissionSchemes.jspa") {
    setTimeout(function() { permissionscheme_call(); }, 60);
} else if (pathname == "/secure/admin/ViewNotificationSchemes.jspa" || pathname == "/jira/secure/admin/ViewNotificationSchemes.jspa") {
    setTimeout(function() { notificationscheme_call(); }, 60);
} else if (pathname == "/secure/admin/ViewWorkflowSchemes.jspa" || pathname == "/jira/secure/admin/ViewWorkflowSchemes.jspa") {
    setTimeout(function() { workflowscheme_call(); }, 60);
} else if (pathname == "/secure/BrowseProjects.jspa" || pathname == "/jira/secure/BrowseProjects.jspa") {
    setTimeout(function() { browseprojects_call(); }, 60);
} else if (pathname == "/secure/admin/subtasks/ManageSubTasks.jspa" || pathname == "/jira/secure/admin/subtasks/ManageSubTasks.jspa") {
    setTimeout(function() { subtasks_call(); }, 60);
} else if (pathname == "/secure/admin/AssociateFieldToScreens!default.jspa" || pathname == "/jira/secure/admin/AssociateFieldToScreens!default.jspa") {
    setTimeout(function() { fieldsscreens_call(); }, 60);
} else if (pathname == "/secure/project/SelectProjectWorkflowSchemeStep2!default.jspa" || pathname == "/jira/secure/project/SelectProjectWorkflowSchemeStep2!default.jspa") {
    setTimeout(function() { migration_call(); }, 60);
} else if (pathname == "/secure/admin/ManageConfigurationScheme!default.jspa" || pathname == "/jira/secure/admin/ManageConfigurationScheme!default.jspa") {
    setTimeout(function() { field_properties_call(); }, 60);
} else if (pathname == "/secure/admin/ViewLinkTypes!default.jspa" || pathname == "/jira/secure/admin/ViewLinkTypes!default.jspa") {
    setTimeout(function() { link_call(); }, 60);
}




function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}





function search_project( valor) {

    var name = valor.toLowerCase();
    var find = false;
    var firstsearch = null;
    var other = false;

    var divs
    var divs2 = document.getElementsByTagName('table')
    for (var j = 0; j < divs2.length; j++) {
        divs = divs2[j].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
        for (var i = 0; i < divs.length; i++) {
            var para = divs[i].getElementsByTagName("td");
            if ( para[0] ) {
                var index = para[1].innerText.toLowerCase().indexOf(name);
                if (index != -1) {
                    if ( other == false ) {
                        firstsearch = para;
                        other = true;
                    }
                    if ( para[0].innerText.toLowerCase() == name ) {
                        para[0].scrollIntoView();
                        find = true;
                        break;
                    }
                }
            }
        }
    }
    if (!find) {
        for (var j = 0; j < divs2.length; j++) {
            divs = divs2[j].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
            for (var i = 0; i < divs.length; i++) {
                para = divs[i].getElementsByTagName("td");
                if ( para[0] ) {
                    index = para[2].innerText.toLowerCase().indexOf(name);
                    if (index != -1) {
                        if ( other == false ) {
                            firstsearch = para;
                            other = true;
                        }
                        if ( para[0].innerText.toLowerCase() == name ) {
                            para[0].scrollIntoView();
                            find = true;
                            break;
                        }
                    }
                }
            }
        }
    }
    if (other && !find ) firstsearch[0].scrollIntoView();
}





function links() {
    var pathname = window.location.pathname;
    if (pathname == "/secure/admin/ViewLinkTypes!default.jspa"|| pathname == "/jira/secure/admin/ViewLinkTypes!default.jspa") {
        var divs = document.getElementsByTagName('table')[1].getElementsByTagName("tr");
        var options_custom = "";
        for (var i = 0; i < divs.length; i++) {
            var para = divs[i].getElementsByTagName("td");
            //options_custom = options_custom +"<option value='" + para[0].getElementsByTagName("b")[0].innerText + "' />";
            if (para[3]) {
            var links = para[3].getElementsByTagName("a");
            if (links) {
                var id_issuetype = links[0].href.split("id=");
                para[0].innerHTML = para[0].innerHTML +  "<br><b>ID:</b>"+ id_issuetype[1];
                options_custom = options_custom +"<option value='" + id_issuetype[1] + "' />";
                for (var j = 0; j < 1; j++) { //links.length; j++) {
                    para[0].innerHTML = para[0].innerHTML + "&nbsp;<a href='"+links[j].href+"' target='_new'>["+links[j].innerText.toUpperCase()+"]</a>";
                }
                para[0].innerHTML = para[0].innerHTML + "&nbsp;<a href='javascript:document.getElementById(\"search_issuetype\").focus();document.getElementById(\"search_issuetype\").setSelectionRange(0, document.getElementById(\"search_issuetype\").value.length)'>[TOP]</a>";
            }

        }

    }
}
}



function search_subtask( valor) {

    var name = valor.toLowerCase();
    var find = false;
    var firstsearch = null;
    var other = false;

    var divs = jQuery("table[id='sub-task-list']");
    var options_custom = "";
    for (var i = 0; i < divs.length; i++) {
        var para2 = divs[i].getElementsByTagName("tr");
        for (var j = 0; j < para2.length; j++) {
            var para = para2[j].getElementsByTagName("td");
            if ( para[0] ) {
                var index = para[0].innerText.toLowerCase().indexOf(name);
                if (index != -1) {
                    if ( other == false ) {
                        firstsearch = para;
                        other = true;
                    }
                    if ( para[0].innerText.toLowerCase() == name ) {
                        para[0].scrollIntoView();
                        find = true;
                        break;
                    }
                }
            }
        }
    }

    if (other && !find ) firstsearch[0].scrollIntoView();
}

function search_status( valor) {

    var name = valor.toLowerCase();
    var find = false;
    var firstsearch = null;
    var other = false;

    var divs = document.getElementById('table-issue-statuses').getElementsByTagName("tr");
    for (var i = 0; i < divs.length; i++) {
        var para = divs[i].getElementsByTagName("td");
        if ( para[0] ) {
            var index = para[0].innerText.toLowerCase().indexOf(name);
            if (index != -1) {
                if ( other == false ) {
                    firstsearch = para;
                    other = true;
                }
                if ( para[0].getElementsByTagName("b")[0].innerText.toLowerCase() == name ) {
                    para[0].scrollIntoView();
                    find = true;
                    break;
                }
            }
        }
    }

    if (other && !find ) firstsearch[0].scrollIntoView();
}

function search_issuetype( valor) {

    var name = valor.toLowerCase();
    var find = false;
    var firstsearch = null;
    var other = false;

    var divs = document.getElementById('ak-main-content').getElementsByTagName("tr");
    for (var i = 0; i < divs.length; i++) {
        var para = divs[i].getElementsByTagName("td");
        if ( para[0] ) {
            var index = para[0].innerText.toLowerCase().indexOf(name);
            if (index != -1) {
                if ( other == false ) {
                    firstsearch = para;
                    other = true;
                }

                if ( para[0].getElementsByTagName("b")[0].innerText.toLowerCase() == name ) {
                    para[0].scrollIntoView();
                    find = true;
                    break;
                }
            }
        }
    }

    if (other && !find ) firstsearch[0].scrollIntoView();
}

function search_issuetype_scheme( valor) {

    var name = valor.toLowerCase();
    var find = false;
    var firstsearch = null;
    var other = false;

    var divs = document.getElementById('ak-main-content').getElementsByTagName("tr");
    for (var i = 0; i < divs.length; i++) {
        var para = divs[i].getElementsByTagName("td");
        if ( para[0] ) {
            var index = para[0].innerText.toLowerCase().indexOf(name);
            if (index != -1) {
                if ( other == false ) {
                    firstsearch = para;
                    other = true;
                }

                if ( para[0].innerText.toLowerCase() == name ) {
                    para[0].scrollIntoView();
                    find = true;
                    break;
                }
            }
        }
    }
    if (other && !find ) firstsearch[0].scrollIntoView();
}


function search_workflow_scheme( valor) {

    var divs = jQuery("div[class='module toggle-wrap collapsed']")
    for (var i = 0; i < divs.length; i++) {
        divs[i].className = "module toggle-wrap expanded";
    }

    var name = valor.toLowerCase();
    var find = false;
    var firstsearch = null;
    var other = false;

    var divs = jQuery("table[class='aui aui-table-rowhover list-workflow-table']");
    for (var i = 0; i < divs.length; i++) {
        var para2 = divs[i].getElementsByTagName("tr");
        for (var j = 0; j < para2.length; j++) {
            var para = para2[j].getElementsByTagName("td");
            if ( para[0] ) {
                var index = para[0].getElementsByTagName("strong")[0].innerText.toLowerCase().indexOf(name);
                if (index != -1) {
                    if ( other == false ) {
                        firstsearch = para;
                        other = true;
                    }

                    if ( para[0].getElementsByTagName("strong")[0].innerText.toLowerCase() == name ) {
                        para[0].scrollIntoView();
                        find = true;
                        break;
                    }
                }

            }
        }
    }
    if (other && !find ) firstsearch[0].scrollIntoView();
}

function search_view( valor) {

    var name = valor.toLowerCase();
    var find = false;
    var firstsearch = null;
    var other = false;


    var divs = document.getElementById('ak-main-content').getElementsByTagName("tr");
    for (var i = 0; i < divs.length; i++) {
        var para = divs[i].getElementsByTagName("td");
        if ( para[0] ) {
            var index = para[0].innerText.toLowerCase().indexOf(name);
            if (index != -1) {
                if ( other == false ) {
                    firstsearch = para;
                    other = true;
                }

                if ( para[0].innerText.toLowerCase() == name ) {
                    para[0].scrollIntoView();
                    find = true;
                    break;
                }
            }
        }
    }
    if (other && !find ) firstsearch[0].scrollIntoView();
}

function search_view_scheme( valor) {

    var name = valor.toLowerCase();
    var find = false;
    var firstsearch = null;
    var other = false;

    var divs = document.getElementById('ak-main-content').getElementsByTagName("tr");
    for (var i = 0; i < divs.length; i++) {
        var para = divs[i].getElementsByTagName("td");
        if ( para[0] ) {
            var index = para[0].innerText.toLowerCase().indexOf(name);
            if (index != -1) {
                if ( other == false ) {
                    firstsearch = para;
                    other = true;
                }

                if ( para[0].innerText.toLowerCase() == name ) {
                    para[0].scrollIntoView();
                    find = true;
                    break;
                }
            }
        }
    }
    if (other && !find ) firstsearch[0].scrollIntoView();
}

function search_view_scheme_issue( valor) {

    var name = valor.toLowerCase();
    var find = false;
    var firstsearch = null;
    var other = false;

    var divs = document.getElementById('ak-main-content').getElementsByTagName("tr");
    for (var i = 0; i < divs.length; i++) {
        var para = divs[i].getElementsByTagName("td");
        if ( para[0] ) {
            var index = para[0].innerText.toLowerCase().indexOf(name);
            if (index != -1) {
                if ( other == false ) {
                    firstsearch = para;
                    other = true;
                }

                if ( para[0].innerText.toLowerCase() == name ) {
                    para[0].scrollIntoView();
                    find = true;
                    break;
                }
            }
        }
    }
    if (other && !find ) firstsearch[0].scrollIntoView();
}

function search_customfield( valor) {

    var name = valor.toLowerCase();
    var find = false;
    var firstsearch = null;
    var other = false;

    var divs = document.getElementById('ak-main-content').getElementsByTagName("tr");
    for (var i = 0; i < divs.length; i++) {
        var para = divs[i].getElementsByTagName("td");
        if ( para[0] ) {
            var index = para[0].innerText.toLowerCase().indexOf(name);
            if (index != -1) {
                if ( other == false ) {
                    firstsearch = para;
                    other = true;
                }

                if ( para[0].innerText.toLowerCase() == name ) {
                    para[0].scrollIntoView();
                    find = true;
                    break;
                }
            }
        }
    }
    if (other && !find ) firstsearch[0].scrollIntoView();
}


function search_field_config( valor) {

    var name = valor.toLowerCase();
    var find = false;
    var firstsearch = null;
    var other = false;


    var divs = document.getElementById('field-configurations-table').getElementsByTagName("tr");
    for (var i = 0; i < divs.length; i++) {
        var para = divs[i].getElementsByTagName("td");
        if ( para[0] ) {
            var index = para[0].getElementsByTagName("a")[0].innerText.toLowerCase().indexOf(name);
            if (index != -1) {
                if ( other == false ) {
                    firstsearch = para;
                    other = true;
                }

                if ( para[0].getElementsByTagName("a")[0].innerText.toLowerCase() == name ) {
                    para[0].scrollIntoView();
                    find = true;
                    break;
                }
            }
        }
    }
    if (other && !find ) firstsearch[0].scrollIntoView();
}

function search_field_config_scheme( valor) {

    var name = valor.toLowerCase();
    var find = false;
    var firstsearch = null;
    var other = false;


    var divs = document.getElementById('field-configuration-schemes-table').getElementsByTagName("tr");
    for (var i = 0; i < divs.length; i++) {
        var para = divs[i].getElementsByTagName("td");
        if ( para[0] ) {
            var index = para[0].getElementsByTagName("a")[0].innerText.toLowerCase().indexOf(name);
            if (index != -1) {
                if ( other == false ) {
                    firstsearch = para;
                    other = true;
                }

                if ( para[0].getElementsByTagName("a")[0].innerText.toLowerCase() == name ) {
                    para[0].scrollIntoView();
                    find = true;
                    break;
                }
            }
        }
    }
    if (other && !find ) firstsearch[0].scrollIntoView();
}

function search_notification_scheme( valor) {

    var name = valor.toLowerCase();
    var find = false;
    var firstsearch = null;
    var other = false;

    var divs = jQuery("table[id='notification_schemes']");
    var options_custom = "";
    for (var i = 0; i < divs.length; i++) {
        var para2 = divs[i].getElementsByTagName("tr");
        for (var j = 0; j < para2.length; j++) {
            var para = para2[j].getElementsByTagName("td");
            if ( para[0] ) {
                var index = para[0].getElementsByTagName("a")[0].innerText.toLowerCase().indexOf(name);
                if (index != -1) {
                    if ( other == false ) {
                        firstsearch = para;
                        other = true;
                    }

                    if ( para[0].getElementsByTagName("a")[0].innerText.toLowerCase() == name ) {
                        para[0].scrollIntoView();
                        find = true;
                        break;
                    }
                }
            }
        }
    }
    if (other && !find ) firstsearch[0].scrollIntoView();
}

function search_permission_scheme( valor) {

    var name = valor.toLowerCase();
    var find = false;
    var firstsearch = null;
    var other = false;

    var divs = document.getElementById('permission_schemes_table').getElementsByTagName("tr");
    for (var i = 0; i < divs.length; i++) {
        var para = divs[i].getElementsByTagName("td");
        if ( para[0] ) {
            var index = para[0].getElementsByTagName("a")[0].innerText.toLowerCase().indexOf(name);
            if (index != -1) {
                if ( other == false ) {
                    firstsearch = para;
                    other = true;
                }

                if ( para[0].getElementsByTagName("a")[0].innerText.toLowerCase() == name ) {
                    para[0].scrollIntoView();
                    find = true;
                    break;
                }
            }
        }
    }
    if (other && !find ) firstsearch[0].scrollIntoView();
}

function search_dvcs( valor) {

    var name = valor.toLowerCase();
    var find = false;
    var firstsearch = null;
    var other = false;

    var divs = document.getElementById('dvcs-repos-table-1').getElementsByTagName("tr");
    for (var i = 0; i < divs.length; i++) {
        var para = divs[i].getElementsByTagName("td");
        if ( para[0] ) {
            var index = para[0].innerText.toLowerCase().indexOf(name);
            if (index != -1) {
                if ( other == false ) {
                    firstsearch = para;
                    other = true;
                }

                if ( para[0].getElementsByTagName("a")[0].innerText.toLowerCase() == name ) {
                    para[0].scrollIntoView();
                    find = true;
                    break;
                }
            }
        }
    }

    if (other && !find ) firstsearch[0].scrollIntoView();
}

function search_fieldaux_config( valor) {

    var name = valor.toLowerCase();
    var find = false;
    var firstsearch = null;
    var other = false;


    var divs = document.getElementById('field_table').getElementsByTagName("tr");
    for (var i = 0; i < divs.length; i++) {
        var para = divs[i].getElementsByTagName("td");
        if ( para[0] ) {
            var span = para[0].getElementsByTagName("span")[0];
            var b = para[0].getElementsByTagName("b")[0];
            if ( span == null)
                span = b;
            var index = span.innerText.toLowerCase().indexOf(name);
            if (index != -1) {
                if ( other == false ) {
                    firstsearch = para;
                    other = true;
                }

                if ( span.innerText.toLowerCase() == name ) {
                    para[0].scrollIntoView();
                    find = true;
                    break;
                }
            }
        }
    }
    if (other && !find ) firstsearch[0].scrollIntoView();
}

function setscreentab ( valor ) {
    var nodeList = document.getElementsByTagName("select");
    var item;
    var item2;
    var i = 0;
    var longitud = 0;
    for(item in nodeList) {
        try {
            longitud = nodeList[item].options.length;
        } catch( err) { longitud = 0; }
        for ( i =0; i < longitud ; i++) {
            if (  nodeList[item].options[i].text == valor) {
                nodeList[item].options[i].selected = 'selected';
                var namewai = nodeList[item].name;
                var nodeList2 = document.getElementsByTagName("input");
                for(item2 in nodeList2) {
                    //alert(nodeList2[item2].value);
                    if ( nodeList2[item2].value == namewai ) {
                        nodeList2[item2].checked = true;
                    }
                }
            }
        }
    }

}

