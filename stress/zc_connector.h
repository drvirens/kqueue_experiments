//
//  zc_connector.h
//  connectorkqcs
//
//  Created by Virendra Shakya on 12/24/18.
//

#ifndef zc_connector_h
#define zc_connector_h


#include <stdio.h>
#include <memory.h>

#ifdef __cplusplus
extern "C" {
#endif
  
  typedef void (*zc_connector_completion_cb)(void */*user-data*/, int /*connection_status*/);
  typedef struct zc_connector zc_connector_t;
  
  extern zc_connector_t *zc_connector_new(const char *name);
  extern void zc_connector__connect(zc_connector_t *self, zc_connector_completion_cb completion, void *user_data);
  extern void zc_connector_delete(zc_connector_t **self);
  
  
#ifdef __cplusplus
}
#endif



#endif /* zc_connector_h */
