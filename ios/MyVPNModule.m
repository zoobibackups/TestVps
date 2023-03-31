#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(MyVPN, NSObject)

RCT_EXTERN_METHOD(connect:(NSString *)server username:(NSString *)username password:(NSString *)password sharedSecret:(NSString *)sharedSecret callback:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(disconnect:(RCTResponseSenderBlock)callback)

@end
