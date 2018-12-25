//
//  bench.h
//  clientkqcs
//
//  Created by Virendra Shakya on 12/23/18.
//

#ifndef __zc_bench_h__
#define __zc_bench_h__

#include <stdio.h>
#include <memory.h>

#ifdef __cplusplus
extern "C" {
#endif
  
  typedef struct zc_bench zc_bench_t;
  
  extern zc_bench_t *zc_bench_new(const char *url);
  extern void zc_bench_delete(zc_bench_t **self);
  extern void zc_bench__start(zc_bench_t *self);
  
#ifdef __cplusplus
}
#endif

#

#endif /* __zc_bench_h__ */
