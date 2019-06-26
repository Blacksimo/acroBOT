import qi
import argparse
import sys
import time
import os

jointsNames = ["HeadYaw", "HeadPitch",
               "LShoulderPitch", "LShoulderRoll", "LElbowYaw", "LElbowRoll", "LWristYaw",
               "RShoulderPitch", "RShoulderRoll", "RElbowYaw", "RElbowRoll", "RWristYaw"]

#joint limits taken from http://doc.aldebaran.com/2-5/family/pepper_technical/joints_pep.html
jointLimits ={'HeadYaw': (-2.0857, 2.0857),
              'HeadPitch': (-0.7068, 0.6371),
              'LShoulderPitch': (-2.0857, 2.0857),
              'LShoulderRoll': (0.0087, 1.5620),
              'LElbowYaw': (-2.0857, 2.0857),
              'LElbowRoll': (-1.5620, -0.0087),
              'LWristYaw': (-1.8239, 1.8239),
              'RShoulderPitch': (-2.0857, 2.0857),
              'RShoulderRoll': (-1.5620, -0.0087),
              'RElbowYaw': (-2.0857, 2.0857),
              'RElbowRoll': (0.0087,1.5620),
              'RWristYaw': (-1.8239, 1.8239)}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--pip", type=str, default=os.environ['PEPPER_IP'],
                        help="Robot IP address.  On robot or Local Naoqi: use '127.0.0.1'.")
    parser.add_argument("--pport", type=int, default=9559,
                        help="Naoqi port number")
    """ parser.add_argument("--sentence", type=str, default="hello",
                        help="Sentence to say")
    parser.add_argument("--language", type=str, default="English",
                        help="language")
    parser.add_argument("--speed", type=int, default=100,
                        help="speed") """
    
    args = parser.parse_args()
    pip = args.pip
    pport = args.pport
    language = 'English'
    speed = 100

    #Starting application
    try:
        connection_url = "tcp://" + pip + ":" + str(pport)
        app = qi.Application(["Memory Read", "--qi-url=" + connection_url ])
    except RuntimeError:
        print ("Can't connect to Naoqi at ip \"" + pip + "\" on port " + str(pport) +".\n"
               "Please check your script arguments. Run with -h option for help.")
        sys.exit(1)

    app.start()
    session = app.session

    memory_service = session.service("ALMemory")
    sonar_service = session.service("ALSonar")

    # Subscribe to sonars, this will launch sonars (at hardware level)
    # and start data acquisition.
    sonar_service.subscribe("initApplication")

    # Now you can retrieve sonar data from ALMemory.
    # Get sonar frntt first echo (distance in meters to the first obstacle).
    memory_service.getData("Device/SubDeviceList/Platform/Front/Sonar/Sensor/Value")

    motion_service  = session.service("ALMotion")        
    isAbsolute = True
    jointValues = [0.00, -0.21, 1.55, 0.13, -1.24, -0.52, 0.01, 1.56, -0.14, 1.22, 0.52, -0.01]
    motion_service.angleInterpolation(jointsNames, jointValues, 3.0, isAbsolute)

    tts_service = session.service("ALTextToSpeech")
    
    #strsay = "Hi. I'm roBOXE, your personal Boxe trainer"
    #tts_service.setLanguage(language)
    #tts_service.setParameter("speed", speed)
    #tts_service.say(strsay)
    #print "  -- Say: "+strsay

    # Unsubscribe from sonars, this will stop sonars (at hardware level)
    sonar_service.unsubscribe("initApplication")


if __name__ == "__main__":
    main()
