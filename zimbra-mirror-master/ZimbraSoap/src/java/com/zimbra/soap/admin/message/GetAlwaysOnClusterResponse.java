/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Server
 * Copyright (C) 2013 Zimbra Software, LLC.
 * 
 * The contents of this file are subject to the Zimbra Public License
 * Version 1.4 ("License"); you may not use this file except in
 * compliance with the License.  You may obtain a copy of the License at
 * http://www.zimbra.com/license.
 * 
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied.
 * ***** END LICENSE BLOCK *****
 */

package com.zimbra.soap.admin.message;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import com.zimbra.common.soap.AdminConstants;
import com.zimbra.soap.admin.type.AlwaysOnClusterInfo;

@XmlRootElement(name=AdminConstants.E_GET_ALWAYSONCLUSTER_RESPONSE)
public class GetAlwaysOnClusterResponse {

    /**
     * @zm-api-field-description Information about server
     */
    @XmlElement(name=AdminConstants.E_ALWAYSONCLUSTER)
    private final AlwaysOnClusterInfo cluster;

    /**
     * no-argument constructor wanted by JAXB
     */
    @SuppressWarnings("unused")
    private GetAlwaysOnClusterResponse() {
        this(null);
    }

    public GetAlwaysOnClusterResponse(AlwaysOnClusterInfo cluster) {
        this.cluster = cluster;
    }

    public AlwaysOnClusterInfo getAlwaysOnCluster() { return cluster; }
}
