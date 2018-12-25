//
//  zc_connector.c
//  clientkqcs
//
//  Created by Virendra Shakya on 12/24/18.
//
#include <memory.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <errno.h>
#include <netdb.h>
#include <fcntl.h>
#include <sys/event.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/un.h>
#include "zc_connector.h"
#include "zc_malloc.h"
#include "zc_config.h"

struct zc_connector {
  char un_path[1000];
  char* socket_path;
  int remote_fd;
  zc_connector_completion_cb completion_;
  void *user_data_;
  int connect_status_; // 1 = connected, 0 == not connected
};

static int s_setnonblock(int fd)
{
  int flags;
  flags = fcntl(fd, F_GETFL);
  flags |= O_NONBLOCK;
  return fcntl(fd, F_SETFL, flags);
}

static int s_connect(zc_connector_t *self) {
  {
//  const char *p = "zircon.config";
  const char *p = "/Users/virendra.shakya/ROMPEr/spike/kqueue-client-server/stress/zircon.config";
  zc_config_t *config = zc_config_new(p);
  zc_config__str_value(config, NULL, self->un_path, 1000);
  self->socket_path = &self->un_path[0];
  zc_config_delete(&config);
  }
  
  struct sockaddr_un addr;
  
  if ((self->remote_fd = socket(AF_UNIX, SOCK_STREAM, 0)) == -1) {
    perror("socket error");
    exit(-1);
  }
  
  if (-1 == s_setnonblock(self->remote_fd)) {
    perror("echo client socket nonblock");
    exit(EXIT_FAILURE);
  }
  
  
  memset(&addr, 0, sizeof(addr));
  addr.sun_family = AF_UNIX;
  if (*self->socket_path == '\0') {
    *addr.sun_path = '\0';
    strncpy(addr.sun_path + 1, self->socket_path + 1, sizeof(addr.sun_path) - 2);
  } else {
    strncpy(addr.sun_path, self->socket_path, sizeof(addr.sun_path) - 1);
  }
  
  if (connect(self->remote_fd, (struct sockaddr*)&addr, sizeof(addr)) == -1) {
    perror("connect error");
    exit(-1);
  }
  
  self->connect_status_ = 1;
  
  return 0;
}


extern zc_connector_t *zc_connector_new(const char *name) {
  zc_connector_t *obj = (zc_connector_t *)ZC_MALLOC(sizeof(zc_connector_t));
  if (obj) {
    obj->connect_status_ = 0;
  }
  return obj;
}
extern void zc_connector__connect(zc_connector_t *self, zc_connector_completion_cb completion, void *user_data) {
  self->completion_ = completion;
  self->user_data_ = user_data;
  int r = s_connect(self);
  if (r == 0) { //success
    if (self->completion_) {
      (*(self->completion_))(self->user_data_, self->connect_status_);
    }
  }
}
extern void zc_connector_delete(zc_connector_t **self) {
  if (self && *self) {
    ZC_FREE(*self);
    *self = 0;
  }
}
