/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Web Client
 * Copyright (C) 2010, 2013 Zimbra Software, LLC.
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
JSDOC.PluginManager.registerPlugin(
	"JSDOC.symbolLink",
	{
		onSymbolLink: function(link) {
			// modify link.linkPath (the href part of the link)
			// or link.linkText (the text displayed)
			// or link.linkInner (the #name part of the link)
		}
	}
);