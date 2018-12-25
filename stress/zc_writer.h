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
#include "zc_connector.h"

#ifdef __cplusplus
extern "C" {
#endif
  
  typedef struct zc_writer zc_writer_t;
  extern zc_writer_t *zc_writer_new(const char *name, zc_connector_t *connector);
  extern void zc_writer__write(zc_writer_t *self, const char *buf, const int buf_len);
  extern void zc_writer_delete(zc_writer_t **self);
  
  
#ifdef __cplusplus
}
#endif



#endif /* zc_writer_h */
