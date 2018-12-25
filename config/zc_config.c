#include <errno.h>
#include <stdlib.h>
#include <stdio.h>
#include "zc_config.h"

struct zc_config {
  FILE *fp_;
};

extern zc_config_t *zc_config_new(const char *url) {
  zc_config_t *obj = (zc_config_t *)malloc(sizeof(zc_config_t));
  if (obj) {
    memset(obj, 0, sizeof(zc_config_t));
    obj->fp_ = fopen(url, "r");
    if (!obj->fp_) {
      printf("ERRPR: fopen: %s", strerror(errno));
    }
  }
  return obj;
}
extern void zc_config_delete(zc_config_t **self) {
  if (self && *self) {
    if ((*self)->fp_) {
      fclose((*self)->fp_);
    }
    free(*self);
    *self = NULL;
  }
}
extern void zc_config__str_value(zc_config_t *self, const char *key, char *buf, int buf_len) {
  if (!self->fp_) {
    return;
  }
  fgets(buf, buf_len, (self->fp_));
  printf("CONFIG: %s\n", buf);
}
