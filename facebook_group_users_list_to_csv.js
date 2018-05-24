// Facebook Group Users List to CSV version 1.0. 
// Description: Downloads users of a Facebook Group to a CSV file.
// Created by Christopher C. Johnson, www.thatamazingprogrammer.com

// Directions:
//  1: Scroll all the way to the bottom of the Group's users list
//  that way all of the users will have been loaded.
//  2: Copy and Paste the contents of this file into the console (F12) and press enter.
//  3: Reload the page if you want to run the script again on the same page.

// Warnings:
//  Your profile address will always show up in the list and will be https://www.facebook.com/profile.php.
//  This version of the script cannot handle profile's of those who have not set their profile address.
//  In which case their profile address will also show up as https://www.facebook.com/profile.php.

// MIT License

// Copyright (c) [2018] [Christopher C. Johnson]

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// The name of the class that hold the link to the user's Facebook page.
const anchors = document.querySelectorAll('._60ri > a');
let users = new Map();

// populate users map
for (let i = 0; i < anchors.length; i++) {
    let name = anchors[i].textContent;
    let webAddress = anchors[i].href.split('?')[0];

    users.set(name, webAddress);
}

// create and download CSV
function download_csv() {
    let csv = 'Name,Web Address\n';
    users.forEach(function(webAddress, name) {
        csv += name + ',' + webAddress;
        csv += '\n';
    });

    const encodedUri = encodeURI(csv);
    let link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodedUri);
    link.setAttribute('download', 'fb_group_users.csv');
    link.target = '_blank';
    link.innerHTML= 'Click Here to download fb_group_users.csv';
    document.body.appendChild(link); // Required for FF

    link.click();
}

download_csv();
