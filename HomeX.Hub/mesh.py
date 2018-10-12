import serial, struct, time, database, binascii
from xbee import XBee, ZigBee
from xbee.helpers.dispatch import Dispatch
from datetime import datetime

PORT = '/dev/tty.usbserial-A403B7KX' 
BAUD_RATE = 9600

# define endereço 64 bits do coordinator
global COORDINATOR_IEEE
COORDINATOR_IEEE = b'\x00\x13\xA2\x00\x40\x63\xD1\x3B' # endereço do coordinator

# abre a serial
try:
    ser = serial.Serial(PORT, BAUD_RATE)
except:
    print("Alerta! \nSerial nao pode ser aberta, verifique se o dispositivo esta conectado na porta USB.\n")
    raise SystemExit(0)

# retorna data e hora atuais
def timestamp():
    timestamp = datetime.now()
    timestamp = timestamp.strftime("%d-%m-%Y %H:%M:%S")
    return timestamp

def bin_to_hex(data):
    dt = binascii.hexlify(data)
    return dt

def hex_to_bin(data):
    dt = data.decode('utf8')
    dt = binascii.unhexlify(dt)
    return dt

def swap_data(data):
    # print(data)
    dt = bytearray(data)
    dt.reverse()
    dt = bytes(dt)
    # print(dt)
    return dt

class Device:
    def __init__(self):
        self.ieee = None
        self.network_addr = None

