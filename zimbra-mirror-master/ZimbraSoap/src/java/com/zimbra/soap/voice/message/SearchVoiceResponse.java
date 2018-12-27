/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Server
 * Copyright (C) 2012, 2013 Zimbra Software, LLC.
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

package com.zimbra.soap.voice.message;

import com.google.common.base.Objects;
import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;

import java.util.Collections;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElements;
import javax.xml.bind.annotation.XmlRootElement;

import com.zimbra.common.soap.MailConstants;
import com.zimbra.common.soap.VoiceConstants;
import com.zimbra.soap.type.ZmBoolean;
import com.zimbra.soap.voice.type.CallLogItem;
import com.zimbra.soap.voice.type.VoiceCallItem;
import com.zimbra.soap.voice.type.VoiceFolderSummary;
import com.zimbra.soap.voice.type.VoiceMailItem;

@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name=VoiceConstants.E_SEARCH_VOICE_RESPONSE)
public class SearchVoiceResponse {

    /**
     * @zm-api-field-tag sort-by
     * @zm-api-field-description Actual sortBy used by the server
     */
    @XmlAttribute(name=MailConstants.A_SORTBY /* sortBy */, required=true)
    private String sortBy;

    /**
     * @zm-api-field-tag offset
     * @zm-api-field-description Integer specifying the 0-based offset into the results list returned as the first
     * result for this search operation.  It is always the same as the offset attribute in the request.
     */
    @XmlAttribute(name=MailConstants.A_QUERY_OFFSET /* offset */, required=true)
    private int offset;

    /**
     * @zm-api-field-tag more-flag
     * @zm-api-field-description Set if there are more search results remaining
     */
    @XmlAttribute(name=MailConstants.A_QUERY_MORE /* more */, required=true)
    private ZmBoolean more;

    /**
     * @zm-api-field-description Voice folder summary
     * <br />
     * For certain search combinations, server is able to compute a folder inventory.  If folder inventory is
     * available on the server, a <b>&lt;vfi></b> tag is included for that folder.
     * <br />
     * Given the lack of a notification mechanism in the voice API infrastructure, clients can use this information to
     * refresh the message count in the accordion if it is available.
     */
    @XmlElement(name=VoiceConstants.E_VOICE_FOLDER_INVENTORY /* vfi */, required=false)
    private List<VoiceFolderSummary> voiceFolderSummaries = Lists.newArrayList();

    /**
     * @zm-api-field-description Matching items
     */
    @XmlElements({
        @XmlElement(name=VoiceConstants.E_VOICEMSG /* vm */, type=VoiceMailItem.class),
        @XmlElement(name=VoiceConstants.E_CALLLOG /* cl */, type=CallLogItem.class)
    })
    private List<VoiceCallItem> elements = Lists.newArrayList();

    public SearchVoiceResponse() {
    }

    public void setSortBy(String sortBy) { this.sortBy = sortBy; }
    public void setOffset(int offset) { this.offset = offset; }
    public void setMore(Boolean more) { this.more = ZmBoolean.fromBool(more); }
    public void setVoiceFolderSummaries(Iterable <VoiceFolderSummary> voiceFolderSummaries) {
        this.voiceFolderSummaries.clear();
        if (voiceFolderSummaries != null) {
            Iterables.addAll(this.voiceFolderSummaries, voiceFolderSummaries);
        }
    }

    public void addVoiceFolderSummary(VoiceFolderSummary voiceFolderSummary) {
        this.voiceFolderSummaries.add(voiceFolderSummary);
    }

    public void setElements(Iterable <VoiceCallItem> elements) {
        this.elements.clear();
        if (elements != null) {
            Iterables.addAll(this.elements, elements);
        }
    }

    public void addElement(VoiceCallItem element) {
        this.elements.add(element);
    }

    public String getSortBy() { return sortBy; }
    public int getOffset() { return offset; }
    public Boolean getMore() { return ZmBoolean.toBool(more); }
    public List<VoiceFolderSummary> getVoiceFolderSummaries() {
        return voiceFolderSummaries;
    }
    public List<VoiceCallItem> getElements() {
        return elements;
    }

    public Objects.ToStringHelper addToStringInfo(Objects.ToStringHelper helper) {
        return helper
            .add("sortBy", sortBy)
            .add("offset", offset)
            .add("more", more)
            .add("voiceFolderSummaries", voiceFolderSummaries)
            .add("elements", elements);
    }

    @Override
    public String toString() {
        return addToStringInfo(Objects.toStringHelper(this)).toString();
    }
}