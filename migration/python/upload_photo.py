#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# Use text editor to edit the script and type in valid Instagram username/password

import sys

from InstagramAPI import InstagramAPI

#print ('I have imported the InstagramAPI')

args 	= sys.argv

photo_path = args[1]
caption = args[2]

InstagramAPI = InstagramAPI("migration_divination", "Xd12345!")
InstagramAPI.login()  # login


InstagramAPI.uploadPhoto(photo_path, caption=caption)

#print ('I have uploaded' )
