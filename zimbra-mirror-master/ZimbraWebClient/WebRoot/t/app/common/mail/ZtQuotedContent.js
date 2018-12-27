/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Web Client
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

/**
 * This class distinguishes between original and quoted content of a mail message.
 *
 * @author Conrad Damon <cdamon@zimbra.com>
 * @adapts AjxStringUtil
 */
Ext.define('ZCS.common.mail.ZtQuotedContent', {

	singleton: true,

	alternateClassName: 'ZCS.quoted',

	/**
	 * Analyze the text and return what appears to be original (as opposed to quoted) content. We
	 * look for separators commonly used by mail clients, as well as prefixes that indicate that
	 * a line is being quoted.
	 *
	 * @param {string}	text		message body content
	 *
	 * @return	{string}	original content if quoted content was found, otherwise NULL
	 */
	getOriginalContent: function(text, isHtml) {

		if (!text) {
			return '';
		}

		if (isHtml) {
			return this.getOriginalHtmlContent(text);
		}

		var results = [],
			lines = text.split(ZCS.constant.REGEX_SPLIT),
			curType,
			curBlock = [],
			count = {},
			isMerged, unknownBlock, line, testLine, type,
			nextLine, isMerged, i, j, nextType,
			originalText, block, result;

		for (i = 0; i < lines.length; i++) {
			line = lines[i];
			testLine = Ext.String.trim(line);

			// blank lines are just added to the current block
			if (!ZCS.constant.REGEX_NON_WHITESPACE.test(testLine)) {
				curBlock.push(line);
				continue;
			}

			// Bugzilla is very good at fooling us, and does not have quoted content, so bail
			if ((testLine.indexOf('| DO NOT REPLY') === 0) && (lines[i + 2].indexOf('bugzilla') !== -1)) {
				return text;
			}

			type = this.getLineType(testLine);

			// WROTE can stretch over two lines; if so, join them into one line
			nextLine = lines[i + 1];
			isMerged = false;
			if (nextLine && (type === this.UNKNOWN) && this.REGEX_INTRO.test(testLine) && nextLine.match(/\w+:$/)) {
				testLine = [testLine, nextLine].join(' ');
				type = this.getLineType(testLine);
				isMerged = true;
			}

			// LINE sometimes used as delimiter; if HEADER follows, lump it in with them
			if (type === this.LINE) {
				j = i + 1;
				nextLine = lines[j];
				while (!ZCS.constant.REGEX_NON_WHITESPACE.test(nextLine) && j < lines.length) {
					nextLine = lines[++j];
				}
				nextType = nextLine && this.getLineType(nextLine);
				if (nextType === this.HEADER) {
					type = this.HEADER;
				}
				else {
					type = this.UNKNOWN;
				}
			}

			// see if we're switching to a new type; if so, package up what we have so far
			if (curType) {
				if (curType !== type) {
					results.push({
						type:curType,
						block:curBlock
					});
					unknownBlock = (curType === this.UNKNOWN) ? curBlock : unknownBlock;
					count[curType] = count[curType] ? count[curType] + 1 : 1;
					curBlock = [];
					curType = type;
				}
			}
			else {
				curType = type;
			}

			if (isMerged && (type === this.WROTE_WEAK || type === this.WROTE_STRONG)) {
				curBlock.push(line);
				curBlock.push(nextLine);
				i++;
				isMerged = false;
			}
			else {
				curBlock.push(line);
			}
		}

		// Handle remaining content
		if (curBlock.length) {
			results.push({
				type: curType,
				block: curBlock
			});
			unknownBlock = (curType === this.UNKNOWN) ? curBlock : unknownBlock;
			count[curType] = count[curType] ? count[curType] + 1 : 1;
		}

		// Now it's time to analyze all these blocks that we've classified

		// Check for UNKNOWN followed by HEADER
		var first = results[0], second = results[1];
		if (first && first.type === this.UNKNOWN && second && second.type === this.HEADER) {
			originalText = this.getTextFromBlock(first.block);
			if (originalText) {
				return originalText;
			}
		}

		// check for special case of WROTE preceded by UNKNOWN, followed by mix of UNKNOWN and QUOTED (inline reply)
		var originalText = this.checkInlineWrote(count, results, false);
		if (originalText) {
			return originalText;
		}

		// If we found quoted content and there's exactly one UNKNOWN block, return it.
		if (count[this.UNKNOWN] === 1 && count[this.QUOTED] > 0) {
			originalText = this.getTextFromBlock(unknownBlock);
			if (originalText) {
				return originalText;
			}
		}

		// If we have a STRONG separator (eg "--- Original Message ---"), consider it authoritative and return the text that precedes it
		if (count[this.SEP_STRONG] > 0) {
			block = [];
			for (i = 0; i < results.length; i++) {
				result = results[i];
				if (result.type === this.SEP_STRONG) {
					break;
				}
				block = block.concat(result.block);
			}
			originalText = this.getTextFromBlock(block);
			if (originalText) {
				return originalText;
			}
		}

		return text;
	},

	/**
	 * 	Matches a line of text against some regexes to see if has structural meaning within a mail msg.
	 * 	@private
	 */
    getLineType: function(testLine) {

		var type = this.UNKNOWN,
		    m, verb, points;

		// see if the line matches any known delimiters or quote patterns
		Ext.each(this.REGEXES, function(msgTest) {
			if (msgTest.regex.test(testLine.toLowerCase())) {
				// line that starts and ends with | is considered ASCII art (eg a table) rather than quoted
				if (!(msgTest.type == this.QUOTED && /^\s*\|.*\|\s*$/.test(testLine))) {
					type = msgTest.type;
					return false;	// first match wins
				}
			}
		}, this);


		if (type === this.UNKNOWN) {
			// "so-and-so wrote:" takes a lot of different forms; look for various common parts and
			// assign points to determine confidence
			m = testLine.match(/(\w+):$/);
			verb = m && m[1] && m[1].toLowerCase();
			if (verb) {
				points = 0;
				// look for "wrote:" (and discount "changed:", which is used by Bugzilla)
				points = points + (verb === ZtMsg.wrote) ? 5 : (verb === ZtMsg.changed) ? 0 : 3;
				if (this.REGEX_EMAIL.test(testLine)) {
					points += 4;
				}
				if (this.REGEX_DATE.test(testLine)) {
					points += 3;
				}
				var regEx = new RegExp('^(--|' + ZtMsg.on + ')', 'i');
				if (this.REGEX_INTRO.test(testLine)) {
					points += 1;
				}
				if (points >= 7) {
					type = this.WROTE_STRONG;
				}
				else if (points >= 5) {
					type = this.WROTE_WEAK;
				}
			}
		}

		return type;
	},

	getTextFromBlock: function(block) {

		if (!(block && block.length)) {
			return null;
		}
		var originalText = block.join('\n') + '\n';
		originalText = originalText.replace(/\s+$/, '\n');
		return (ZCS.constant.REGEX_NON_WHITESPACE.test(originalText)) ? originalText : null;
	},

	/**
	 * For HTML, we strip off the html, head, and body tags and stick the rest in a temporary DOM node so that
	 * we can go element by element. If we find one that is recognized as a separator, we remove all subsequent elements.
	 *
	 * @param {String}	text		message body content
	 *
	 * @return	{String}	original content if quoted content was found, otherwise null
	 * @private
	 */
	getOriginalHtmlContent: function(text) {

		// strip <script> tags (which should not be there)
		while (this.REGEX_SCRIPT.test(text)) {
			text = text.replace(this.REGEX_SCRIPT, '');
		}

		var htmlNode = ZCS.htmlutil.getHtmlDom(text),
			done = false, nodeList = [];

		ZCS.htmlutil.flatten(htmlNode, nodeList, ZCS.quoted.IGNORE_NODE);

		var ln = nodeList.length, i, results = [], count = {}, el, prevEl, nodeName, type, prevType, sepNode;
		for (i = 0; i < ln; i++) {
			el = nodeList[i];
			if (el.nodeType === Node.ELEMENT_NODE) {
				el.normalize();
			}
			nodeName = el.nodeName.toLowerCase();
			type = this.checkNode(nodeList[i]);

			// Check for a multi-element "wrote:" attribution (usually a combo of #text and A nodes), for example:
			//
			//     On Feb 28, 2014, at 3:42 PM, Joe Smith &lt;<a href="mailto:jsmith@zimbra.com" target="_blank">jsmith@zimbra.com</a>&gt; wrote:

			// If the current node is a #text with a date, find #text nodes within the next ten nodes, concatenate them, and check the result.
			if (type === this.UNKNOWN && el.nodeName === '#text' && ZCS.quoted.REGEX_DATE.test(el.nodeValue)) {
				var str = el.nodeValue,	j, el1;
				for (j = 1; j < 10; j++) {
					el1 = nodeList[i + j];
					if (el1 && el1.nodeName === '#text') {
						str += el1.nodeValue;
						if (/:$/.test(str)) {
							type = this.getLineType(Ext.String.trim(str));
							if (type === this.WROTE_STRONG) {
								i = i + j;
								break;
							}
						}
					}
				}
			}

			if (type !== null) {
				results.push({ type: type, node: el, nodeName: nodeName });
				count[type] = count[type] ? count[type] + 1 : 1;
				// definite separator
				if (type === this.SEP_STRONG || type === this.WROTE_STRONG) {
					sepNode = el;
					done = true;
					break;
				}
				// some sort of line followed by a header
				if (type === this.HEADER && prevType === this.LINE) {
					sepNode = prevEl;
					done = true;
					break;
				}
				prevEl = el;
				prevType = type;
			}
		}

		if (sepNode) {
			ZCS.htmlutil.prune(sepNode, true);
		}

		// convert back to text, restoring html, head, and body nodes
		var content = done ? '<html>' + htmlNode.innerHTML + '</html>' : text;
		htmlNode.innerHTML = '';
		return content;
	},

	/**
	 * Tries to determine the type of the given node.
	 *
	 * @param {Element}     el      a DOM node
	 * @return {String}     type, or null
	 * @private
	 */
	checkNode: function(el) {

		if (!el) {
			return null;
		}

		var nodeName = el.nodeName.toLowerCase(),
			type = null;

		// Text node: test against our regexes
		if (nodeName === '#text') {
			var content = Ext.String.trim(el.nodeValue);
			if (ZCS.constant.REGEX_NON_WHITESPACE.test(content)) {
				type = this.getLineType(content);
			}
		}
		// HR: look for a couple different forms that are used to delimit quoted content
		else if (nodeName === 'hr') {
			// see if the HR is ours, or one commonly used by other mail clients such as Outlook
			if (el.id === ZCS.quoted.HTML_SEP_ID || (el.size === '2' && el.width === '100%' && el.align === 'center')) {
				type = this.SEP_STRONG;
			}
			else {
				type = this.LINE;
			}
		}
		// PRE: treat as one big line of text (should maybe go line by line)
		else if (nodeName === 'pre') {
			type = this.checkNodeContent(el);
		}
		// DIV: check for Outlook class used as delimiter, or a top border used as a separator, and finally just
		// check the text content
		else if (nodeName === 'div') {
			if (el.className === 'OutlookMessageHeader' || el.className === 'gmail_quote') {
				type = this.SEP_STRONG;
			}
			else if (el.style.borderTop) {
				var styleObj = window.getComputedStyle(el);
				if (styleObj && styleObj.borderTopWidth && parseInt(styleObj.borderTopWidth) === 1 && styleObj.borderTopColor) {
					type = this.SEP_STRONG;
				}
			}
			type = type || this.checkNodeContent(el);
		}
		// SPAN: check for Outlook ID used as delimiter, then check text content
		else if (nodeName === 'span') {
			if (el.id === 'OLK_SRC_BODY_SECTION') {
				type = this.SEP_STRONG;
			}
			type = type || this.checkNodeContent(el);
		}
		// IMG: treat as original content
		else if (nodeName === 'img') {
			type = this.UNKNOWN;
		}
		// BLOCKQUOTE: treat as quoted section
		else if (nodeName === 'blockquote') {
			type = this.QUOTED;
		}

		return type;
	},

	/**
	 * Checks innerText to see if it's a separator.
	 * @param {Element} node
	 * @return {String}
	 * @private
	 */
	checkNodeContent: function(el) {

		var content = el.innerText || '';
		if (!ZCS.constant.REGEX_NON_WHITESPACE.test(content) || content.length > 200) {
			return null;
		}
		// We're really only interested in SEP_STRONG and WROTE_STRONG
		var type = this.getLineType(content);
		return (type === this.SEP_STRONG || type === this.WROTE_STRONG) ? type : null;
	},

	/**
	 * A "... wrote:" separator is not quite as authoritative, since the user might be replying inline. If we have
	 * a single UNKNOWN block before the WROTE separator, return it unless there is a mix of QUOTED and UNKNOWN
	 * following the separator, except if there's only a single unknown block after the separator and it comes last.
	 *
	 * @private
	 */
	checkInlineWrote: function(count, results, isHtml, ctxt) {

		if (count[ZCS.quoted.WROTE_STRONG] > 0) {
			var unknownBlock, foundSep = false, afterSep = {};
			for (var i = 0; i < results.length; i++) {
				var result = results[i], type = result.type;
				if (type === ZCS.quoted.WROTE_STRONG) {
					foundSep = true;
				}
				else if (type === ZCS.quoted.UNKNOWN && !foundSep) {
					if (unknownBlock) {
						return null;
					}
					else {
						unknownBlock = isHtml ? true : result.block;
					}
				}
				else if (foundSep) {
					afterSep[type] = true;
				}
			}

			var mixed = (afterSep[ZCS.quoted.UNKNOWN] && afterSep[ZCS.quoted.QUOTED]);
			var endsWithUnknown = (count[ZCS.quoted.UNKNOWN] === 2 && results[results.length - 1].type === ZCS.quoted.UNKNOWN);
			if (unknownBlock && (!isHtml || ctxt.sepNode) && (!mixed || endsWithUnknown)) {
				if (isHtml) {
					// In HTML mode we do DOM surgery rather than returning the original content
					var el = ctxt.sepNode.parentNode;
					// clip all subsequent nodes
					while (el && el.lastChild && el.lastChild != ctxt.sepNode) {
						el.removeChild(el.lastChild);
					}
					// clip the delimiter node
					if (el && el.lastChild == ctxt.sepNode) {
						el.removeChild(el.lastChild);
					}
				}
				else {
					var originalText = this.getTextFromBlock(unknownBlock);
					if (originalText) {
						return originalText;
					}
				}
			}
		}
	}
});

