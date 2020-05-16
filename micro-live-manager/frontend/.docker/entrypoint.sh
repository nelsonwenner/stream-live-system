#!/bin/bash

cd /frontend/src

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

npm install
npm run start