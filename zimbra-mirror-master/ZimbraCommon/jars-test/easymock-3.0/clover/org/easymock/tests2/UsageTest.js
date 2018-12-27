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
clover.pageData = {"classes":[{"el":310,"id":5073,"methods":[{"el":36,"sc":5,"sl":33},{"el":54,"sc":5,"sl":38},{"el":65,"sc":5,"sl":56},{"el":91,"sc":5,"sl":67},{"el":111,"sc":5,"sl":93},{"el":133,"sc":5,"sl":113},{"el":148,"sc":5,"sl":135},{"el":164,"sc":5,"sl":150},{"el":187,"sc":5,"sl":166},{"el":224,"sc":5,"sl":189},{"el":242,"sc":5,"sl":226},{"el":258,"sc":5,"sl":244},{"el":280,"sc":5,"sl":260},{"el":309,"sc":5,"sl":282}],"name":"UsageTest","sl":29}]}

// JSON: {test_ID : {"methods": [ID1, ID2, ID3...], "name" : "testXXX() void"}, ...};
clover.testTargets = {"test_1025":{"methods":[{"sl":189}],"name":"mixingOrderedAndUnordered","pass":true,"statements":[{"sl":191},{"sl":192},{"sl":193},{"sl":194},{"sl":195},{"sl":196},{"sl":197},{"sl":198},{"sl":199},{"sl":201},{"sl":203},{"sl":204},{"sl":206},{"sl":207},{"sl":208},{"sl":210},{"sl":212},{"sl":216},{"sl":217},{"sl":218},{"sl":219},{"sl":220},{"sl":222}]},"test_1048":{"methods":[{"sl":260}],"name":"strictResetToDefault","pass":true,"statements":[{"sl":262},{"sl":264},{"sl":265},{"sl":267},{"sl":269},{"sl":271},{"sl":272},{"sl":274},{"sl":276},{"sl":277},{"sl":279}]},"test_1068":{"methods":[{"sl":166}],"name":"argumentsOrdered","pass":true,"statements":[{"sl":168},{"sl":169},{"sl":170},{"sl":171},{"sl":172},{"sl":173},{"sl":175},{"sl":176},{"sl":179}]},"test_1080":{"methods":[{"sl":189}],"name":"mixingOrderedAndUnordered","pass":true,"statements":[{"sl":191},{"sl":192},{"sl":193},{"sl":194},{"sl":195},{"sl":196},{"sl":197},{"sl":198},{"sl":199},{"sl":201},{"sl":203},{"sl":204},{"sl":206},{"sl":207},{"sl":208},{"sl":210},{"sl":212},{"sl":216},{"sl":217},{"sl":218},{"sl":219},{"sl":220},{"sl":222}]},"test_154":{"methods":[{"sl":244}],"name":"defaultResetToNice","pass":true,"statements":[{"sl":246},{"sl":248},{"sl":249},{"sl":251},{"sl":253},{"sl":255},{"sl":257}]},"test_181":{"methods":[{"sl":38}],"name":"exactCallCountByLastCall","pass":true,"statements":[{"sl":40},{"sl":41},{"sl":43},{"sl":44},{"sl":46},{"sl":47},{"sl":48},{"sl":50},{"sl":52}]},"test_268":{"methods":[{"sl":226}],"name":"resumeIfFailure","pass":true,"statements":[{"sl":228},{"sl":229},{"sl":230},{"sl":232},{"sl":234},{"sl":235},{"sl":239},{"sl":241}]},"test_272":{"methods":[{"sl":67}],"name":"exactCallCountByLastThrowable","pass":true,"statements":[{"sl":69},{"sl":72},{"sl":74},{"sl":75},{"sl":77},{"sl":78},{"sl":83},{"sl":84},{"sl":85},{"sl":89}]},"test_36":{"methods":[{"sl":150}],"name":"summarizeSameObjectArguments","pass":true,"statements":[{"sl":152},{"sl":153},{"sl":154},{"sl":156},{"sl":157},{"sl":160}]},"test_431":{"methods":[{"sl":150}],"name":"summarizeSameObjectArguments","pass":true,"statements":[{"sl":152},{"sl":153},{"sl":154},{"sl":156},{"sl":157},{"sl":160}]},"test_479":{"methods":[{"sl":56}],"name":"openCallCountByLastCall","pass":true,"statements":[{"sl":58},{"sl":60},{"sl":62},{"sl":63},{"sl":64}]},"test_536":{"methods":[{"sl":135}],"name":"wrongArguments","pass":true,"statements":[{"sl":137},{"sl":138},{"sl":140},{"sl":141},{"sl":144}]},"test_538":{"methods":[{"sl":282}],"name":"niceToStrict","pass":true,"statements":[{"sl":284},{"sl":286},{"sl":288},{"sl":290},{"sl":292},{"sl":294},{"sl":295},{"sl":297},{"sl":299},{"sl":300},{"sl":305},{"sl":306},{"sl":308}]},"test_611":{"methods":[{"sl":113}],"name":"moreThanOneArgument","pass":true,"statements":[{"sl":115},{"sl":117},{"sl":119},{"sl":121},{"sl":122},{"sl":123},{"sl":126},{"sl":130}]},"test_62":{"methods":[{"sl":38}],"name":"exactCallCountByLastCall","pass":true,"statements":[{"sl":40},{"sl":41},{"sl":43},{"sl":44},{"sl":46},{"sl":47},{"sl":48},{"sl":50},{"sl":52}]},"test_632":{"methods":[{"sl":260}],"name":"strictResetToDefault","pass":true,"statements":[{"sl":262},{"sl":264},{"sl":265},{"sl":267},{"sl":269},{"sl":271},{"sl":272},{"sl":274},{"sl":276},{"sl":277},{"sl":279}]},"test_654":{"methods":[{"sl":93}],"name":"openCallCountByLastThrowable","pass":true,"statements":[{"sl":95},{"sl":98},{"sl":100},{"sl":101},{"sl":103},{"sl":104},{"sl":107},{"sl":108}]},"test_698":{"methods":[{"sl":244}],"name":"defaultResetToNice","pass":true,"statements":[{"sl":246},{"sl":248},{"sl":249},{"sl":251},{"sl":253},{"sl":255},{"sl":257}]},"test_706":{"methods":[{"sl":56}],"name":"openCallCountByLastCall","pass":true,"statements":[{"sl":58},{"sl":60},{"sl":62},{"sl":63},{"sl":64}]},"test_743":{"methods":[{"sl":113}],"name":"moreThanOneArgument","pass":true,"statements":[{"sl":115},{"sl":117},{"sl":119},{"sl":121},{"sl":122},{"sl":123},{"sl":126},{"sl":130}]},"test_753":{"methods":[{"sl":282}],"name":"niceToStrict","pass":true,"statements":[{"sl":284},{"sl":286},{"sl":288},{"sl":290},{"sl":292},{"sl":294},{"sl":295},{"sl":297},{"sl":299},{"sl":300},{"sl":305},{"sl":306},{"sl":308}]},"test_807":{"methods":[{"sl":93}],"name":"openCallCountByLastThrowable","pass":true,"statements":[{"sl":95},{"sl":98},{"sl":100},{"sl":101},{"sl":103},{"sl":104},{"sl":107},{"sl":108}]},"test_823":{"methods":[{"sl":166}],"name":"argumentsOrdered","pass":true,"statements":[{"sl":168},{"sl":169},{"sl":170},{"sl":171},{"sl":172},{"sl":173},{"sl":175},{"sl":176},{"sl":179}]},"test_854":{"methods":[{"sl":67}],"name":"exactCallCountByLastThrowable","pass":true,"statements":[{"sl":69},{"sl":72},{"sl":74},{"sl":75},{"sl":77},{"sl":78},{"sl":83},{"sl":84},{"sl":85},{"sl":89}]},"test_913":{"methods":[{"sl":135}],"name":"wrongArguments","pass":true,"statements":[{"sl":137},{"sl":138},{"sl":140},{"sl":141},{"sl":144}]},"test_992":{"methods":[{"sl":226}],"name":"resumeIfFailure","pass":true,"statements":[{"sl":228},{"sl":229},{"sl":230},{"sl":232},{"sl":234},{"sl":235},{"sl":239},{"sl":241}]}}

