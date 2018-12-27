cmake_minimum_required(VERSION 3.9)
project(kqcs LANGUAGES C)

find_path(LIBEV_INCLUDE_DIR
    NAMES ev.h
    HINTS ${LIBEV_RROT_DIR}
    PATH_SUFFIXES include)
find_library(LIBEV_LIBRARY
    NAME ev
    HINTS ${LIBEV_ROOT_DIR}
    PATH_SUFFIXES ${CMAKE_INSTALL_LIBDIR})

# client
add_executable(clientkqcs "")
target_sources(clientkqcs
                  PUBLIC
                      "zc_config.c"
                      "zc_bench.c"
                      "zc_client_state.c"
                      "zc_client.c"
                      "zc_connector.c"
                      "zc_reader.c"
                      "zc_writer.c"
                      "zc_thread.c"
                      "zc_bench.h"
                      "zc_config.h"
                      "zc_client_state.h"
                      "zc_client.h"
                      "zc_connector.h"
                      "zc_reader.h"
                      "zc_writer.h"
                      "zc_thread.h"
                      "zc_bench_constants.h"
)
target_include_directories(clientkqcs PUBLIC ${LIBEV_INCLUDE_DIR})
target_link_libraries(clientkqcs PUBLIC ${LIBEV_LIBRARY})

#server
add_executable(serverkqcs "")
target_sources(serverkqcs 
PUBLIC 
"server.c" 
"zc_config.c" 
"zc_config.h"
"s/zc_server.c" 
"s/zc_server.h"
"s/zc_log.c" 
"s/zc_log.h"
"s/zc_req.c" 
"s/zc_req.h"
"s/zc_conn.c" 
"s/zc_conn.h"
"s/zc_cycle.c" 
"s/zc_cycle.h"
)
target_include_directories(serverkqcs PUBLIC ${LIBEV_INCLUDE_DIR})
target_link_libraries(serverkqcs PUBLIC ${LIBEV_LIBRARY})

