round = [1, 2, 3]

begin()
#lancio html in locale.
robot.showurl('http://nostroip/GUI.html')
for i in round:
    time.sleep('tot secondi (occhio alla fidderenza tra il primo e gli altri)')
    robot.saveImage()

end()