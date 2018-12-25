//
//  zc_reader.h
//  readerkqcs
//
//  Created by Virendra Shakya on 12/24/18.
//

#ifndef zc_reader_h
#define zc_reader_h


#include <stdio.h>
#include <memory.h>

#ifdef __cplusplus
extern "C" {
#endif
  
  typedef struct zc_reader zc_reader_t;
  extern zc_reader_t *zc_reader_new(const char *name);
  extern void zc_reader__start(zc_reader_t *self);
  extern void zc_reader_delete(zc_reader_t **self);
  
#ifdef __cplusplus
}
#endif


#endif /* zc_reader_h */
