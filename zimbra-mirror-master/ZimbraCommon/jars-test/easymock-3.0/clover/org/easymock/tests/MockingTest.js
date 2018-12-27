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
clover.pageData = {"classes":[{"el":149,"id":5536,"methods":[{"el":62,"sc":5,"sl":51},{"el":67,"sc":5,"sl":64},{"el":72,"sc":5,"sl":69},{"el":77,"sc":5,"sl":74},{"el":82,"sc":5,"sl":79},{"el":87,"sc":5,"sl":84},{"el":92,"sc":5,"sl":89},{"el":96,"sc":5,"sl":94},{"el":103,"sc":5,"sl":98},{"el":110,"sc":5,"sl":105},{"el":117,"sc":5,"sl":112},{"el":127,"sc":5,"sl":119},{"el":131,"sc":5,"sl":129},{"el":135,"sc":5,"sl":133},{"el":140,"sc":5,"sl":137},{"el":148,"sc":5,"sl":142}],"name":"MockingTest","sl":36},{"el":46,"id":5536,"methods":[{"el":41,"sc":9,"sl":39},{"el":45,"sc":9,"sl":43}],"name":"MockingTest.ClassToMock","sl":38}]}

// JSON: {test_ID : {"methods": [ID1, ID2, ID3...], "name" : "testXXX() void"}, ...};
clover.testTargets = {"test_1026":{"methods":[{"sl":79},{"sl":129},{"sl":133},{"sl":137}],"name":"testClassMocking","pass":true,"statements":[{"sl":81},{"sl":130},{"sl":134},{"sl":138},{"sl":139}]},"test_1079":{"methods":[{"sl":84},{"sl":129},{"sl":133},{"sl":137}],"name":"testStrictClassMocking","pass":true,"statements":[{"sl":86},{"sl":130},{"sl":134},{"sl":138},{"sl":139}]},"test_194":{"methods":[{"sl":51}],"name":"testTwoMocks","pass":true,"statements":[{"sl":53},{"sl":54},{"sl":57},{"sl":60},{"sl":61}]},"test_215":{"methods":[{"sl":39},{"sl":105},{"sl":119},{"sl":129},{"sl":133},{"sl":137},{"sl":142}],"name":"testStrictPartialClassMocking","pass":true,"statements":[{"sl":40},{"sl":108},{"sl":109},{"sl":120},{"sl":121},{"sl":122},{"sl":123},{"sl":124},{"sl":125},{"sl":126},{"sl":130},{"sl":134},{"sl":138},{"sl":139},{"sl":143},{"sl":144}]},"test_237":{"methods":[{"sl":69},{"sl":94},{"sl":133},{"sl":137}],"name":"testNiceInterfaceMocking","pass":true,"statements":[{"sl":71},{"sl":95},{"sl":134},{"sl":138},{"sl":139}]},"test_434":{"methods":[{"sl":39},{"sl":98},{"sl":119},{"sl":129},{"sl":133},{"sl":137},{"sl":142}],"name":"testPartialClassMocking","pass":true,"statements":[{"sl":40},{"sl":101},{"sl":102},{"sl":120},{"sl":121},{"sl":122},{"sl":123},{"sl":124},{"sl":125},{"sl":126},{"sl":130},{"sl":134},{"sl":138},{"sl":139},{"sl":143},{"sl":144}]},"test_439":{"methods":[{"sl":89},{"sl":129},{"sl":133},{"sl":137}],"name":"testNiceClassMocking","pass":true,"statements":[{"sl":91},{"sl":130},{"sl":134},{"sl":138},{"sl":139}]},"test_46":{"methods":[{"sl":64},{"sl":94},{"sl":133},{"sl":137}],"name":"testInterfaceMocking","pass":true,"statements":[{"sl":66},{"sl":95},{"sl":134},{"sl":138},{"sl":139}]},"test_567":{"methods":[{"sl":39},{"sl":112},{"sl":119},{"sl":129},{"sl":133},{"sl":137},{"sl":142}],"name":"testNicePartialClassMocking","pass":true,"statements":[{"sl":40},{"sl":115},{"sl":116},{"sl":120},{"sl":121},{"sl":122},{"sl":123},{"sl":124},{"sl":125},{"sl":126},{"sl":130},{"sl":134},{"sl":138},{"sl":139},{"sl":143},{"sl":144}]},"test_643":{"methods":[{"sl":39},{"sl":112},{"sl":119},{"sl":129},{"sl":133},{"sl":137},{"sl":142}],"name":"testNicePartialClassMocking","pass":true,"statements":[{"sl":40},{"sl":115},{"sl":116},{"sl":120},{"sl":121},{"sl":122},{"sl":123},{"sl":124},{"sl":125},{"sl":126},{"sl":130},{"sl":134},{"sl":138},{"sl":139},{"sl":143},{"sl":144}]},"test_700":{"methods":[{"sl":51}],"name":"testTwoMocks","pass":true,"statements":[{"sl":53},{"sl":54},{"sl":57},{"sl":60},{"sl":61}]},"test_712":{"methods":[{"sl":79},{"sl":129},{"sl":133},{"sl":137}],"name":"testClassMocking","pass":true,"statements":[{"sl":81},{"sl":130},{"sl":134},{"sl":138},{"sl":139}]},"test_722":{"methods":[{"sl":74},{"sl":94},{"sl":133},{"sl":137}],"name":"testStrictInterfaceMocking","pass":true,"statements":[{"sl":76},{"sl":95},{"sl":134},{"sl":138},{"sl":139}]},"test_754":{"methods":[{"sl":84},{"sl":129},{"sl":133},{"sl":137}],"name":"testStrictClassMocking","pass":true,"statements":[{"sl":86},{"sl":130},{"sl":134},{"sl":138},{"sl":139}]},"test_801":{"methods":[{"sl":74},{"sl":94},{"sl":133},{"sl":137}],"name":"testStrictInterfaceMocking","pass":true,"statements":[{"sl":76},{"sl":95},{"sl":134},{"sl":138},{"sl":139}]},"test_814":{"methods":[{"sl":64},{"sl":94},{"sl":133},{"sl":137}],"name":"testInterfaceMocking","pass":true,"statements":[{"sl":66},{"sl":95},{"sl":134},{"sl":138},{"sl":139}]},"test_826":{"methods":[{"sl":69},{"sl":94},{"sl":133},{"sl":137}],"name":"testNiceInterfaceMocking","pass":true,"statements":[{"sl":71},{"sl":95},{"sl":134},{"sl":138},{"sl":139}]},"test_848":{"methods":[{"sl":89},{"sl":129},{"sl":133},{"sl":137}],"name":"testNiceClassMocking","pass":true,"statements":[{"sl":91},{"sl":130},{"sl":134},{"sl":138},{"sl":139}]},"test_884":{"methods":[{"sl":39},{"sl":98},{"sl":119},{"sl":129},{"sl":133},{"sl":137},{"sl":142}],"name":"testPartialClassMocking","pass":true,"statements":[{"sl":40},{"sl":101},{"sl":102},{"sl":120},{"sl":121},{"sl":122},{"sl":123},{"sl":124},{"sl":125},{"sl":126},{"sl":130},{"sl":134},{"sl":138},{"sl":139},{"sl":143},{"sl":144}]},"test_906":{"methods":[{"sl":39},{"sl":105},{"sl":119},{"sl":129},{"sl":133},{"sl":137},{"sl":142}],"name":"testStrictPartialClassMocking","pass":true,"statements":[{"sl":40},{"sl":108},{"sl":109},{"sl":120},{"sl":121},{"sl":122},{"sl":123},{"sl":124},{"sl":125},{"sl":126},{"sl":130},{"sl":134},{"sl":138},{"sl":139},{"sl":143},{"sl":144}]}}

