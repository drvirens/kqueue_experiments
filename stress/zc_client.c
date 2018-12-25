//
//  zc_client.c
//  clientkqcs
//
//  Created by Virendra Shakya on 12/24/18.
//

#include "zc_client.h"
#include "zc_malloc.h"
#include "zc_client_state.h"
#include "zc_connector.h"
#include "zc_writer.h"
#include "zc_reader.h"

struct zc_client {
  zc_client_state_e state_;
  zc_connector_t *connector_;
  zc_writer_t *writer_;
  zc_reader_t *reader_;
};

static void s_handle_connection_status(zc_client_t *self, int connection_status) {
  if (connection_status) {
    printf("CONNECTED!!!!\n");
    printf("send some data here\n\n");
    char buf[100];
    strcpy(buf, "Welcome!");
    int buf_len = strlen(buf) + 1;
    zc_writer__write(self->writer_, buf, buf_len);
  } else {
    printf("NOT CONNECTED!!!!\n");
    printf("do nothing\n\n");
  }
}

static void s_connect_cb(void *self_handle, int connection_status) {
  zc_client_t *self = (zc_client_t *)self_handle;
  if (self) {
    s_handle_connection_status(self, connection_status);
  }
}
static void s_client_initialize(zc_client_t *self) {
  self->state_ = zc_client_state__initialized;
  self->connector_ = zc_connector_new("");
  self->writer_ = zc_writer_new("", self->connector_);
}
extern zc_client_t *zc_client_new(const char *name) {
  zc_client_t *obj = (zc_client_t *)ZC_MALLOC(sizeof(zc_client_t));
  if (obj) {
    memset(obj, 0, sizeof(zc_client_t));
    s_client_initialize(obj);
  }
  return obj;
}
extern void zc_client__start(zc_client_t *self) {
  printf("zc_client__start\n");
  zc_connector__connect(self->connector_, &s_connect_cb, self);
}
extern void zc_client_delete(zc_client_t **self) {
  if ( !(self && *self) ) {
    return;
  }
  ZC_FREE(*self);
  *self = NULL;
}
