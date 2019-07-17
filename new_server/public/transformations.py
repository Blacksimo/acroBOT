from math import floor

def process_positions_from_GUI(file_path):
    dict_array = list()
    dict_pos1 = dict()
    dict_pos2 = dict()
    dict_pos3 = dict()
    with open(file_path, 'r') as file_read:
        for line in file_read:
            line = line.split()
            for cnt, el in enumerate(line):
                if cnt == 1:
                    dict_pos1[line[0]] = el
                if cnt == 2:
                    dict_pos2[line[0]] = el
                if cnt == 3:
                    dict_pos3[line[0]] = el
        dict_array = [dict_pos1, dict_pos2, dict_pos3]
    file_read.close()
    return dict_array
""" print('\nfrom node:\n')
for el in process_positions_from_GUI('../message.txt'):
    print(el)
print ('\nfrom pose:\n') """



def predictions_file_parsing(file_path):
# PREDICTIONS_FILE_PARSING parses the prediction file and return a dictionary containing the joints names as key
# and the 'image area' of interest related to the considered key
    
    d = {}

    with open(file_path) as fp:  
       line = fp.readline()
       while line:
           line = line.strip()
           splitted = line.split()
           first_elem = splitted[0]

           if ( (first_elem == "rightKnee") or (first_elem == "leftKnee") ):

                knee_key_len = len(splitted)

                if (knee_key_len == 2):

                    d[first_elem] = splitted[1]
                
                else:

                    d[first_elem] = [float(splitted[1]), float(splitted[2])]

           elif (first_elem == "nose"):

                d[first_elem] = splitted[1]

           else:
                
                d[first_elem] = [float(splitted[1]), float(splitted[2])]

           line = fp.readline()
    
    return d

def check_x_coordinate(x, x_limits, possible_areas):
# CHECK_X_COORDINATE computes the 'image area' considering only x coordinates;
# 'x' is the current coordinates to evaluate;
# 'x_limits' are the limits of each 'image area' along the 'x' direction
# 'possible_area' are the possible 'image areas' (array of length 3) for the 'x' coordinate  

    if ( (x>=x_limits[0]) and (x<x_limits[1]) ):

        area = possible_areas[0]

    elif ( (x>=x_limits[1]) and (x<x_limits[2]) ):

        area = possible_areas[1]

    elif ( (x>=x_limits[2]) and (x<=x_limits[3]) ):

        area = possible_areas[2]

    return area

def bounds_of_interest(x_size, y_size):
# BOUNDS_OF_INTEREST computes the limits (3 for 'x' and 3 for 'y') along 
# the 'x' and 'y' directions. 

    x_limit0 = 0
    x_limit1 = floor(x_size/3)
    x_limit2 = x_limit1*2
    x_limit3 = x_size

    y_limit0 = 0
    y_limit1 = floor(y_size/3)
    y_limit2 = y_limit1*2
    y_limit3 = y_size

    return [[x_limit0, x_limit1, x_limit2, x_limit3], [y_limit0, y_limit1, y_limit2, y_limit3]]

def derive_area_from_points(x, y, x_size, y_size):
# DERIVE_AREA_FROM_POINTS computes the 'image area' corresponding
# to the '(x, y)' coordinates according to the size of the considered image '(x_size, y_size)';
# The considered image is splitted in 9 areas.

    area = ""

    if ( ( (x == "leftKnee") or (x == "rightKnee") ) and (y == "false") ):

        return None

    elif (x == "nose"):

        return y

    limits = bounds_of_interest(x_size, y_size)
    x_limits = [int(elem) for elem in limits[0]]
    y_limits = [int(elem) for elem in limits[1]]

    # First 'row':
    if ( (y>=y_limits[0]) and (y<y_limits[1]) ):

        possible_areas = ["top_left", "top_center", "top_right"]
        area = check_x_coordinate(x, x_limits, possible_areas)
    
    # Second 'row':
    elif ( (y>=y_limits[1]) and (y<y_limits[2]) ):

        possible_areas = ["left_center", "center", "right_center"]
        area = check_x_coordinate(x, x_limits, possible_areas)

    # Third 'row':
    elif ( (y>=y_limits[2]) and (y<=y_limits[3]) ):

        possible_areas = ["bottom_left", "bottom_center", "bottom_right"]
        area = check_x_coordinate(x, x_limits, possible_areas)

    return area

