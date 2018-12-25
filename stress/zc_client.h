//
//  zc_client.h
//  clientkqcs
//
//  Created by Virendra Shakya on 12/24/18.
//

#ifndef zc_client_h
#define zc_client_h


#include <stdio.h>
#include <memory.h>

#ifdef __cplusplus
extern "C" {
#endif
  
  typedef struct zc_client zc_client_t;
  
  extern zc_client_t *zc_client_new(const char *name);
  extern void zc_client__start(zc_client_t *self);
  extern void zc_client_delete(zc_client_t **self);
  
#ifdef __cplusplus
}
#endif


#endif /* zc_client_h */