class Mesh:
    def __init__(self, database):
        self.dispatch = Dispatch(ser)
        global xbee
        xbee = ZigBee(ser, callback=self.dispatch.dispatch)

        # define o objeto da classe database como global
        self.db = database
        global db
        db = self.db

        self.dispatch.register(
            "data_comunication",
            Mesh.data_comunication_handler,
            lambda packet: packet['id']=='rx_explicit'
        )

    def data_comunication_handler(name, packet):

        # global devices deve mesmo ficar
        global devices

        global dvs

        print(timestamp(), 'Packet recieved ->', packet)

        # BEGIN ZigBee CLUSTER LIBRARY (ZCL)
        #
        # functional domain of general
        #
        # on/off - value length 8 bits
        if (packet['cluster'] == b'\x00\x06'):

            source_addr_long = packet['source_addr_long']
            source_addr_long = bin_to_hex(source_addr_long)

            source_addr = packet['source_addr']
            source_addr = bin_to_hex(source_addr)

            # for window/sensors and switch
            if (len(packet['rf_data']) == 7):
                frameControl, transactionSequenceNumber, commandID, attributeID, dataType, value = struct.unpack('<BBBHBB', packet['rf_data'])

                # print(frameControl,transactionSequenceNumber,commandID,attributeID,dataType,value)
                db.update_device_status(source_addr_long, 'status', value)

            # for socket
            elif (len(packet['rf_data']) == 14):

                value = packet['rf_data'][6]

                db.update_device_status(source_addr_long, 'status', value)
            else:
                pass

        # functional domain of measurement and sensing
        #
        # temperature measurement - value length 16 bits
        elif (packet['cluster'] == b'\x04\x02'):
            # define home automation profile variables from packet
            frameControl, transactionSequenceNumber, commandID, attributeID, dataType, value = struct.unpack('<BBBHBH', packet['rf_data'])

            value = value / 100 # temperature percentage

            source_addr_long = packet['source_addr_long']
            source_addr_long = bin_to_hex(source_addr_long)

            source_addr = packet['source_addr']
            source_addr = bin_to_hex(source_addr)

            # call update_device_status_database handler
            db.update_device_status(source_addr_long, 'temperature', value)

        # relative humidity measurement - value length 16 bits
        elif (packet['cluster']==b'\x04\x05'):
            # define home automation profile variables from packet
            frameControl, transactionSequenceNumber, commandID, attributeID, dataType, value = struct.unpack('<BBBHBH', packet['rf_data'])

            value = value / 100 # relative humidity percentage

            source_addr_long = packet['source_addr_long']
            source_addr_long = bin_to_hex(source_addr_long)

            source_addr = packet['source_addr']
            source_addr = bin_to_hex(source_addr)

            # call update_device_status_database handler
            db.update_device_status(source_addr_long, 'humidity', value)

        # occupancy sensing
        #
        elif (packet['cluster'] == b'\x04\x06'):
            frameControl, transactionSequenceNumber, commandID, attributeID, dataType, value = struct.unpack('<BBBHBB', packet['rf_data'])

            source_addr_long = packet['source_addr_long']
            source_addr_long = bin_to_hex(source_addr_long)

            source_addr = packet['source_addr']
            source_addr = bin_to_hex(source_addr)

            db.update_device_status(source_addr_long, 'status', value)

        elif (packet['cluster'] == b'\x00\x13'):
            transactionSequenceNumber, network_addr, ieee_addr, unknown = struct.unpack('<B2s8sB', packet['rf_data'])

            dv = Device()
            dv.ieee = ieee_addr
            dv.network_addr = network_addr

            #swap and convert to hex before call handler
            dv.ieee = swap_data(dv.ieee)
            dv.ieee = bin_to_hex(dv.ieee)

            dv.network_addr = swap_data(dv.network_addr)
            dv.network_addr = bin_to_hex(dv.network_addr)

            db.add_active_device(dv)

        # End BEGIN ZigBee CLUSTER LIBRARY (ZCL)

        # Begin Supporting ZDOs with the XBee API
        #
        # Management LQI (Neighbor Table) Request
        #
        elif (packet['cluster'] == b'\x80\x31'):
            # total active devices discovered
            devices_count = packet['rf_data'][2]
            # number of devices in this packet
            list_count = packet['rf_data'][4]
            # data begin
            transaction_sequence = packet['rf_data'][0]

            if (transaction_sequence == 0):
                # clean devices array
                devices = []

                if (list_count == 2):
                    status, entries, start_index, list_count, extended_pan_id, ieee_addr, network_addr, info_32bits, extended_pan_id_2, ieee_addr_2, network_addr_2, info_32bits_2 = struct.unpack('<HBBB8s8s2s4s8s8s2s4s', packet['rf_data'])

                    dv = Device()
                    dv.ieee = ieee_addr
                    dv.network_addr = network_addr
                    devices.append(dv)

                    dv2 = Device()
                    dv2.ieee = ieee_addr_2
                    dv2.network_addr = network_addr_2
                    devices.append(dv2)

                else:
                    status, entries, start_index, list_count, extended_pan_id, ieee_addr, network_addr, info_32bits = struct.unpack('<HBBB8s8s2s4s', packet['rf_data'])

                    dv = Device()
                    dv.ieee = ieee_addr
                    dv.network_addr = network_addr
                    devices.append(dv)

                # check if there is more devices to retrieve
                if (devices_count > 2):
                    xbee.send('tx_explicit', dest_addr_long=b'\x00\x13\xA2\x00\x40\x63\xD1\x3B', dest_addr=b'\xFF\xFE', src_endpoint=b'\x00', dest_endpoint=b'\x00', cluster=b'\x00\x31', profile=b'\x00\x00', data=b'\x02\x02')
                    time.sleep(0.1)

            elif (transaction_sequence == 2):
                if(list_count == 2):
                    status, entries, start_index, list_count, extended_pan_id, ieee_addr, network_addr, info_32bits, extended_pan_id_2, ieee_addr_2, network_addr_2, info_32bits_2 = struct.unpack('<HBBB8s8s2s4s8s8s2s4s', packet['rf_data'])

                    dv = Device()
                    dv.ieee = ieee_addr
                    dv.network_addr = network_addr
                    devices.append(dv)

                    dv2 = Device()
                    dv2.ieee = ieee_addr_2
                    dv2.network_addr = network_addr_2
                    devices.append(dv2)
                else:
                    status, entries, start_index, list_count, extended_pan_id, ieee_addr, network_addr, info_32bits = struct.unpack('<HBBB8s8s2s4s', packet['rf_data'])

                    dv = Device()
                    dv.ieee = ieee_addr
                    dv.network_addr = network_addr
                    devices.append(dv)

                # check if there is more devices to retrieve
                if (devices_count > 4):
                    xbee.send('tx_explicit', dest_addr_long=b'\x00\x13\xA2\x00\x40\x63\xD1\x3B', dest_addr=b'\xFF\xFE', src_endpoint=b'\x00', dest_endpoint=b'\x00', cluster=b'\x00\x31', profile=b'\x00\x00', data=b'\x04\x04')
                    time.sleep(0.1)

            elif (transaction_sequence == 4):
                if (list_count == 2):
                    status, entries, start_index, list_count, extended_pan_id, ieee_addr, network_addr, info_32bits, extended_pan_id_2, ieee_addr_2, network_addr_2, info_32bits_2 = struct.unpack('<HBBB8s8s2s4s8s8s2s4s', packet['rf_data'])

                    dv = Device()
                    dv.ieee = ieee_addr
                    dv.network_addr = network_addr
                    devices.append(dv)

                    dv2 = Device()
                    dv2.ieee = ieee_addr_2
                    dv2.network_addr = network_addr_2
                    devices.append(dv2)
                else:
                    status, entries, start_index, list_count, extended_pan_id, ieee_addr, network_addr, info_32bits = struct.unpack('<HBBB8s8s2s4s', packet['rf_data'])

                    dv = Device()
                    dv.ieee = ieee_addr
                    dv.network_addr = network_addr
                    devices.append(dv)

                # check if there is more devices to retrieve
                if (devices_count > 6):
                    xbee.send('tx_explicit', dest_addr_long=b'\x00\x13\xA2\x00\x40\x63\xD1\x3B', dest_addr=b'\xFF\xFE', src_endpoint=b'\x00', dest_endpoint=b'\x00', cluster=b'\x00\x31', profile=b'\x00\x00', data=b'\x06\x08')
                    time.sleep(0.1)

            elif (transaction_sequence == 6):
                if (list_count == 2):
                    status, entries, start_index, list_count, extended_pan_id, ieee_addr, network_addr, info_32bits, extended_pan_id_2, ieee_addr_2, network_addr_2, info_32bits_2 = struct.unpack('<HBBB8s8s2s4s8s8s2s4s', packet['rf_data'])

                    dv = Device()
                    dv.ieee = ieee_addr
                    dv.network_addr = network_addr
                    devices.append(dv)

                    dv2 = Device()
                    dv2.ieee = ieee_addr_2
                    dv2.network_addr = network_addr_2
                    devices.append(dv2)
                else:
                    status, entries, start_index, list_count, extended_pan_id, ieee_addr, network_addr, info_32bits = struct.unpack('<HBBB8s8s2s4s', packet['rf_data'])

                    dv = Device()
                    dv.ieee = ieee_addr
                    dv.network_addr = network_addr
                    devices.append(dv)

            else:
                pass

            # update database if number of devices active is the same as array of devices lenght
            if (len(devices) == devices_count):
                #swap address before update database
                for dv in devices:
                    dv.ieee = swap_data(dv.ieee)
                    dv.ieee = bin_to_hex(dv.ieee)

                    dv.network_addr = swap_data(dv.network_addr)
                    dv.network_addr = bin_to_hex(dv.network_addr)

                db.update_active_devices(devices)

        # End Supporting ZDOs with the XBee API

    def refresh_active_devices(self):
        # Management LQI (Neighbor Table) Response
        xbee.send('tx_explicit', dest_addr_long=b'\x00\x13\xA2\x00\x40\x63\xD1\x3B', dest_addr=b'\xFF\xFE', src_endpoint=b'\x00', dest_endpoint=b'\x00', cluster=b'\x00\x31', profile=b'\x00\x00', data=b'\x00\x00')
        time.sleep(0.1)

        print(timestamp(), "ZDO command Management LQI (Neighbor Table) Request -> destination=b'0xFFFE'")

    def active_socket(self, value):
        # active tomada pelo botão teste
        if (value == '1'):
            # em data=b'\x11\x24\x01' o byte 11 é reponsável por set 'Disable Default Response: True'; o byte do meio é a sequencia enviada deve ser alterada se necessário; o último byte é o comando on/off (01/00)
            xbee.send('tx_explicit', dest_addr_long=b'\x00\x15\x8D\x00\x01\x56\x71\x07', dest_addr=b'\xb4\x3c', src_endpoint=b'\x01', dest_endpoint=b'\x01', cluster=b'\x00\x06', profile=b'\x01\x04', broadcast_radius=b'\x1E', data=b'\x11\x24\x01')
            time.sleep(.1)

            print(timestamp(), 'ZCL command On ->', "destination=b'0x????'")
        else:
            xbee.send('tx_explicit', dest_addr_long=b'\x00\x15\x8D\x00\x01\x56\x71\x07', dest_addr=b'\xb4\x3c', src_endpoint=b'\x01', dest_endpoint=b'\x01', cluster=b'\x00\x06', profile=b'\x01\x04', broadcast_radius=b'\x1E', data=b'\x11\x25\x00')
            time.sleep(.1)

            print(timestamp(), 'ZCL command Off ->', "destination=b'0x????'")

    def permit_join(self):
            xbee.send('tx_explicit', dest_addr_long=b'\x00\x00\x00\x00\x00\x00\xFF\xFF', dest_addr=b'\xFF\xFE', src_endpoint=b'\x00', dest_endpoint=b'\x00', cluster=b'\x00\x36', profile=b'\x00\x00', data=b'\x01\x10\x00')
            time.sleep(.1)

            print(timestamp(), 'ZDO command Management Permit Join Request ->', '10 seconds')

    def send_carai(self):
        xbee.send('tx_explicit', dest_addr_long=b'\x00\x15\x8D\x00\x01\x56\x71\x07', dest_addr=b'\xb4\x3c',
                  src_endpoint=b'\x00', dest_endpoint=b'\x00', cluster=b'\x00\x04', profile=b'\x00\x00',
                  broadcast_radius=b'\x00')
        # xbee.send('tx_explicit', dest_addr_long=b'\x00\x15\x8D\x00\x01\x56\x71\x07', dest_addr=b'\xb4\x3c',
        #           src_endpoint=b'\x00', dest_endpoint=b'\x00', cluster=b'\x00\x04', profile=b'\x00\x00',
        #           broadcast_radius=b'\x00', data=b'\x11\x24\x01')
        time.sleep(.1)