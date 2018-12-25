//
//  bench.c
//  clientkqcs
//
//  Created by Virendra Shakya on 12/23/18.
//

#include <signal.h>
#include "zc_bench.h"
#include "zc_malloc.h"
#include "zc_client_state.h"
#include "zc_connector.h"
#include "zc_writer.h"
#include "zc_reader.h"
#include "zc_thread.h"
#include "zc_client.h"
#include "zc_bench_constants.h"

struct zc_bench {
  zc_thread_t *thread_;
};

static void s_bench_initialize(zc_bench_t *self) {
  char buf[ZC_MAX_BUF_LEN] = {0};
  self->thread_ = zc_thread_new(buf);
}
extern zc_bench_t *zc_bench_new(const char *url) {
  zc_bench_t *obj = (zc_bench_t *)ZC_MALLOC(sizeof(zc_bench_t));
  if (obj) {
    memset(obj, 0, sizeof(zc_bench_t));
    s_bench_initialize(obj);
  }
  return obj;
}
extern void zc_bench_delete(zc_bench_t **self) {
  if (self && *self) {
    zc_thread_delete(&((*self)->thread_));
    ZC_FREE(*self);
    *self = NULL;
  }
}
extern void zc_bench__start(zc_bench_t *self) {
  zc_thread__start(self->thread_);
}

//bench client
/*
 
 - 1/ connect
 - 2/ send
 - 3/ recv
 - 4/ timer fired?
 - 5/ yes -> stop
 - 6/ go 2/
 
 */
static void s_start_bench() {
  zc_bench_t *bench = zc_bench_new("/tmp/bench.config");
  zc_bench__start(bench);
  zc_bench_delete(&bench);
}

int main(int argc, char *argv[]) {
  signal(SIGHUP, SIG_IGN);
  signal(SIGPIPE, SIG_IGN);
  s_start_bench();
  exit(EXIT_SUCCESS);
}

