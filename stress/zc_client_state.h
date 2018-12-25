//
//  zc_client_state.h
//  clientkqcs
//
//  Created by Virendra Shakya on 12/24/18.
//

#ifndef zc_client_state_h
#define zc_client_state_h


#ifdef __cplusplus
extern "C" {
#endif
  
  
typedef enum zc_client_state {
  zc_client_state__initialized,
  zc_client_state__connecting,
  zc_client_state__connected,
  zc_client_state__sending,
  zc_client_state__sent,
} zc_client_state_e;

  
#ifdef __cplusplus
}
#endif


#endif /* zc_client_state_h */