def elaborating_score(correct_poses, user_poses):

    joints_num = len(correct_poses)
    reversed_pose = user_poses['nose']
    number_of_rounds = 1

    max_score = 3
    user_score = 0

    for current_round in range(number_of_rounds):
        
        if (reversed_pose == "false"):

            for joint_key in correct_poses:

                if ( (joint_key == "leftKnee") or (joint_key == "rightKnee") ):

                    # FOR THE KNEES WE DO NOT CARE ABOUT 'RIGHT' AND 'LEFT': 
                    if ( (correct_poses[joint_key] == user_poses["leftKnee"]) or (correct_poses[joint_key] == user_poses["rightKnee"]) ):

                        user_score += 1

                elif (correct_poses[joint_key] == user_poses[joint_key]):

                    user_score += 1
        
        else:

            for joint_key in correct_poses:

                # IF THE USER IS IN REVERSED POSITION AND ONE OF THE KNEES IS NOT DETECTED (AND THE KNEE IS EXPECTED TO BE IN CENTRAL POSITION), THEN THE USER GETS A POINT
                if ( (joint_key == "leftKnee") or (joint_key == "rightKnee") ):

                    # FOR THE KNEES WE DO NOT CARE ABOUT 'RIGHT' AND 'LEFT':
                    if ( (correct_poses[joint_key] == "center") and ( (user_poses["leftKnee"] == "false") or (user_poses["leftKnee"] == "false")) ):

                        user_score += 1

                else:

                    if correct_poses[joint_key] == user_poses[joint_key]:

                        user_score += 1

    correctness_percentage = (user_score*100)/max_score

    return correctness_percentage

def main():
    files = [predictions_file_parsing("pose1.txt"), predictions_file_parsing("pose2.txt"), predictions_file_parsing("pose3.txt")]
    #predicted_class = predictions_file_parsing("C:\\Users\\damia\\Downloads\\predictions (13).txt")
    imageX_size = 1280
    imageY_size = 960
    joint_to_areas = {}
    joints_to_areas = []; # --> It will store the predicted areas of each file (it is an array of dictionaries) 
    predicted_classes = []; # --> It will store the predcited 'x' and 'y' values of each file (it is an array of dictionaries)


    # -------------------------------------------------------------------- Associating joints position to a specific area --------------------------------------------------------------------
    for predicted_class in files:
        
        for key in predicted_class:

            if (key !="reversed"): 

                if ( (key == "rightKnee") or (key == "leftKnee") ):


                    if (predicted_class[key] == "false"):

                        x = key
                        y = predicted_class[key]

                    else:

                        x = predicted_class[key][0] 
                        y = predicted_class[key][1]

                elif (key == "nose"):

                    x = key
                    y = predicted_class[key]

                else:

                    x = predicted_class[key][0]
                    y = predicted_class[key][1]

                current_area = derive_area_from_points(x, y, imageX_size, imageY_size) 
                joint_to_areas[key] = current_area

        predicted_classes.append(predicted_class)
        joints_to_areas.append(joint_to_areas)           

    # -------------------------------------------------------------------- Computing the final score --------------------------------------------------------------------



    """ print(predicted_classes)
    print("\n")
    print(len(predicted_classes))
    print("\n")
    print("\n") """
    """ print(joints_to_areas)
    print("\n") """
    for el in joints_to_areas:
        print(el)
    #print(len(joints_to_areas))
    print("\n")
    #print(len(score))

    desired_pose = process_positions_from_GUI('../message.txt')
    number_of_rounds = 3
    final_score = 0
    for current_round in range(number_of_rounds):
        score = elaborating_score(desired_pose[current_round], joints_to_areas[current_round])
        print('your score in round', current_round+1, 'is ', score)
        final_score += score
    final_score = round(final_score)

    with open('finish.txt', 'w') as final_file:
        p = 'finsh'
    final_file.close()
    return final_score

print('\n', main())