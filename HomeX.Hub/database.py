import threading, pyrebase, time
from datetime import datetime

# initialize firebaseapp
config = {
    "apiKey": "AIzaSyDXUyj09PlBOwxHT-VAl-lsSZNGeIza5MI",
    "authDomain": "atg-home.firebaseapp.com",
    "databaseURL": "https://atg-home.firebaseio.com",
    "storageBucket": "atg-home.appspot.com"
}

firebase = pyrebase.initialize_app(config)

# get and return current datetime
def timestamp():
    timestamp = datetime.now()
    timestamp = timestamp.strftime("%d-%m-%Y %H:%M:%S")
    return timestamp

class Database(threading.Thread):

    def __init__(self):
        threading.Thread.__init__(self)
        self.db = firebase.database()

    # create handlers for database
    def update_device_status(self, device_address, status, value):
        log = self.db.child('hub').child('devices_status').child(device_address).update({status: str(value), 'timeStamp': timestamp()})

        print(timestamp(), 'Database status updated sucessfully ->',log)

    def update_active_devices(self, devices):
        dictDev = {}

        for dev in devices:
            # retrieve type of device from database before update active devices
            type_device = self.db.child('all_devices').child(dev.ieee).child('type').get()
            type_device = type_device.val()

            # adicionando entradas ao dicionário dictDev para formato json para atualizar o banco de dados
            dictDev[str(dev.ieee)] = {}
            dictDev[str(dev.ieee)]["network_addr"] = str(dev.network_addr)
            dictDev[str(dev.ieee)]["type"] = str(type_device)

        log = self.db.child('hub').child('active_devices').set(dictDev)

        print(timestamp(), 'Database active devices updated sucessfully ->',log)

    def add_active_device(self, device):
        # retrieve type of device from database before update active devices
        type_device = self.db.child('all_devices').child(device.ieee).child('type').get()
        type_device = type_device.val()
        print(type_device)

        log = self.db.child('hub').child('active_devices').child(device.ieee).update({'network_addr': str(device.network_addr), 'type': type_device})

        print(timestamp(), 'Database active devices updated sucessfully ->',log)

    def stream_handler(message):
        print(timestamp(), 'Database has changed ->', message["path"], message["data"])
        # print(message["event"]) # put
        # print(message["path"]) # /-K7yGTTEp7O549EzTYtI
        # print(message["data"]) # {'title': 'Pyrebase', "body": "etc..."}

        # handle socket status changes
        if (message["path"] == '/socket'):
            if (message["data"]['status'] == '1' and message["event"] == 'patch'):
                print('enviei 1')
                xbee.active_socket('1')
            elif (message["data"]['status'] == '0' and message["event"] == 'patch'):
                print('enviei 0')
                xbee.active_socket('0')
            else:
                pass

        # handle permit join request for 16 secs
        if (message['path'] == '/permit_join'):
            if (message['data']['status'] == '1' and message['event'] == 'patch'):
                xbee.permit_join()
            else:
                pass

        # handle refresh active decices
        if (message['path'] == '/refresh_active_devices'):
            if (message['data']['status'] == '1' and message['event'] == 'patch'):
                xbee.refresh_active_devices()
            else:
                pass

        # ask type
        if (message['path'] == '/ask_type/status'):
            # 'source_addr_long': b'\x00\x15\x8d\x00\x01/+\xdf', 'source_addr': b'\xc5\xb0'
            # b'00158d00012f2bdf'

            # b'\x00\x15\x8d\x00\x01Vq\x07', 'source_addr': b'\xb4<'
            # b'00158d0001567107'
            # b'b43c'
            print("passei")
            xbee.send_carai()


    def run(self, mesh):
        try:
            # taking object from mesh
            global xbee
            xbee = mesh
            my_stream = self.db.child('hub').stream(Database.stream_handler, stream_id="hub")
        except KeyboardInterrupt:
            my_stream.close()