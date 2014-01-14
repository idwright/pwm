<%@ page import="password.pwm.config.PwmSetting" %>
<%@ page import="password.pwm.servlet.ConfigEditorServlet" %>
<%@ page import="password.pwm.bean.ConfigEditorCookie" %>
<%@ page import="password.pwm.util.Helper" %>
<%@ page import="password.pwm.util.ServletHelper" %>
<%--
  ~ Password Management Servlets (PWM)
  ~ http://code.google.com/p/pwm/
  ~
  ~ Copyright (c) 2006-2009 Novell, Inc.
  ~ Copyright (c) 2009-2013 The PWM Project
  ~
  ~ This program is free software; you can redistribute it and/or modify
  ~ it under the terms of the GNU General Public License as published by
  ~ the Free Software Foundation; either version 2 of the License, or
  ~ (at your option) any later version.
  ~
  ~ This program is distributed in the hope that it will be useful,
  ~ but WITHOUT ANY WARRANTY; without even the implied warranty of
  ~ MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  ~ GNU General Public License for more details.
  ~
  ~ You should have received a copy of the GNU General Public License
  ~ along with this program; if not, write to the Free Software
  ~ Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
  --%>

<%
    final ConfigEditorCookie cookie = ConfigEditorServlet.readConfigEditorCookie(request, response);
%>
<% boolean showAdvanced = cookie.getLevel() > 1; %>
<script type="text/javascript">
    var advancedSettingsAreVisible = false;
    function toggleAdvancedSettingsDisplay() {
        require(['dojo/fx'], function(fx) {
            var advSetElement = getObject('advancedSettings');
            if (advancedSettingsAreVisible) {
                fx.wipeOut({node:advSetElement }).play();
                getObject('showAdvancedSettingsButton').style.display='block';
            } else {
                fx.wipeIn({ node:advSetElement }).play();
                getObject('showAdvancedSettingsButton').style.display='none';
            }
            advancedSettingsAreVisible = !advancedSettingsAreVisible;
        });
    }
    <%
    boolean jumpToSetting = false;
    if (cookie.getSetting() != null & !cookie.getSetting().isEmpty()) {
        PwmSetting setting = PwmSetting.forKey(cookie.getSetting());
        if (setting != null && PwmSetting.getSettings(cookie.getCategory()).contains(setting)) {
            if (setting.getLevel() > 0) {
                showAdvanced = true;
            }
            jumpToSetting = true;
        }
    }
    %>
    PWM_GLOBAL['startupFunctions'].push(function(){
        <% if (showAdvanced) { %>
        toggleAdvancedSettingsDisplay();
        <% } %>
        <% if (jumpToSetting) { %>
        setTimeout(function(){
            var settingElement = getObject("outline_<%=cookie.getSetting()%>");
            require(["dojo/window","dojo/_base/fx","dojo/fx"],function(win, baseFx, fx){
                win.scrollIntoView(settingElement);
                var animA = baseFx.fadeOut({node: "outline_<%=cookie.getSetting()%>",duration:1000});
                var animB = baseFx.fadeIn({node: "outline_<%=cookie.getSetting()%>",duration:3000});
                fx.chain([animA, animB]).play();
            });
            delete preferences['setting'];
            setConfigEditorCookie();
    },1500);
        <% } %>
    });
</script>