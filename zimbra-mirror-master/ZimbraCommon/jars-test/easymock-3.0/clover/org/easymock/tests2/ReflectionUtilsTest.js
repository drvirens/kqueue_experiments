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
var clover = new Object();

// JSON: {classes : [{name, id, sl, el,  methods : [{sl, el}, ...]}, ...]}
clover.pageData = {"classes":[{"el":151,"id":4328,"methods":[{"el":72,"sc":5,"sl":68},{"el":78,"sc":5,"sl":74},{"el":87,"sc":5,"sl":80},{"el":93,"sc":5,"sl":89},{"el":99,"sc":5,"sl":95},{"el":105,"sc":5,"sl":101},{"el":111,"sc":5,"sl":107},{"el":117,"sc":5,"sl":113},{"el":123,"sc":5,"sl":119},{"el":128,"sc":5,"sl":125},{"el":133,"sc":5,"sl":130},{"el":138,"sc":5,"sl":135},{"el":143,"sc":5,"sl":140},{"el":150,"sc":5,"sl":145}],"name":"ReflectionUtilsTest","sl":30},{"el":35,"id":4328,"methods":[{"el":34,"sc":9,"sl":33}],"name":"ReflectionUtilsTest.B","sl":32},{"el":66,"id":4329,"methods":[{"el":41,"sc":9,"sl":39},{"el":44,"sc":9,"sl":43},{"el":47,"sc":9,"sl":46},{"el":50,"sc":9,"sl":49},{"el":53,"sc":9,"sl":52},{"el":56,"sc":9,"sl":55},{"el":59,"sc":9,"sl":58},{"el":62,"sc":9,"sl":61},{"el":65,"sc":9,"sl":64}],"name":"ReflectionUtilsTest.A","sl":37}]}

// JSON: {test_ID : {"methods": [ID1, ID2, ID3...], "name" : "testXXX() void"}, ...};
clover.testTargets = {"test_1051":{"methods":[{"sl":135}],"name":"testGetConstructor_notFound","pass":true,"statements":[{"sl":137}]},"test_1073":{"methods":[{"sl":135}],"name":"testGetConstructor_notFound","pass":true,"statements":[{"sl":137}]},"test_121":{"methods":[{"sl":80}],"name":"testFindMethod_Ambiguous","pass":true,"statements":[{"sl":82},{"sl":83},{"sl":85}]},"test_124":{"methods":[{"sl":130}],"name":"testGetConstructor_twoMatching","pass":true,"statements":[{"sl":132}]},"test_128":{"methods":[{"sl":74}],"name":"testFindMethod_NotFound","pass":true,"statements":[{"sl":76},{"sl":77}]},"test_134":{"methods":[{"sl":125}],"name":"testGetConstructor_private","pass":true,"statements":[{"sl":127}]},"test_145":{"methods":[{"sl":113}],"name":"testGetConstructor_protected","pass":true,"statements":[{"sl":115},{"sl":116}]},"test_152":{"methods":[{"sl":80}],"name":"testFindMethod_Ambiguous","pass":true,"statements":[{"sl":82},{"sl":83},{"sl":85}]},"test_157":{"methods":[{"sl":74}],"name":"testFindMethod_NotFound","pass":true,"statements":[{"sl":76},{"sl":77}]},"test_18":{"methods":[{"sl":68}],"name":"testFindMethod","pass":true,"statements":[{"sl":70},{"sl":71}]},"test_217":{"methods":[{"sl":145}],"name":"testGetConstructor_AllPrimitives","pass":true,"statements":[{"sl":147},{"sl":149}]},"test_246":{"methods":[{"sl":125}],"name":"testGetConstructor_private","pass":true,"statements":[{"sl":127}]},"test_298":{"methods":[{"sl":140}],"name":"testGetConstructor_WrongParams","pass":true,"statements":[{"sl":142}]},"test_502":{"methods":[{"sl":95}],"name":"testFindMethod_Superclass","pass":true,"statements":[{"sl":97},{"sl":98}]},"test_542":{"methods":[{"sl":68}],"name":"testFindMethod","pass":true,"statements":[{"sl":70},{"sl":71}]},"test_702":{"methods":[{"sl":113}],"name":"testGetConstructor_protected","pass":true,"statements":[{"sl":115},{"sl":116}]},"test_734":{"methods":[{"sl":130}],"name":"testGetConstructor_twoMatching","pass":true,"statements":[{"sl":132}]},"test_779":{"methods":[{"sl":140}],"name":"testGetConstructor_WrongParams","pass":true,"statements":[{"sl":142}]},"test_785":{"methods":[{"sl":119}],"name":"testGetConstructor_default","pass":true,"statements":[{"sl":121},{"sl":122}]},"test_797":{"methods":[{"sl":119}],"name":"testGetConstructor_default","pass":true,"statements":[{"sl":121},{"sl":122}]},"test_850":{"methods":[{"sl":95}],"name":"testFindMethod_Superclass","pass":true,"statements":[{"sl":97},{"sl":98}]},"test_869":{"methods":[{"sl":101}],"name":"testFindMethodClassOfQStringClassOfQArray","pass":true,"statements":[{"sl":103},{"sl":104}]},"test_883":{"methods":[{"sl":145}],"name":"testGetConstructor_AllPrimitives","pass":true,"statements":[{"sl":147},{"sl":149}]},"test_893":{"methods":[{"sl":101}],"name":"testFindMethodClassOfQStringClassOfQArray","pass":true,"statements":[{"sl":103},{"sl":104}]},"test_919":{"methods":[{"sl":107}],"name":"testGetConstructor_public","pass":true,"statements":[{"sl":109},{"sl":110}]},"test_936":{"methods":[{"sl":89}],"name":"testFindMethod_WrongParams","pass":true,"statements":[{"sl":91},{"sl":92}]},"test_946":{"methods":[{"sl":89}],"name":"testFindMethod_WrongParams","pass":true,"statements":[{"sl":91},{"sl":92}]},"test_987":{"methods":[{"sl":107}],"name":"testGetConstructor_public","pass":true,"statements":[{"sl":109},{"sl":110}]}}

// JSON: { lines : [{tests : [testid1, testid2, testid3, ...]}, ...]};
clover.srcFileLines = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [18, 542], [], [18, 542], [18, 542], [], [], [128, 157], [], [128, 157], [128, 157], [], [], [121, 152], [], [121, 152], [121, 152], [], [121, 152], [], [], [], [946, 936], [], [946, 936], [946, 936], [], [], [850, 502], [], [850, 502], [850, 502], [], [], [893, 869], [], [893, 869], [893, 869], [], [], [987, 919], [], [987, 919], [987, 919], [], [], [145, 702], [], [145, 702], [145, 702], [], [], [785, 797], [], [785, 797], [785, 797], [], [], [134, 246], [], [134, 246], [], [], [124, 734], [], [124, 734], [], [], [1073, 1051], [], [1073, 1051], [], [], [779, 298], [], [779, 298], [], [], [217, 883], [], [217, 883], [], [217, 883], [], []]