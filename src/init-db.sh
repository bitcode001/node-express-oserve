#!/bin/bash

node users.generator.js && 
node shop.generator.js && 
node shop.items.generator.js &&
node shopping.history.generator.js &&
node promotions.generator.js
