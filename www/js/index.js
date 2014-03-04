/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    deviceData: null,
    deviceDataList: null,
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {

        if (/phonegap/i.test(navigator.userAgent)) {

            document.addEventListener('deviceready', this.onDeviceReady, false);

        } else {

            this.onDeviceReady();

        }

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        this.renderCapabilities();

    },

    renderCapabilities: function () {

        switch (true) {

            case device.android():
                this.deviceData = document.getElementById('device-data');
                this.deviceData.innerHTML = 'You are on Android!!!! ' + this.getOS()  + this.deviceData.innerHTML;
                this.deviceDataList = this.deviceData.getElementsByTagName('ul')[0];

                this.deviceDataList.innerHTML += '<li>Android Phone: ' + device.androidPhone() + '</li>';
                this.deviceDataList.innerHTML += '<li>Android Tablet: ' + device.androidTablet() + '</li>';
                this.deviceDataList.innerHTML += '<li>Landscape ' + device.landscape() + '</li>';
                this.deviceDataList.innerHTML += '<li>Portrait: ' + device.portrait() + '</li>';
                this.deviceDataList.innerHTML += '<li>Viewport width: ' + Math.max(document.documentElement.clientWidth, window.innerWidth || 0) + '</li>';
                this.deviceDataList.innerHTML += '<li>Android Phone: ' + Math.max(document.documentElement.clientHeight, window.innerHeight || 0) + '</li>';
                this.deviceDataList.innerHTML += '<li>Cookies enabled: ' + this.checkCookie() + '</li>';

                break;
            case  device.ios():
                this.deviceData = document.getElementById('device-data');
                this.deviceData.innerHTML = 'You are on iOS!!!! ' + this.getOS()  + this.deviceData.innerHTML;
                this.deviceDataList = this.deviceData.getElementsByTagName('ul')[0];

                this.deviceDataList.innerHTML += '<li>iOS Phone: ' + device.iphone() + '</li>';
                this.deviceDataList.innerHTML += '<li>iOS Tablet: ' + device.ipad() + '</li>';
                this.deviceDataList.innerHTML += '<li>Landscape ' + device.landscape() + '</li>';
                this.deviceDataList.innerHTML += '<li>Portrait: ' + device.portrait() + '</li>';
                this.deviceDataList.innerHTML += '<li>Viewport width: ' + Math.max(document.documentElement.clientWidth, window.innerWidth || 0) + '</li>';
                this.deviceDataList.innerHTML += '<li>Android Phone: ' + Math.max(document.documentElement.clientHeight, window.innerHeight || 0) + '</li>';
                this.deviceDataList.innerHTML += '<li>Cookies enabled: ' + this.checkCookie() + '</li>';
                break;


        }

    },

    checkCookie: function () {

        var cookieEnabled = (navigator.cookieEnabled) ? true : false

        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {

            document.cookie = 'testcookie';
            cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;

        }

        return cookieEnabled;

    },

    getOS: function () {

        var ua = navigator.userAgent;
        var uaindex;

        var mobileOS;    // will either be iOS, Android or unknown
        var mobileOSver; // this is a string, use Number(mobileOSver) to convert

        // determine OS
        if (ua.match(/iPad/i) || ua.match(/iPhone/i)) {
            mobileOS = 'iOS';
            uaindex = ua.indexOf('OS ');
        }
        else if (ua.match(/Android/i)) {
            mobileOS = 'Android';
            uaindex = ua.indexOf('Android ');
        }
        else {
            mobileOS = 'unknown';
        }

        // determine version
        if (mobileOS === 'iOS' && uaindex > -1) {
            mobileOSver = ua.substr(uaindex + 3, 3).replace('_', '.');
        }
        else if (mobileOS === 'Android' && uaindex > -1) {
            mobileOSver = ua.substr(uaindex + 8, 3);
        }
        else {
            mobileOSver = 'unknown';
        }

        return mobileOS + ' - ' + mobileOSver;

    }


};
