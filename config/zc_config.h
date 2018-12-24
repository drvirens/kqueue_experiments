#ifndef __zc_config_h__
#define __zc_config_h__

#include <stdio.h>
#include <memory.h>

#ifdef __cplusplus
extern "C" {
#endif

typedef struct zc_config zc_config_t;

extern zc_config_t *zc_config_new(const char *url);
extern void zc_config_delete(zc_config_t **self);
extern void zc_config__str_value(zc_config_t *self, const char *key, char *buf, int buf_len);

#ifdef __cplusplus
}
#endif

#endif
