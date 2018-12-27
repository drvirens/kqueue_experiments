/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Zimlets
 * Copyright (C) 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013 Zimbra Software, LLC.
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

/**
 * @class
 * Internal handler for email addresses.
 *
 * @author Conrad Damon
 * @extends	ZmObjectHandler
 */
ZmEmailObjectHandler = function() {
	ZmObjectHandler.call(this, 'email');
};

ZmEmailObjectHandler.prototype = new ZmObjectHandler;
ZmEmailObjectHandler.prototype.constructor = ZmEmailObjectHandler;

ZmEmailObjectHandler.prototype.isZmEmailObjectHandler = true;
ZmEmailObjectHandler.prototype.toString = function() {
	return 'ZmEmailObjectHandler';
};

// email regex that recognizes mailto: links as well
ZmEmailObjectHandler.RE = /\b(mailto:[ ]*)?([0-9a-zA-Z]+[.&#!$%'*+-/=?^_`{}|~])*[0-9a-zA-Z_-]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}([\w/_\.]*(\?\S+)?)\b/gi;


ZmEmailObjectHandler.prototype.match = function(content, startIndex, objectMgr) {

	ZmEmailObjectHandler.RE.lastIndex = startIndex;
	var ret = ZmEmailObjectHandler.RE.exec(content);
	if (ret) {
		ret.context = ret;
		ret.objectMgr = objectMgr;  // obj mgr can get us back to containing view
	}
	return ret;
};

// See if a zimlet wants to handle email hover; if not, do the default thing
ZmEmailObjectHandler.prototype.hoverOver = function(object, context, x, y, span) {
	object = AjxStringUtil.parseMailtoLink(object).to;
	if (!appCtxt.notifyZimlets('onEmailHover', [ object, context, x, y, span ])) {
		ZmObjectHandler.prototype.hoverOver.apply(this, arguments);
	}
};

ZmEmailObjectHandler.prototype.getToolTipText = function(obj, context) {

	// Return a callback since we may need to make an async request to get data for the tooltip content.
	return new AjxCallback(this,
		function(callback) {
			appCtxt.getToolTipMgr().getToolTip(ZmToolTipMgr.PERSON, { address: AjxStringUtil.parseMailtoLink(obj).to }, callback);
		});
};

// Left-click starts a compose session
ZmEmailObjectHandler.prototype.clicked = function(spanElement, contentObjText, matchContext, ev) {

	var	ctlr = this._getController(matchContext),
		parts = AjxStringUtil.parseMailtoLink(contentObjText);

	var params = {
		action:         ZmOperation.NEW_MESSAGE,
		inNewWindow:    ctlr._app._inNewWindow(ev),
		toOverride:     parts.to,
		subjOverride:   parts.subject,
		extraBodyText:  parts.body
	};

	AjxDispatcher.run("Compose", params);
};

// Borrow the bubble action menu from the owning controller. Object framework doesn't explicitly call an
// action listener, so we do it here.
ZmEmailObjectHandler.prototype.getActionMenu = function(obj, span, context, ev) {

	var ctlr = this._getController(context);
	if (!ctlr) {
		return null;
	}

	ctlr._actionEv = ev;
	ctlr._actionEv.address = AjxStringUtil.parseMailtoLink(obj).to;
	ctlr._actionEv.handler = this;

	if (!this._actionMenu && ctlr._getBubbleActionMenu) {
		this._actionMenu = ctlr._getBubbleActionMenu();
	}

	ctlr._bubbleActionListener(ev, obj);

	return this._actionMenu;
};

ZmEmailObjectHandler.prototype._getController = function(context) {

	var om = context && context.objectMgr,
		view = om && om.getView();

	return view && view._controller;
};

// Tell the object framework we're here. The 'email' type arg is probably not needed.
ZmObjectManager.registerHandler("ZmEmailObjectHandler", 'email', 4);
