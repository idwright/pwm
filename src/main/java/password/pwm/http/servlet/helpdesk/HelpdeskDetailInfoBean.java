/*
 * Password Management Servlets (PWM)
 * http://www.pwm-project.org
 *
 * Copyright (c) 2006-2009 Novell, Inc.
 * Copyright (c) 2009-2016 The PWM Project
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 */

package password.pwm.http.servlet.helpdesk;

import password.pwm.bean.UserInfoBean;
import password.pwm.config.FormConfiguration;
import password.pwm.svc.event.UserAuditRecord;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class HelpdeskDetailInfoBean implements Serializable {
    private UserInfoBean userInfoBean = new UserInfoBean();
    private String userDisplayName;

    private boolean intruderLocked;
    private boolean accountEnabled;
    private boolean accountExpired;

    private Date lastLoginTime;
    private List<UserAuditRecord> userHistory;
    private Map<FormConfiguration, List<String>> searchDetails;
    private String passwordSetDelta;

    public String getUserDisplayName() {
        return userDisplayName;
    }

    public void setUserDisplayName(final String userDisplayName) {
        this.userDisplayName = userDisplayName;
    }

    public UserInfoBean getUserInfoBean() {
        return userInfoBean;
    }

    public void setUserInfoBean(final UserInfoBean userInfoBean) {
        this.userInfoBean = userInfoBean;
    }

    public boolean isIntruderLocked() {
        return intruderLocked;
    }

    public void setIntruderLocked(final boolean intruderLocked) {
        this.intruderLocked = intruderLocked;
    }

    public boolean isAccountEnabled() {
        return accountEnabled;
    }

    public void setAccountEnabled(final boolean accountEnabled) {
        this.accountEnabled = accountEnabled;
    }

    public Date getLastLoginTime() {
        return lastLoginTime;
    }

    public void setLastLoginTime(final Date lastLoginTime) {
        this.lastLoginTime = lastLoginTime;
    }

    public List<UserAuditRecord> getUserHistory() {
        return userHistory;
    }

    public void setUserHistory(final List<UserAuditRecord> userHistory) {
        this.userHistory = userHistory;
    }

    public Map<FormConfiguration, List<String>> getSearchDetails() {
        return searchDetails;
    }

    public void setSearchDetails(final Map<FormConfiguration, List<String>> searchDetails) {
        this.searchDetails = searchDetails;
    }

    public String getPasswordSetDelta() {
        return passwordSetDelta;
    }

    public void setPasswordSetDelta(final String passwordSetDelta) {
        this.passwordSetDelta = passwordSetDelta;
    }

    public boolean isAccountExpired() {
        return accountExpired;
    }

    public void setAccountExpired(final boolean accountExpired) {
        this.accountExpired = accountExpired;
    }
}
