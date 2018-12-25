//
//  zc_client.c
//  clientkqcs
//
//  Created by Virendra Shakya on 12/24/18.
//
#include <sched.h>
#include <assert.h>
#include <stdio.h>
#include <errno.h>
#include "zc_client.h"
#include "zc_malloc.h"
#include "zc_client_state.h"
#include "zc_connector.h"
#include "zc_writer.h"
#include "zc_reader.h"
#include "zc_bench_constants.h"

struct zc_client {
  zc_client_state_e state_;
  zc_connector_t *connector_;
  zc_writer_t *writer_;
  zc_reader_t *reader_;
  char *file_path_;
};

static void s_create_file_name(const char *input, char *out_buf, int out_buf_len) {
  if (!out_buf) {
    return;
  }
  if (!out_buf_len) {
    return;
  }
  char gen[ZC_MAX_BUF_LEN] = {0};
  sprintf(gen, "/tmp/%s.txt", input);
  if (strlen(gen) < out_buf_len) {
    strcpy(out_buf, gen);
  }
}
static void s_start_writing(zc_client_t *self) {
  //send file name
  {
  char ini_buf[ZC_MAX_BUF_LEN] = {0};
  sprintf(ini_buf, "CREATE FILE %s.txt\n", self->file_path_);
  zc_writer__write(self->writer_, ini_buf, strlen(ini_buf)+1);
  }
  
  //open a file
  //read line 1
  //send to server
  //wait for a second
  //eof = break
  
  FILE *fp;
  int full_file_url_len = ZC_MAX_BUF_LEN;
  char full_file_url[ZC_MAX_BUF_LEN] = {0};
  s_create_file_name(self->file_path_, full_file_url, full_file_url_len);
  if (full_file_url[0] == '\0') {
    return;
  }
  fp = fopen(full_file_url, "r");
  if (!fp) {
    printf("ERRPR: fopen: { %s }\n", strerror(errno));
    return;
  }
  
  char *eof = "";
  while (eof) {
    char buf[ZC_MAX_BUF_LEN] = {0};
    eof = fgets(buf, ZC_MAX_BUF_LEN, fp);
    int buf_len = 0;
    if (eof) {
      char w_buf[ZC_MAX_BUF_LEN] = {0};
      sprintf(w_buf, "%s_%s", self->file_path_, buf);
      buf_len = strlen(w_buf);
      zc_writer__write(self->writer_, w_buf, buf_len);
    }
    sched_yield();
  }//end while
}
static void s_handle_connection_status(zc_client_t *self, int connection_status) {
  if (connection_status) {
    s_start_writing(self);
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
static void s_client_initialize(zc_client_t *self, const char *name) {
  if (name && name[0] != '\0') {
    assert(self->file_path_ == 0);
    self->file_path_ = (char *)ZC_MALLOC(strlen(name)+1);
    if (self->file_path_) {
      strcpy(self->file_path_, name);
    }
  }
  
  if (!self->file_path_) {
    self->file_path_ = (char *)ZC_MALLOC(strlen("virenthread") + 1);
    if (self->file_path_) {
      strcpy(self->file_path_, "virenthread");
    }
  }
  self->state_ = zc_client_state__initialized;
  self->connector_ = zc_connector_new(self->file_path_);
  self->writer_ = zc_writer_new(self->file_path_, self->connector_);
}
extern zc_client_t *zc_client_new(const char *name) {
  zc_client_t *obj = (zc_client_t *)ZC_MALLOC(sizeof(zc_client_t));
  if (obj) {
    memset(obj, 0, sizeof(zc_client_t));
    s_client_initialize(obj, name);
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
  ZC_FREE((*self)->file_path_);
  ZC_FREE(*self);
  *self = NULL;
}
