//
//  zc_writer.h
//  writerkqcs
//
//  Created by Virendra Shakya on 12/24/18.
//

#ifndef zc_writer_h
#define zc_writer_h


#include <stdio.h>
#include <memory.h>

#ifdef __cplusplus
extern "C" {
#endif
  
  typedef struct zc_writer zc_writer_t;
  extern zc_writer_t *zc_writer_new(const char *name);
  extern void zc_writer__start(zc_writer_t *self);
  extern void zc_writer_delete(zc_writer_t **self);
  
  
#ifdef __cplusplus
}
#endif



#endif /* zc_writer_h */
