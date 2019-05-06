import serial
import time
import os
import struct

ser = serial.Serial(port = '/dev/serial0',
baudrate = 1200,
bytesize = serial.EIGHTBITS, 
parity = serial.PARITY_NONE, 
stopbits = serial.STOPBITS_ONE, 
timeout = None, 
xonxoff = False, 
rtscts = False, 
write_timeout = None, 
dsrdtr = False, 
inter_byte_timeout = None, 
exclusive = None)


i = 0                         

while True:
    while (ser.inWaiting()>0):
        try:
            incoming = ser.read(4)
            decodificado = struct.unpack('4B', incoming)
            
            for x in range(len(decodificado)):
                if(int(decodificado[x]) > 0):
                    #print(decodificado)
                    print(chr(decodificado[x]))
            

            i+=1
            if(i==20):
               # os.system("clear")
                i=0
            time.sleep(50/1000)

        except serial.serialutil.SerialException as error:
            print(error)
