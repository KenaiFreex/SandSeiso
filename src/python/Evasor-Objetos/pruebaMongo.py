import pymongo
from time import sleep

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["testdb"]
mycol = mydb["evasors"]

def direccionMongo(ad,at,iz,de):
    adelante = [{ "adelante": 0 }, { "adelante": 1 }]
    atras = [{ "atras": 0 }, { "atras": 1 }]
    izquierda = [{ "izquierda": 0 }, { "izquierda": 1 }]
    derecha = [{ "derecha": 0 }, { "derecha": 1 }]

    NewAdelante = { "$set": { "adelante": ad } }
    NewAtras = { "$set": { "atras": at } } 
    NewIzquierda = { "$set": { "izquierda": iz }  }
    NewDerecha = { "$set": { "derecha": de } }

    for i in range(2):
        mycol.update_one(adelante[i], NewAdelante)
        mycol.update_one(atras[i], NewAtras)
        mycol.update_one(izquierda[i], NewIzquierda)
        mycol.update_one(derecha[i], NewDerecha)

while True:

    direccionMongo(0,0,0,0)

    #print "customers" after the update:
    for x in mycol.find():
        print(x)


    sleep(0.1)

    direccionMongo(1,0,1,0)

    #print "customers" after the update:
    for x in mycol.find():
        print(x)

    sleep(0.1)




