/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Server
 * Copyright (C) 2004, 2005, 2006, 2007, 2009, 2010, 2013 Zimbra Software, LLC.
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

package com.zimbra.cs.client.soap;

import java.util.*;

import com.zimbra.cs.client.*;

public class LmcGetTagResponse extends LmcSoapResponse {

    // for storing the returned tags
    private ArrayList mTags;

    public LmcTag[] getTags() {
        if (mTags == null || mTags.size() == 0)
        	return null;
        LmcTag tags[] = new LmcTag[mTags.size()];
        return (LmcTag []) mTags.toArray(tags);
    }
    
    public void setTags(ArrayList a) { mTags = a; }
}