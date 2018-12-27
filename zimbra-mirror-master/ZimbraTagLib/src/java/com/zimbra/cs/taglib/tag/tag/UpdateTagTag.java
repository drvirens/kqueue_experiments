/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Server
 * Copyright (C) 2007, 2009, 2010, 2011, 2013 Zimbra Software, LLC.
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
package com.zimbra.cs.taglib.tag.tag;

import com.zimbra.cs.taglib.tag.ZimbraSimpleTag;
import com.zimbra.client.ZTag;
import com.zimbra.common.service.ServiceException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspTagException;
import java.io.IOException;

public class UpdateTagTag extends ZimbraSimpleTag {

    private String mId;
    private String mName;
    private ZTag.Color mColor;

    public void setId(String id) { mId = id; }
    public void setName(String name) { mName = name; }
    public void setColor(String color) throws ServiceException { mColor = ZTag.Color.fromString(color); }

    public void doTag() throws JspException, IOException {
        try {
            getMailbox().updateTag(mId, mName, mColor);
        } catch (ServiceException e) {
            throw new JspTagException(e);
        }
    }
}