// JSON: { lines : [{tests : [testid1, testid2, testid3, ...]}, ...]};
clover.srcFileLines = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [62, 181], [], [62, 181], [62, 181], [], [62, 181], [62, 181], [], [62, 181], [62, 181], [62, 181], [], [62, 181], [], [62, 181], [], [], [], [706, 479], [], [706, 479], [], [706, 479], [], [706, 479], [706, 479], [706, 479], [], [], [272, 854], [], [272, 854], [], [], [272, 854], [], [272, 854], [272, 854], [], [272, 854], [272, 854], [], [], [], [], [272, 854], [272, 854], [272, 854], [], [], [], [272, 854], [], [], [], [654, 807], [], [654, 807], [], [], [654, 807], [], [654, 807], [654, 807], [], [654, 807], [654, 807], [], [], [654, 807], [654, 807], [], [], [], [], [611, 743], [], [611, 743], [], [611, 743], [], [611, 743], [], [611, 743], [611, 743], [611, 743], [], [], [611, 743], [], [], [], [611, 743], [], [], [], [], [913, 536], [], [913, 536], [913, 536], [], [913, 536], [913, 536], [], [], [913, 536], [], [], [], [], [], [36, 431], [], [36, 431], [36, 431], [36, 431], [], [36, 431], [36, 431], [], [], [36, 431], [], [], [], [], [], [1068, 823], [], [1068, 823], [1068, 823], [1068, 823], [1068, 823], [1068, 823], [1068, 823], [], [1068, 823], [1068, 823], [], [], [1068, 823], [], [], [], [], [], [], [], [], [], [1080, 1025], [], [1080, 1025], [1080, 1025], [1080, 1025], [1080, 1025], [1080, 1025], [1080, 1025], [1080, 1025], [1080, 1025], [1080, 1025], [], [1080, 1025], [], [1080, 1025], [1080, 1025], [], [1080, 1025], [1080, 1025], [1080, 1025], [], [1080, 1025], [], [1080, 1025], [], [], [], [1080, 1025], [1080, 1025], [1080, 1025], [1080, 1025], [1080, 1025], [], [1080, 1025], [], [], [], [992, 268], [], [992, 268], [992, 268], [992, 268], [], [992, 268], [], [992, 268], [992, 268], [], [], [], [992, 268], [], [992, 268], [], [], [698, 154], [], [698, 154], [], [698, 154], [698, 154], [], [698, 154], [], [698, 154], [], [698, 154], [], [698, 154], [], [], [1048, 632], [], [1048, 632], [], [1048, 632], [1048, 632], [], [1048, 632], [], [1048, 632], [], [1048, 632], [1048, 632], [], [1048, 632], [], [1048, 632], [1048, 632], [], [1048, 632], [], [], [753, 538], [], [753, 538], [], [753, 538], [], [753, 538], [], [753, 538], [], [753, 538], [], [753, 538], [753, 538], [], [753, 538], [], [753, 538], [753, 538], [], [], [], [], [753, 538], [753, 538], [], [753, 538], [], []]