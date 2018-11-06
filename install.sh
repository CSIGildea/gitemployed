#!/bin/bash

sudo apt-get update
sudo apt-get install python3-venv
python3 -m venv env
pip install -r requirements.txt
