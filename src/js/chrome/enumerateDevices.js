/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */
'use strict';

// Expose public methods.
module.exports = function() {
  if (!navigator.mediaDevices && !navigator.mediaDevices.enumerateDevices) {
    navigator.mediaDevices = {};
    navigator.mediaDevices.enumerateDevices = function() {
      return new Promise(function(resolve) {
        var kinds = {
          audio: 'audioinput',
          video: 'videoinput'
        };
        return MediaStreamTrack.getSources(function(devices) {
          resolve(devices.map(function(device) {
            return {
              label: device.label,
              kind: kinds[device.kind],
              deviceId: device.id,
              groupId: ''
            };
          }));
        });
      });
    };
  }
};
