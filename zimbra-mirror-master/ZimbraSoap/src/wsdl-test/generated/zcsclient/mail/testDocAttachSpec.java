/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Server
 * Copyright (C) 2011, 2013 Zimbra Software, LLC.
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

package generated.zcsclient.mail;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for docAttachSpec complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="docAttachSpec">
 *   &lt;complexContent>
 *     &lt;extension base="{urn:zimbraMail}attachSpec">
 *       &lt;sequence>
 *       &lt;/sequence>
 *       &lt;attribute name="path" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="id" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="ver" type="{http://www.w3.org/2001/XMLSchema}int" />
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "docAttachSpec")
public class testDocAttachSpec
    extends testAttachSpec
{

    @XmlAttribute(name = "path")
    protected String path;
    @XmlAttribute(name = "id")
    protected String id;
    @XmlAttribute(name = "ver")
    protected Integer ver;

    /**
     * Gets the value of the path property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPath() {
        return path;
    }

    /**
     * Sets the value of the path property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPath(String value) {
        this.path = value;
    }

    /**
     * Gets the value of the id property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getId() {
        return id;
    }

    /**
     * Sets the value of the id property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setId(String value) {
        this.id = value;
    }

    /**
     * Gets the value of the ver property.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getVer() {
        return ver;
    }

    /**
     * Sets the value of the ver property.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setVer(Integer value) {
        this.ver = value;
    }

}