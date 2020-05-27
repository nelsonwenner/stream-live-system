#!/bin/bash

cd /backend/src

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

npm install
npm run start