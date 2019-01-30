#!/usr/bin/env bash
cd /app
yarn
yarn start --env.USING_DOCKER --color
