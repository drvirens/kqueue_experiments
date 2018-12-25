//
//  zc_thread.c
//  clientkqcs
//
//  Created by Virendra Shakya on 12/24/18.
//

#include <errno.h>
#include <pthread.h>
#include "zc_thread.h"
#include "zc_client.h"
#include "zc_malloc.h"

#define NUM_THREADS 1
struct zc_thread {
  pthread_t threads_[NUM_THREADS];
  pthread_attr_t thread_attr_[NUM_THREADS];
};

static void *s_thread_entry_cb(void *context)
{
  printf("Thread done\n");
  zc_client_t *client = zc_client_new("<client-name>");
  zc_client__start(client);
  zc_client_delete(&client);
  
  pthread_exit(context);
  return 0;
}

static void s_thread_initialize(zc_thread_t *self) {
  
}
extern zc_thread_t *zc_thread_new(const char *name) {
  zc_thread_t *obj = (zc_thread_t *)ZC_MALLOC(sizeof(zc_thread_t));
  if (obj) {
    memset(obj, 0, sizeof(zc_thread_t));
    s_thread_initialize(obj);
  }
  return obj;
}
extern void zc_thread__start(zc_thread_t *self) {
  printf("zc_thread__start\n");

  

    //create
    int t;
    int rc;
    for (t = 0; t < NUM_THREADS; t++) {
      pthread_attr_init(&self->thread_attr_[t]);
      pthread_attr_setdetachstate(&self->thread_attr_[t], PTHREAD_CREATE_JOINABLE);
      

        rc = pthread_create(&self->threads_[t], &self->thread_attr_[t], s_thread_entry_cb, (void *)self);
        if (rc) {
          printf("ERROR; return code from pthread_create() is %d, [%s]\n", rc, strerror(errno));
          exit(EXIT_FAILURE);
        }
      
      pthread_attr_destroy(&self->thread_attr_[t]);
      
    }//end for

  


    {
    //join
    void *status = &status;
    for (t = 0; t < NUM_THREADS; t++) {
      int ret = pthread_join(self->threads_[0], status);
      if (ret) {
        printf("ERROR; return code from pthread_join() is %d\n", rc);
        exit(-1);
      }
      printf("Main: completed join with thread %ld having a status of %ld\n",t,(long)status);
    }
    }

  printf("Main: launcher program completed. Exiting.\n");
  //pthread_exit(NULL);
}
  
  
extern void zc_thread_delete(zc_thread_t **self) {
  if ( !(self && *self) ) {
    return;
  }
  ZC_FREE(*self);
  *self = NULL;
}

