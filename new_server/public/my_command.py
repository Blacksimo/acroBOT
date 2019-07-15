import pepper_cmd
from pepper_cmd import *
import webbrowser
import os.path
BASE_URL = 'http://10.0.1.204:3000/'

voc = ['yes', 'no']

begin()
pepper_cmd.robot.asay2('Hi, i\'m acroBOT. Are you ready to play with me?')
pepper_cmd.stand()
if(pepper_cmd.robot.asr(voc) == 'yes'):
    pepper_cmd.robot.say('Read the rules on my tablet')
    pepper_cmd.robot.showurl(BASE_URL + 'GUI.html')
    time.sleep(10)
    pepper_cmd.robot.say('First Round')
    pepper_cmd.robot.startFrameGrabber()
    time.sleep(10)
    pepper_cmd.robot.saveImage('pose1.png')
    webbrowser.open_new(BASE_URL + 'pose1.html')
    pepper_cmd.robot.say('Second Round')
    time.sleep(20)
    pepper_cmd.robot.saveImage('pose2.png')
    webbrowser.open_new(BASE_URL + 'pose2.html')
    pepper_cmd.robot.say('Ok, Last Round')
    time.sleep(20)
    pepper_cmd.robot.saveImage('pose3.png')
    webbrowser.open_new(BASE_URL + 'pose3.html')
    pepper_cmd.robot.asay('Ok, we finished. I\'m calculating your score')
    pepper_cmd.robot.stopFrameGrabber()
    """ while(True):
        if os.path.isfile('pose1.txt') and os.path.isfile('pose2.txt') and os.path.isfile('pose1.txt'):
            break """
end()