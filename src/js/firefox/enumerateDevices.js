/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */
'use strict';

var browserDetails = require('../utils').browserDetails;

// Expose public methods.
module.exports = function() {
  // Shim for mediaDevices on older versions.
  if (!navigator.mediaDevices) {
    navigator.mediaDevices = {
      addEventListener: function() {},
      removeEventListener: function() {}
    };
  }
  navigator.mediaDevices.enumerateDevices = navigator.mediaDevices.enumerateDevices || function() {
    return new Promise(function(resolve) {
      var infos = [
        {
          kind: 'audioinput',
          deviceId: 'default',
          label: '',
          groupId: ''
        },
        {
          kind: 'videoinput',
          deviceId: 'default',
          label: '',
          groupId: ''
        }
      ];
      resolve(infos);
    });
  };

  if (browserDetails.version < 41) {
    // Work around http://bugzil.la/1169665
    var orgEnumerateDevices = navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
    navigator.mediaDevices.enumerateDevices = function() {
      return orgEnumerateDevices().then(undefined, function(e) {
        if (e.name === 'NotFoundError') {
          return [];
        }
        throw e;
      });
    };
  }
};
