from math import floor

def file_parsing(file_path):
# FILE_PARSING parses the prediction file and return a dictionary containing the joints names as key
# and the 'image area' of interest related to the considered key
    
    d = {};

    with open(file_path) as fp:  
       line = fp.readline()
       while line:
           line = line.strip()
           splitted = line.split()
           d[splitted[0]] = [float(splitted[1]), float(splitted[2])]
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
# the the '(x, y)' coordinates according to the size of the considered image '(x_size, y_size)';
# The considered image is splitted in 9 areas.

    area = ""
    limits = bounds_of_interest(x_size, y_size)
    x_limits = limits[0]
    y_limits = limits[1] 

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

d = file_parsing("C:\\Users\\damia\\Downloads\\predictions (14).txt")

imageX_size = 1280
imageY_size = 960
areas = [];
for key in d:

    current_area = derive_area_from_points(d[key][0], d[key][1], imageX_size, imageY_size) 
    areas.append(current_area)

print(d)
print(areas)