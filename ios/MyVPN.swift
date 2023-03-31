import Foundation
import NetworkExtension
import React

@objc(MyVPN)
class MyVPN: NSObject {
  
  @objc
  func connect(_ server: String, _ username: String, _ password: String, _ sharedSecret: String, _ callback: @escaping RCTResponseSenderBlock) {
    let vpnManager = NEVPNManager.shared()
    vpnManager.loadFromPreferences { error in
      if error != nil {
        callback([error?.localizedDescription ?? "Failed to load VPN preferences"])
      } else {
        let p = NEVPNProtocolIKEv2()
        p.serverAddress = server
        p.username = username
        p.passwordReference = password.data(using: .utf8)
        p.sharedSecretReference = sharedSecret.data(using: .utf8)
        vpnManager.protocolConfiguration = p
        vpnManager.isEnabled = true
        vpnManager.saveToPreferences { error in
          if error != nil {
            callback([error?.localizedDescription ?? "Failed to save VPN preferences"])
          } else {
            do {
              try vpnManager.connection.startVPNTunnel()
              callback([NSNull(), "VPN connected successfully"])
            } catch let err {
              callback([err.localizedDescription])
            }
          }
        }
      }
    }
  }
  
  @objc
  func disconnect(_ callback:  @escaping RCTResponseSenderBlock) {
    let vpnManager = NEVPNManager.shared()
    vpnManager.connection.stopVPNTunnel()
    vpnManager.isEnabled = false
    vpnManager.saveToPreferences { error in
      if error != nil {
        callback([error?.localizedDescription ?? "Failed to save VPN preferences"])
      } else {
        callback([NSNull(), "VPN disconnected successfully"])
      }
    }
  }

}
