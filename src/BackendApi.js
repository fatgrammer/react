import React, { Component } from 'react';
export function fetchJson(url){
  return fetch(url, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res=>res.json()).then(json=>json)
}