// Possible types for a block of content
ZCS.quoted.UNKNOWN         = 'UNKNOWN';
ZCS.quoted.QUOTED          = 'QUOTED';
ZCS.quoted.SEP_STRONG      = 'SEP_STRONG';
ZCS.quoted.SEP_WEAK        = 'SEP_WEAK';
ZCS.quoted.WROTE_STRONG    = 'WROTE_STRONG';
ZCS.quoted.WROTE_WEAK      = 'WROTE_WEAK';
ZCS.quoted.HEADER          = 'HEADER';
ZCS.quoted.LINE            = 'LINE';
ZCS.quoted.SIG_SEP         = 'SIG_SEP';

ZCS.quoted.HEADERS = [];
(function() {
	var headerKeys = [ 'fromHdr', 'toHdr', 'ccHdr', 'dateHdr', 'subjectHdr', 'sentHdr' ],
		ln = headerKeys.length, i;
	for (i = 0; i < ln; i++) {
		ZCS.quoted.HEADERS.push(ZtMsg[headerKeys[i]] + ':');
	}
})();

// Regexes for figuring out block type
ZCS.quoted.REGEXES = [
	{
		// the two most popular quote characters, > and |
		type:	ZCS.quoted.QUOTED,
		regex:	/^\s*(>|\|)/
	},
	{
		// marker for Original or Forwarded message, used by ZCS and others
		type:	ZCS.quoted.SEP_STRONG,
		regex:	new RegExp('^\\s*--+\\s*(' + ZtMsg.originalMessage + '|' + ZtMsg.forwardedMessage + '|' + ZtMsg.originalAppointment + ')\\s*--+\\s*$', 'i')
	},
	{
		// marker for Original or Forwarded message, used by ZCS and others
		type:	ZCS.quoted.SEP_STRONG,
		regex:	new RegExp('^' + ZtMsg.forwardedMessage1 + '$', 'i')
	},
	{
		// one of the commonly quoted email headers
		type:	ZCS.quoted.HEADER,
		regex:	new RegExp('^\\s*(' + ZCS.quoted.HEADERS.join('|') + ')', 'i')
	},
	{
		// some clients use a series of underscores as a text-mode separator (text version of <hr>)
		type:	ZCS.quoted.LINE,
		regex:	/^\s*_{5,}\s*$/
	}/*,
	 {
	 // in case a client doesn't use the exact words above
	 type:	ZCS.quoted.SEP_WEAK,
	 regex:	/^\s*--+\s*[\w\s]+\s*--+$/
	 },
	 {
	 // internet style signature separator
	 type:	ZCS.quoted.SIG_SEP,
	 regex:	/^- ?-\s*$/
	 }*/
];

ZCS.quoted.REGEX_EMAIL    = /[^@\s]+@[A-Za-z0-9\-]{2,}(\.[A-Za-z0-9\-]{2,})+/;
ZCS.quoted.REGEX_DATE     = /(\/|, )20\d\d/;                                    // matches "03/07/2014" or "March 3, 2014" by looking for year 20xx
ZCS.quoted.REGEX_INTRO    = new RegExp('^(-{2,}|' + ZtMsg.on + ')', 'i');

ZCS.quoted.REGEX_SCRIPT = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

ZCS.quoted.HTML_SEP_ID = 'zwchr';   // inserted by ZCS HTML composer

// nodes to ignore; they won't have anything we're interested in
ZCS.quoted.IGNORE_NODE = ZCS.util.arrayAsLookupHash([
	'#comment',
	'script',
	'select',
	'style'
]);

// Give up after processing this many nodes
ZCS.quoted.MAX_NODES       = 200;
