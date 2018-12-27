/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Server
 * Copyright (C) 2011, 2012, 2013 Zimbra Software, LLC.
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

package generated.zcsclient.ws.service;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.logging.Logger;
import javax.xml.namespace.QName;
import javax.xml.ws.Service;
import javax.xml.ws.WebEndpoint;
import javax.xml.ws.WebServiceClient;
import javax.xml.ws.WebServiceFeature;


/**
 * This class was generated by the JAX-WS RI.
 * JAX-WS RI 2.1.7-hudson-48-
 * Generated source version: 2.1
 * 
 */
@WebServiceClient(name = "zcsAdminService", targetNamespace = "http://www.zimbra.com/wsdl/ZimbraService.wsdl", wsdlLocation = "file:/p4/coco/main/ZimbraSoap/build/classes/com/zimbra/soap/ZimbraService.wsdl")
public class ZcsAdminService
    extends Service
{

    private final static URL ZCSADMINSERVICE_WSDL_LOCATION;
    private final static Logger logger = Logger.getLogger(generated.zcsclient.ws.service.ZcsAdminService.class.getName());

    static {
        URL url = null;
        try {
            URL baseUrl;
            baseUrl = generated.zcsclient.ws.service.ZcsAdminService.class.getResource(".");
            url = new URL(baseUrl, "file:/p4/coco/main/ZimbraSoap/build/classes/com/zimbra/soap/ZimbraService.wsdl");
        } catch (MalformedURLException e) {
            logger.warning("Failed to create URL for the wsdl Location: 'file:/p4/coco/main/ZimbraSoap/build/classes/com/zimbra/soap/ZimbraService.wsdl', retrying as a local file");
            logger.warning(e.getMessage());
        }
        ZCSADMINSERVICE_WSDL_LOCATION = url;
    }

    public ZcsAdminService(URL wsdlLocation, QName serviceName) {
        super(wsdlLocation, serviceName);
    }

    public ZcsAdminService() {
        super(ZCSADMINSERVICE_WSDL_LOCATION, new QName("http://www.zimbra.com/wsdl/ZimbraService.wsdl", "zcsAdminService"));
    }

    /**
     * 
     * @return
     *     returns ZcsAdminPortType
     */
    @WebEndpoint(name = "zcsAdminServicePort")
    public ZcsAdminPortType getZcsAdminServicePort() {
        return super.getPort(new QName("http://www.zimbra.com/wsdl/ZimbraService.wsdl", "zcsAdminServicePort"), ZcsAdminPortType.class);
    }

    /**
     * 
     * @param features
     *     A list of {@link javax.xml.ws.WebServiceFeature} to configure on the proxy.  Supported features not in the <code>features</code> parameter will have their default values.
     * @return
     *     returns ZcsAdminPortType
     */
    @WebEndpoint(name = "zcsAdminServicePort")
    public ZcsAdminPortType getZcsAdminServicePort(WebServiceFeature... features) {
        return super.getPort(new QName("http://www.zimbra.com/wsdl/ZimbraService.wsdl", "zcsAdminServicePort"), ZcsAdminPortType.class, features);
    }

}
