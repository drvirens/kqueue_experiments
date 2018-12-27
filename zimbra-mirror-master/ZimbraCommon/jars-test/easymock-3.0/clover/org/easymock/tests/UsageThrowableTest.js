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
clover.pageData = {"classes":[{"el":146,"id":7062,"methods":[{"el":37,"sc":5,"sl":34},{"el":51,"sc":5,"sl":39},{"el":56,"sc":5,"sl":53},{"el":63,"sc":5,"sl":58},{"el":68,"sc":5,"sl":65},{"el":75,"sc":5,"sl":70},{"el":91,"sc":5,"sl":77},{"el":96,"sc":5,"sl":93},{"el":103,"sc":5,"sl":98},{"el":125,"sc":5,"sl":105},{"el":144,"sc":5,"sl":127}],"name":"UsageThrowableTest","sl":30}]}

// JSON: {test_ID : {"methods": [ID1, ID2, ID3...], "name" : "testXXX() void"}, ...};
clover.testTargets = {"test_108":{"methods":[{"sl":65},{"sl":77}],"name":"throwError","pass":true,"statements":[{"sl":67},{"sl":78},{"sl":79},{"sl":81},{"sl":83},{"sl":84},{"sl":87},{"sl":90}]},"test_1097":{"methods":[{"sl":58},{"sl":77}],"name":"throwSubclassOfRuntimeException","pass":true,"statements":[{"sl":60},{"sl":78},{"sl":79},{"sl":81},{"sl":83},{"sl":84},{"sl":87},{"sl":90}]},"test_111":{"methods":[{"sl":93},{"sl":105}],"name":"throwCheckedException","pass":true,"statements":[{"sl":95},{"sl":106},{"sl":107},{"sl":108},{"sl":109},{"sl":114},{"sl":116},{"sl":117},{"sl":119},{"sl":120},{"sl":123}]},"test_14":{"methods":[{"sl":53},{"sl":77}],"name":"throwRuntimeException","pass":true,"statements":[{"sl":55},{"sl":78},{"sl":79},{"sl":81},{"sl":83},{"sl":84},{"sl":87},{"sl":90}]},"test_435":{"methods":[{"sl":127}],"name":"throwAfterReturnValue","pass":true,"statements":[{"sl":129},{"sl":130},{"sl":132},{"sl":134},{"sl":136},{"sl":137},{"sl":140},{"sl":143}]},"test_50":{"methods":[{"sl":98},{"sl":105}],"name":"throwSubclassOfCheckedException","pass":true,"statements":[{"sl":100},{"sl":106},{"sl":107},{"sl":108},{"sl":109},{"sl":114},{"sl":116},{"sl":117},{"sl":119},{"sl":120},{"sl":123}]},"test_555":{"methods":[{"sl":58},{"sl":77}],"name":"throwSubclassOfRuntimeException","pass":true,"statements":[{"sl":60},{"sl":78},{"sl":79},{"sl":81},{"sl":83},{"sl":84},{"sl":87},{"sl":90}]},"test_575":{"methods":[{"sl":98},{"sl":105}],"name":"throwSubclassOfCheckedException","pass":true,"statements":[{"sl":100},{"sl":106},{"sl":107},{"sl":108},{"sl":109},{"sl":114},{"sl":116},{"sl":117},{"sl":119},{"sl":120},{"sl":123}]},"test_604":{"methods":[{"sl":93},{"sl":105}],"name":"throwCheckedException","pass":true,"statements":[{"sl":95},{"sl":106},{"sl":107},{"sl":108},{"sl":109},{"sl":114},{"sl":116},{"sl":117},{"sl":119},{"sl":120},{"sl":123}]},"test_715":{"methods":[{"sl":39}],"name":"noUpperLimit","pass":true,"statements":[{"sl":41},{"sl":42},{"sl":43},{"sl":44},{"sl":45},{"sl":46},{"sl":47},{"sl":48},{"sl":49},{"sl":50}]},"test_766":{"methods":[{"sl":53},{"sl":77}],"name":"throwRuntimeException","pass":true,"statements":[{"sl":55},{"sl":78},{"sl":79},{"sl":81},{"sl":83},{"sl":84},{"sl":87},{"sl":90}]},"test_798":{"methods":[{"sl":70},{"sl":77}],"name":"throwSubclassOfError","pass":true,"statements":[{"sl":72},{"sl":78},{"sl":79},{"sl":81},{"sl":83},{"sl":84},{"sl":87},{"sl":90}]},"test_891":{"methods":[{"sl":39}],"name":"noUpperLimit","pass":true,"statements":[{"sl":41},{"sl":42},{"sl":43},{"sl":44},{"sl":45},{"sl":46},{"sl":47},{"sl":48},{"sl":49},{"sl":50}]},"test_921":{"methods":[{"sl":65},{"sl":77}],"name":"throwError","pass":true,"statements":[{"sl":67},{"sl":78},{"sl":79},{"sl":81},{"sl":83},{"sl":84},{"sl":87},{"sl":90}]},"test_930":{"methods":[{"sl":70},{"sl":77}],"name":"throwSubclassOfError","pass":true,"statements":[{"sl":72},{"sl":78},{"sl":79},{"sl":81},{"sl":83},{"sl":84},{"sl":87},{"sl":90}]},"test_948":{"methods":[{"sl":127}],"name":"throwAfterReturnValue","pass":true,"statements":[{"sl":129},{"sl":130},{"sl":132},{"sl":134},{"sl":136},{"sl":137},{"sl":140},{"sl":143}]}}

// JSON: { lines : [{tests : [testid1, testid2, testid3, ...]}, ...]};
clover.srcFileLines = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [715, 891], [], [715, 891], [715, 891], [715, 891], [715, 891], [715, 891], [715, 891], [715, 891], [715, 891], [715, 891], [715, 891], [], [], [766, 14], [], [766, 14], [], [], [555, 1097], [], [555, 1097], [], [], [], [], [108, 921], [], [108, 921], [], [], [798, 930], [], [798, 930], [], [], [], [], [108, 766, 798, 14, 555, 921, 1097, 930], [108, 766, 798, 14, 555, 921, 1097, 930], [108, 766, 798, 14, 555, 921, 1097, 930], [], [108, 766, 798, 14, 555, 921, 1097, 930], [], [108, 766, 798, 14, 555, 921, 1097, 930], [108, 766, 798, 14, 555, 921, 1097, 930], [], [], [108, 766, 798, 14, 555, 921, 1097, 930], [], [], [108, 766, 798, 14, 555, 921, 1097, 930], [], [], [604, 111], [], [604, 111], [], [], [50, 575], [], [50, 575], [], [], [], [], [50, 604, 111, 575], [50, 604, 111, 575], [50, 604, 111, 575], [50, 604, 111, 575], [50, 604, 111, 575], [], [], [], [], [50, 604, 111, 575], [], [50, 604, 111, 575], [50, 604, 111, 575], [], [50, 604, 111, 575], [50, 604, 111, 575], [], [], [50, 604, 111, 575], [], [], [], [435, 948], [], [435, 948], [435, 948], [], [435, 948], [], [435, 948], [], [435, 948], [435, 948], [], [], [435, 948], [], [], [435, 948], [], [], []]