// JSON: { lines : [{tests : [testid1, testid2, testid3, ...]}, ...]};
clover.srcFileLines = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [215, 434, 906, 567, 643, 884], [215, 434, 906, 567, 643, 884], [], [], [], [], [], [], [], [], [], [], [700, 194], [], [700, 194], [700, 194], [], [], [700, 194], [], [], [700, 194], [700, 194], [], [], [46, 814], [], [46, 814], [], [], [826, 237], [], [826, 237], [], [], [801, 722], [], [801, 722], [], [], [712, 1026], [], [712, 1026], [], [], [1079, 754], [], [1079, 754], [], [], [848, 439], [], [848, 439], [], [], [826, 801, 46, 722, 237, 814], [826, 801, 46, 722, 237, 814], [], [], [434, 884], [], [], [434, 884], [434, 884], [], [], [215, 906], [], [], [215, 906], [215, 906], [], [], [567, 643], [], [], [567, 643], [567, 643], [], [], [215, 434, 906, 567, 643, 884], [215, 434, 906, 567, 643, 884], [215, 434, 906, 567, 643, 884], [215, 434, 906, 567, 643, 884], [215, 434, 906, 567, 643, 884], [215, 434, 906, 567, 643, 884], [215, 434, 906, 567, 643, 884], [215, 434, 906, 567, 643, 884], [], [], [712, 215, 434, 1079, 848, 906, 567, 754, 643, 884, 439, 1026], [712, 215, 434, 1079, 848, 906, 567, 754, 643, 884, 439, 1026], [], [], [826, 712, 215, 801, 46, 722, 434, 1079, 848, 906, 567, 754, 643, 237, 814, 884, 439, 1026], [826, 712, 215, 801, 46, 722, 434, 1079, 848, 906, 567, 754, 643, 237, 814, 884, 439, 1026], [], [], [826, 712, 215, 801, 46, 722, 434, 1079, 848, 906, 567, 754, 643, 237, 814, 884, 439, 1026], [826, 712, 215, 801, 46, 722, 434, 1079, 848, 906, 567, 754, 643, 237, 814, 884, 439, 1026], [826, 712, 215, 801, 46, 722, 434, 1079, 848, 906, 567, 754, 643, 237, 814, 884, 439, 1026], [], [], [215, 434, 906, 567, 643, 884], [215, 434, 906, 567, 643, 884], [215, 434, 906, 567, 643, 884], [], [], [], [], []]