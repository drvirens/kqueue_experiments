//
//  main.c
//  vs-kqueue
//
//  Created by Virendra Shakya on 12/23/18.
//  Copyright © 2018 Virendra Shakya. All rights reserved.
//
#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <sys/un.h>
#include <netdb.h>
#include <fcntl.h>
#include <sys/event.h>
#include <sys/types.h>
#include <memory.h>
#include <unistd.h>

//#define ZC_DEFAULT_SOCKET_PATH "/tmp/vs0000_1"
static char* socket_path;

#include "zc_config.h"

static void s_loop(int kq, int wfd) {
  struct kevent ev_set;
  struct kevent ev_list[32];
  int nevents;
  int i;
  struct sockaddr_storage addr;
  socklen_t sock_len = sizeof(addr);
  
  //struct timespec ts = {5, 5};
  
  while(1) {
    nevents = kevent(kq, NULL, 0, ev_list, 32, NULL /*&ts*/);
    if (nevents < 1) {
      printf("ERROR: kevent ret: {%d}, errmsg: %s\n", nevents, strerror(errno));
      //return;
      continue;
    }
    printf("Got nevents : %d\n", nevents);
    for (i = 0; i < nevents; i++) {
      struct kevent *kernel_event = &ev_list[i];
      
      
      if (kernel_event->flags & EV_EOF) {
        printf("DISCONNECT\n");
        unsigned long client_fd = kernel_event->ident;
        EV_SET(&ev_set, client_fd, EVFILT_READ, EV_DELETE, 0, 0, NULL);
        int ret_kevent = kevent(kq, &ev_set, 1, NULL, 0, NULL);
        if (ret_kevent == -1) {
          printf("kevent ERRORed: disconnect problem?");
        }
      }
      else if (kernel_event->ident == wfd) {
        printf("ACCEPT\n");
        int accepted_fd = accept(wfd, (struct sockaddr *)&addr, &sock_len);
        printf("ACCEPT: returnedFD : {%d}\n", accepted_fd);
        if (accepted_fd == -1) {
          printf("ERROR: kevent ret: {%d}, errmsg: %s\n", nevents, strerror(errno));
          return;
        }
        
        EV_SET(&ev_set, accepted_fd, EVFILT_READ, EV_ADD, 0, 0, NULL);
        int ret_kevent = kevent(kq, &ev_set, 1, NULL, 0, NULL);
        if (ret_kevent == -1) {
          printf("kevent ERRORed: trying to register read add\n");
        }
        
        //set accepted client fd as nonblocking
        int flags = fcntl(accepted_fd, F_GETFL);
        if (flags < 0) {
          printf("ERROR: ret: {%d}, errmsg: %s\n", accepted_fd, strerror(errno));
          return;
        }
        flags |= O_NONBLOCK;
        int ret = fcntl(accepted_fd, F_SETFL, flags);
        if (ret == -1) {
          printf("ERROR: ret: {%d}, errmsg: %s\n", accepted_fd, strerror(errno));
          return;
        }
        
        
//        int wrote = write(accepted_fd, "welcome!", sizeof("welcome!"));
//        if (-1 == wrote) {
//          printf("ERROR while sending: {%s} \n", strerror(errno));
//          printf("errno\n");
//          printf("  {%d}\n\n", wrote);
//          printf("------\n");
//          return;
//        }
//        if (wrote) {
//          printf("SENT\n");
//          printf("  {%d}\n\n", wrote);
//          printf("------\n");
//        }
      }
      else { //if (ev_list[i].flags == EVFILT_READ) {
        printf("READ\n");
        ssize_t r_bytes;
        ssize_t w_bytes;
        char r_buf[1024];
        int client_fd = kernel_event->ident;
        size_t buf_len = sizeof(r_buf);
        r_bytes = read(client_fd, &r_buf, buf_len);
        
        
        printf("RCVD\n");
        printf("  {%d}\n", r_bytes);
        if (r_bytes > 0 && r_bytes < buf_len) {
          r_buf[r_bytes] = '\0';
          printf("  %s\n", r_buf);
          
          int wrote = write(client_fd, r_buf, r_bytes);
          if (-1 == wrote) {
            printf("ERROR while sending: {%s} \n", strerror(errno));
            printf("errno\n");
            printf("  {%d}\n", wrote);
            printf("------\n");
            return;
          }
          if (wrote) {
            printf("SENT\n");
            printf("  {%d}\n", wrote);
            printf("  %s\n", r_buf);
            printf("------\n");
          }
        }
        

      }
      
    } //end for
  } //end while
}
static void s_start_monitoring(int fd) {
  int kq = kqueue();
  struct kevent ioevent;
  EV_SET(&ioevent, fd, EVFILT_READ, EV_ADD, 0, 0, 0);
  struct timespec ts = {5, 5};
  int ret = kevent(kq, &ioevent, 1, NULL, 0, &ts);
  if (ret == -1) {
    printf("ERROR: kevent ret: {%d}, errmsg: %s\n", fd, strerror(errno));
    return;
  }
  s_loop(kq, fd);
}
static void s_run_1() {
  struct sockaddr_un unix_socket;
  memset(&unix_socket, 0, sizeof(unix_socket));
  strcpy(unix_socket.sun_path, socket_path);
  int sfd = socket(AF_UNIX, SOCK_STREAM, 0);
  if (sfd < 0) {
    printf("ERROR: ret: {%d}, errmsg: %s\n", sfd, strerror(errno));
    return;
  }
  int flags = fcntl(sfd, F_GETFL);
  if (flags < 0) {
    printf("ERROR: ret: {%d}, errmsg: %s\n", sfd, strerror(errno));
    return;
  }
  flags |= O_NONBLOCK;
  int ret = fcntl(sfd, F_SETFL, flags);
  if (ret == -1) {
    printf("ERROR: ret: {%d}, errmsg: %s\n", sfd, strerror(errno));
    return;
  }
  
  socklen_t len = sizeof(unix_socket.sun_path);
  ret = bind(sfd, (const struct sockaddr *)&unix_socket, len);
  if (ret < 0) {
    printf("ERROR: ret: {%d}, errmsg: %s\n", sfd, strerror(errno));
    return;
  }
  const int backlog = 6;
  ret = listen(sfd, backlog);
  if (ret < 0) {
    printf("ERROR: ret: {%d}, errmsg: %s\n", sfd, strerror(errno));
    return;
  }
  s_start_monitoring(sfd);
}
static char un_path[1000];
int main(int argc, const char * argv[]) {
  {
  const char *p = "/Users/virendra.shakya/ROMPEr/spike/kqueue-client-server/config/zircon.config";
  zc_config_t *config = zc_config_new(p);
  zc_config__str_value(config, NULL, un_path, 1000);
  socket_path = &un_path[0];
  zc_config_delete(&config);
  }
  
  s_run_1();
  printf("Hello, World!\n");
  return 0;
}
