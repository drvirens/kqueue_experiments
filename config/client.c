#include <ev.h>

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


#include "zc_config.h"

//#define ZC_DEFAULT_SOCKET_PATH "/tmp/vs0000_1"

//static char* socket_path = ZC_DEFAULT_SOCKET_PATH;
static char* socket_path;

static int times=0;
static struct ev_loop *loop;
static ev_io stdin_watcher;
static ev_io socket_reader;
static int remote_fd;
int setnonblock(int fd)
{
  int flags;
  flags = fcntl(fd, F_GETFL);
  flags |= O_NONBLOCK;
  return fcntl(fd, F_SETFL, flags);
}
static void s_socket_read_cb(EV_P_ ev_io *w, int revents) {
  printf("RCVD from server\n");
  char buf[100];
  
  int w_fd = w->fd;
  if (w_fd != remote_fd) {
    //wtf
    exit(EXIT_FAILURE);
  }
  recv(w->fd, buf, sizeof(buf), 0);
  printf("  %s\n", buf);
  
  ev_io_stop(EV_A_ &socket_reader);
  
  ev_io_set(&socket_reader, remote_fd, EV_READ);
  ev_io_start(EV_A_ &socket_reader);
}
static void s_stdin_watcher_cb(EV_P_ ev_io *w, int revents) {
  char buf[100];
  int wfd = w->fd;
  int rc = read(wfd, buf, sizeof(buf));
  printf("RCVD from inputdevice\n");
  printf("  {%d}\n", rc);
  if (rc > 0) {
    buf[rc] = '\0';
    printf("  %s\n", buf);
    int wrote = write(remote_fd, buf, rc);
    if (-1 == wrote) {
      printf("ERROR while sending: {%s} \n", strerror(errno));
      printf("errno\n");
      printf("  {%d}\n\n", wrote);
      printf("------\n");
      
      
      printf("------CLOSED connection\n");
      close(remote_fd); //test
      exit(EXIT_FAILURE);
    }
    if (wrote) {
      printf("SENT\n");
      printf("  {%d}\n\n", wrote);
      printf("------\n");
    }
  }
  ev_io_stop(EV_A_ w);
  ev_io_set(&stdin_watcher, 0, EV_READ);
  ev_io_start(EV_A_ &stdin_watcher);
  
}

static char un_path[1000];
int main(int argc, char* argv[])
{
  {
  const char *p = "/Users/virendra.shakya/ROMPEr/spike/kqueue-client-server/config/zircon.config";
  zc_config_t *config = zc_config_new(p);
  zc_config__str_value(config, NULL, un_path, 1000);
  socket_path = &un_path[0];
  zc_config_delete(&config);
  }
  
  
  loop = EV_DEFAULT;
  ev_io_init(&stdin_watcher, s_stdin_watcher_cb, 0, EV_READ);
  ev_io_start(EV_A_ &stdin_watcher);
  
  
  struct sockaddr_un addr;

  if (argc > 1)
    socket_path = argv[1];

  if ((remote_fd = socket(AF_UNIX, SOCK_STREAM, 0)) == -1) {
    perror("socket error");
    exit(-1);
  }

  if (-1 == setnonblock(remote_fd)) {
    perror("echo client socket nonblock");
    exit(EXIT_FAILURE);
  }
  
  
  memset(&addr, 0, sizeof(addr));
  addr.sun_family = AF_UNIX;
  if (*socket_path == '\0') {
    *addr.sun_path = '\0';
    strncpy(addr.sun_path + 1, socket_path + 1, sizeof(addr.sun_path) - 2);
  } else {
    strncpy(addr.sun_path, socket_path, sizeof(addr.sun_path) - 1);
  }

  if (connect(remote_fd, (struct sockaddr*)&addr, sizeof(addr)) == -1) {
    perror("connect error");
    exit(-1);
  }
  
  ev_io_init(&socket_reader, s_socket_read_cb, remote_fd, EV_READ);
  ev_io_start(EV_A_ &socket_reader);
  
  ev_run(loop, 0);

#if 0
  while ((rc = read(STDIN_FILENO, buf, sizeof(buf))) > 0) {
    if (write(fd, buf, rc) != rc) {
      if (rc > 0)
        fprintf(stderr, "partial write");
      else {
        perror("write error");
        exit(-1);
      }
    }
  }
#endif
  return 0;
}
