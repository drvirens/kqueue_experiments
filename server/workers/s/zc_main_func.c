//
//  zc_main_func.c
//  kqcs
//
//  Created by Virendra Shakya on 12/26/18.
//

#include <stdlib.h>
#include "zc_main_func.h"

static int s_run() {
  int r;
  r = 1;
  
  zc_server_t *server_instance = zc_server_new();
  
  zc_mutex_t *accept_mutex = zc_mutex_new();
  zc_accept_strategy_t *accept_strategy = zc_accept_strategy_new(accept_mutex);
  
    zc_path_t *config_path = zc_path_new("/etc/zc/zircon.config");
  
  
          zc_cycle_t *cycle = zc_cycle_new(accept_strategy, config_path);
            zc_mproc_t *mp = zc_mproc_new();
              zc_mproc__run(cycle);
                //this will cause 4 (child) worker processes to be launched
                zc_wproc_t *wp = zc_wproc_new();
                    zc_wproc__loop(wp);
  
                          zc_module_t *core = zc_module_core_new();
                          zc_level__transfer_ownership(level, core);
  
                          zc_module_t *healthcheck = zc_module_healthcheck_new();
                          zc_level__transfer_ownership(level, healthcheck);
  
                          zc_module_t *upstream = zc_module_upstream_new();
                          //https://github.com/cep21/healthcheck_nginx_upstreams/blob/master/ngx_http_healthcheck_module.c
                          zc_level__transfer_ownership(level, upstream);
  
                                  zc_conn_t *conn = zc_conn_new();
                                  zc_cycle__transfer_ownership(level, conn);
  
  
                                      zc_req_t *req = zc_req_new();
  
                                      zc_req_delete(&req);
                                  
  
                zc_wproc_delete(&wp);
             zc_master_delete(&mp);
  
          zc_cycle_delete(&cycle);
    zc_path_delete(&path);
  
  zc_accept_strategy(&accept_strategy);
  zc_mutex_delete(&accept_mutex);
  
  zc_server_delete(&server_instance);
  
  r = 0; //success
  return r;
}

extern int main(int argC, char *argV[]) {
  int r;
  r = s_run();
  if (r == 0) {//success
    
  }
  exit(EXIT_SUCCESS);
}
