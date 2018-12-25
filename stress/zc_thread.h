//
//  zc_thread.h
//  clientkqcs
//
//  Created by Virendra Shakya on 12/24/18.
//

#ifndef zc_thread_h
#define zc_thread_h


#include <stdio.h>
#include <memory.h>

#ifdef __cplusplus
extern "C" {
#endif
  
  typedef struct zc_thread zc_thread_t;
  
  extern zc_thread_t *zc_thread_new(const char *name);
  extern void zc_thread__start(zc_thread_t *self);
  extern void zc_thread_delete(zc_thread_t **self);
  
#ifdef __cplusplus
}
#endif


#endif /* zc_thread_h */
