//
//  zc_writer.c
//  clientkqcs
//
//  Created by Virendra Shakya on 12/24/18.
//

#include "zc_writer.h"
#include "zc_malloc.h"
#include "zc_bench_constants.h"


struct zc_writer {
  char line[ZC_MAX_BUF_LEN];
  int line_len;
  zc_connector_t *connector_;
};

extern zc_writer_t *zc_writer_new(const char *name, zc_connector_t *connector) {
  zc_writer_t *obj = (zc_writer_t *)ZC_MALLOC(sizeof(zc_writer_t));
  if (obj) {
    memset(obj, 0, sizeof(zc_writer_t));
    obj->connector_ = connector;
  }
  return obj;
}
extern void zc_writer__write(zc_writer_t *self, const char *buf, const int buf_len) {
  //cpy buffer internally
  memcpy(self->line, buf, buf_len);
  self->line_len = buf_len;
  
  //then send it
  zc_connector__write(self->connector_, self->line, self->line_len);
}
extern void zc_writer_delete(zc_writer_t **self) {
  if ( !(self && *self) ) {
    return;
  }
  ZC_FREE(*self);
  *self = NULL;
}

