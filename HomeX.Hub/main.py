import database, time, mesh

# MAIN
class Main:
    def __init__(self):
        print('Working... please, wait!')

        # create Database object
        db = database.Database()
        # create Mesh object and already run with new threading
        ms = mesh.Mesh(db)
        print('Start mesh network threading')
        # call run method from Database and create new threading
        db.run(ms)
        print('Start listen database threading\n')

        time.sleep(.5)
        print('Ready!\n')

if __name__ == "__main__":
    Main()