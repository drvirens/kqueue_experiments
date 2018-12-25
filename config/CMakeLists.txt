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
target_sources(clientkqcs PUBLIC "client.c" "zc_config.c" "zc_config.h")
target_include_directories(clientkqcs PUBLIC ${LIBEV_INCLUDE_DIR})
target_link_libraries(clientkqcs PUBLIC ${LIBEV_LIBRARY})

#server
add_executable(serverkqcs "")
target_sources(serverkqcs PUBLIC "server.c" "zc_config.c" "zc_config.h")
target_include_directories(serverkqcs PUBLIC ${LIBEV_INCLUDE_DIR})
target_link_libraries(serverkqcs PUBLIC ${LIBEV_LIBRARY})

