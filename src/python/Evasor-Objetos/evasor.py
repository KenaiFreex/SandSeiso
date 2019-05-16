#!/usr/bin/env python
# -*- coding: utf-8 -*-
import freenect
import numpy as np
import time

distancia = 35
threshold = 150
current_depth = 400

def PilotoAutomatico():
    checkD = False
    checkC = False
    checkI = False
    global threshold
    global current_depth
    depth, timestamp = freenect.sync_get_depth()
    depth = 255 * np.logical_and(depth >= current_depth - threshold,
                                depth <= current_depth + threshold)
    depth = depth.astype(np.uint8)
    temp = depth
    avgD = temp[:,:179].mean()
    avgC = temp[:,180:359].mean()
    avgI = temp[:,360:479].mean()
 

    #obstaculo derecha
    if avgD > distancia:
        checkD = True
        
    else:
        checkD = False
        
    #obstaculo centro    
    if avgC > distancia:
        checkC = True
        
    else:
        checkC = False

    if avgI > 35.0:
        checkI = True
        
    else:
        checkI = False
    
    
    if  (checkD & checkC & checkI): #avance hcia adelante

        print('adelante')

        
    elif (checkC & checkD) : #obstaculo izquierda
        if ~checkI:
            print ('derecha')
   
            
    elif (checkC & checkI) : #obstaculo derecha
        if ~checkD:
            print ('izquierda')

    else:
        print ('adelante')
  
    
        
    


while (1):
    PilotoAutomatico()
