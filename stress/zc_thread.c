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
#include "zc_bench_constants.h"


struct zc_thread {
  char *thread_names_[NUM_THREADS];
  pthread_t threads_[NUM_THREADS];
  pthread_attr_t thread_attr_[NUM_THREADS];
};

static void *s_thread_entry_cb(void *context)
{
  const char *thread_name = (const char *)context;
  char *copied_thread_name = 0;
  if (thread_name) {
    
    size_t len = strlen(thread_name);
    copied_thread_name = (char *)ZC_MALLOC(len + 1);
    if (copied_thread_name) {
      strcpy(copied_thread_name, thread_name);
      printf("Launching thread [%s]...\n", copied_thread_name);
    }
  }
  if (!copied_thread_name) {
    char buf[ZC_MAX_BUF_LEN] = {0};
    sprintf(buf, "thread_generated_name_%p", &context);
    size_t len = strlen(buf);
    copied_thread_name = (char *)ZC_MALLOC(len + 1);
    if (copied_thread_name) {
      strcpy(copied_thread_name, buf);
    }
  }
  zc_client_t *client = zc_client_new(copied_thread_name);
  zc_client__start(client);
  zc_client_delete(&client);
  
  ZC_FREE(copied_thread_name);
  copied_thread_name = NULL;
  
  //pthread_exit(context);
  return 0;
}

static void s_thread_initialize(zc_thread_t *self) {
  for (int i = 0; i < NUM_THREADS; i++) {
    char thread_name[ZC_MAX_BUF_LEN] = {0};
    sprintf(thread_name, "thread_%d", i+1);
    self->thread_names_[i] = ZC_MALLOC(strlen(thread_name) + 1);
    if (self->thread_names_[i]) {
      strcpy(self->thread_names_[i], thread_name);
      printf("%s\n", self->thread_names_[i]);
    }
  }
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
      

        rc = pthread_create(&self->threads_[t], &self->thread_attr_[t], s_thread_entry_cb, (void *)self->thread_names_[t]);
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
      //printf("Main: completed join with thread %ld having a status of %ld\n",t,(long)status);
    }
    }

  printf("Main: launcher program completed. Exiting.\n");
  //pthread_exit(NULL);
}
  
  
extern void zc_thread_delete(zc_thread_t **self) {
  if ( !(self && *self) ) {
    return;
  }
  
  //delete all thread names
  for (int i = 0; i < NUM_THREADS; i++) {
    ZC_FREE((*self)->thread_names_[i]);
  }
  
  ZC_FREE(*self);
  *self = NULL;
}

